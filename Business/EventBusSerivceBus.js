import pkg from '@azure/service-bus';
const { ServiceBusClient, ServiceBusAdministrationClient, ServiceBusMessage, ServiceBusReceiver } = pkg;

import { v4 as uuidv4 } from 'uuid';
import BaseEventBus from '../core/EventBus/Concrete/BaseEventBus.js';
import { InMemoryEventBusSubscriptionManager } from '../core/EventBus/subManger/InMemoryEventBusSubscriptionManager.js';
import { serviceProvider } from '../shared/core/ServiceProvider.js';

export class EventBusServiceBus extends BaseEventBus {
    constructor(config, serviceProvider2) {
        super(config, serviceProvider2)
        this.eventBusConfig = config;
        this.serviceProvider = serviceProvider;
        this.serviceProvider2 = serviceProvider2;
        
       // console.log(this);
        //this.subsManager = new InMemoryEventBusSubscriptionManager(this.processEventName.bind(this));
    

        this.serviceBusClient = null;
        this.sBAdminClient = new ServiceBusAdministrationClient(config.eventBusConnectionString);

        this.initializeClient();
    }
    
    async initializeClient() {
        if (!this.serviceBusClient || this.serviceBusClient.isClosed) {
            const retryOptions = {
                mode: 'exponential',
                maxRetries: this.eventBusConfig.connectionRetryCount,
                delay: 3000,
                maxDelay: 4000
            };

            this.serviceBusClient = new ServiceBusClient(this.eventBusConfig.eventBusConnectionString, {
                retryOptions
            });

            if (!(await this.sBAdminClient.topicExists(this.eventBusConfig.defaultTopicName))) {
                await this.sBAdminClient.createTopic(this.eventBusConfig.defaultTopicName);
            }
        }
    }

    processEventName(eventName) {
       // console.log("=====================eventName=========================")
       // console.log(eventName)
        if (eventName === undefined) {

            return eventName;
        }
            

        if (this.eventBusConfig.deleteEventPrefix) {
            eventName = eventName.replace(new RegExp(`^${this.eventBusConfig.eventNamePrefix}`), '');
        }
       // console.log(this.eventBusConfig.deleteEventPrefix)


        if (this.eventBusConfig.deleteEventSuffix) {
            eventName = eventName.replace(new RegExp(`${this.eventBusConfig.eventNameSuffix}$`), '');
        }

       // console.log(eventName)
        return eventName;
    }

    async processEvent(eventName, message) {
        eventName = this.processEventName(eventName);
        let processed = false;

        if (this.subsManager.hasSubscriptionsForEvent(eventName)) {
            const subscriptions = this.subsManager.getHandlersForEvent(eventName);
           // const scope = await this.serviceProvider.createAsyncScope(); // Assuming createAsyncScope is async

            for (const subscription of subscriptions) {
                console.log(subscription.handlerType)
                const data = subscription.handlerType.constructor.name+"Handler";
                const handler = this.serviceProvider.getService(data);
 
                console.log(handler)
                if (!handler) continue;

                //const eventType = this.subsManager.getEventTypeByName(
                //    `${this.eventBusConfig.eventNamePrefix}${eventName}${this.eventBusConfig.eventNameSuffix}`
                //);
                const integrationEvent = message;
                handler.handle(integrationEvent);
  
            }

            processed = true; // Set processed to true if events were handled
        }

        return processed;
    }

    getSubName(eventName) {
        return `${this.eventBusConfig.subscriptionClientAppName}-${this.processEventName(eventName)}`;
    }

    async publish(event) {


        const eventName = this.processEventName(event.constructor.name);
        const eventStr = JSON.stringify(event);
        const eventBuffer = Buffer.from(eventStr);
        const message = {
            messageId: event.id,
            body: eventBuffer,
            contentType: 'application/json',
            subject: eventName
        };

        console.log(event);
        console.log(this.eventBusConfig)
        await this.sendMessageAsync(message, this.eventBusConfig.defaultTopicName);
    }

    async sendMessageAsync(message, topicName) {
        const sender = this.serviceBusClient.createSender(topicName);
        await sender.sendMessages(message);
    }

    async subscribe(eventClass, handlerClass) {
        const eventClassname = eventClass.constructor.name;
        const eventName = this.processEventName(eventClassname);
        console.log(eventName);
        console.log(handlerClass);
        if (!this.subsManager.hasSubscriptionsForEvent(eventName)) {
            const subscriptionClient = await this.createSubscriptionClientIfNotExists(eventName);
            await this.registerSubscriptionClientMessageHandler(this.eventBusConfig.defaultTopicName, this.getSubName(eventName));
        }

        this.subsManager.addSubscription(eventClass, eventName);
    }

    async unsubscribe(eventClass, handlerClass) {
        const eventName = this.processEventName(eventClass.name);
        try {
            const subName = this.getSubName(eventName);
            await this.sBAdminClient.deleteRule(this.eventBusConfig.defaultTopicName, subName, eventName);
        } catch (error) {
            this.logger.warn(`(UnSubscribe) The Messaging Entity ${eventName}`);
        }
        this.subsManager.removeSubscription(eventClass, handlerClass);
    }

    async registerSubscriptionClientMessageHandler(topicName, subName) {
        const processor = this.serviceBusClient.createReceiver(topicName, subName, {
            maxConcurrentCalls: 5,
            autoCompleteMessages: false
        });

        processor.subscribe({
            processMessage: this.messageHandler.bind(this),
            processError: this.errorHandler.bind(this)
        });

        console.log('Message handler registered.');
    }

    async messageHandler(args) {

        console.log("Mesage handler")
        // console.log(args)
        var eventName = args._rawAmqpMessage.properties.subject;
        console.log(eventName);

        var message = args.body;
        var functions = this.processEventName(eventName)
    
        var boolens = await this.processEvent(functions, message);
      

        console.log(boolens);
        
    }



    async errorHandler(error) {
        console.error(`Message handler encountered an exception ${error}`);
        console.log(error);
    }

    async createSubscriptionClientIfNotExists(eventName) {
        console.log("---------------------------------------createSubscriptionClientIfNotExists---------------------------------------");
        console.log("event name")
        console.log(eventName);
        const subClient = this.createSubscriptionClient(eventName);
        const subName = this.getSubName(eventName);
        const exists = await this.sBAdminClient.subscriptionExists(this.eventBusConfig.defaultTopicName, subName);
        console.log(`exists ${exists}`);
        if (!exists) {
            console.log("create subsectin")
            console.log(`eventName:${eventName} subname: ${subName} defaultTopicName: ${this.eventBusConfig.defaultTopicName}`);
            await this.sBAdminClient.createSubscription(this.eventBusConfig.defaultTopicName, subName);
            console.log("succes creating");
            await this.removeDefaultRule(this.eventBusConfig.defaultTopicName, subName);
            console.log("create removeDefaultRule")
        }

        await this.createRuleIfNotExists(this.processEventName(eventName), subName, subClient);
        return subClient;
    }

    async createRuleIfNotExists(eventName, subName, subscriptionClient) {
        let ruleExists = false
        try {
            await this.sBAdminClient.getRule(this.eventBusConfig.defaultTopicName, subName, eventName);
        } catch (error){
            console.log("hata var");
            console.log("this errprprrpr");
            console.log(error.message)
            ruleExists = true;
        }
        if (ruleExists) {
            try {
                const ruleName = eventName; // Name of the rule
                const filter = { subject: eventName }; // Filter for the rule
                console.log(this.eventBusConfig.defaultTopicName);
                console.log(subName);
                console.log(ruleName);
                console.log(filter);

                // Create rule with proper parameters
                await this.sBAdminClient.createRule(this.eventBusConfig.defaultTopicName, subName, ruleName, filter);

                console.log(`Rule '${ruleName}' has been created in subscription '${subName}'.`);
            } catch (error) {
                console.error(`Exception: ${error.message}`);
                throw error;
            }
        }
    }

    async removeDefaultRule(topicName, subscriptionName) {
        try {
            await this.sBAdminClient.deleteRule(topicName, subscriptionName, 'DefaultRule');
        } catch {

            console.log("The messaging entity DefaultRule Could not be found.")
        }
    }

    createSubscriptionClient(eventName) {
        return this.serviceBusClient.createReceiver(this.eventBusConfig.defaultTopicName, this.getSubName(eventName));
    }

    dispose() {

        if (this.serviceBusClient) {
            this.serviceBusClient.close();
        }
        this.serviceBusClient = null;
        this.sBAdminClient = null;
    }
}
