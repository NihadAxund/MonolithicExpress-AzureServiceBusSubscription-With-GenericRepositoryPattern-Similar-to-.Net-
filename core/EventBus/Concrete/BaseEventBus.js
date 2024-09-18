import { InMemoryEventBusSubscriptionManager } from "../subManger/InMemoryEventBusSubscriptionManager.js";

class BaseEventBus {
    constructor(config, serviceProvider) {
        this.eventBusConfig = config;
        this.serviceProvider = serviceProvider;
        this.subsManager = new InMemoryEventBusSubscriptionManager(this.processEventName.bind(this));
    }

    processEventName(eventName) {
        if (this.eventBusConfig.deleteEventPrefix) {
            eventName = eventName.replace(new RegExp(`^${this.eventBusConfig.eventNamePrefix}`), '');
        }
        if (this.eventBusConfig.deleteEventSuffix) {
            eventName = eventName.replace(new RegExp(`${this.eventBusConfig.eventNameSuffix}$`), '');
        }
        return eventName;
    }

    getSubName(eventName) {
        return `${this.eventBusConfig.subscriptionClientAppName}-${this.processEventName(eventName)}`;
    }

    dispose() {
        this.eventBusConfig = null;
        this.subsManager.clear();
    }

    async processEvent(eventName, message) {
        eventName = this.processEventName(eventName);
        let processed = false;

        if (this.subsManager.hasSubscriptionsForEvent(eventName)) {
            const subscriptions = this.subsManager.getHandlersForEvent(eventName);
            const scope = await this.serviceProvider.createAsyncScope(); // Assuming createAsyncScope is async

            for (const subscription of subscriptions) {
                const handler = this.serviceProvider.getService(subscription.handlerType);
                if (!handler) continue;

                const eventType = this.subsManager.getEventTypeByName(
                    `${this.eventBusConfig.eventNamePrefix}${eventName}${this.eventBusConfig.eventNameSuffix}`
                );
                const integrationEvent = JSON.parse(message, eventType);

                const concreteType = `IIntegrationEventHandler<${eventType.name}>`; // Adjust as per your handling
                if (handler[concreteType]) {
                    await handler[concreteType].handle(integrationEvent);
                }
            }

            processed = true; // Set processed to true if events were handled
        }

        return processed;
    }

    // Abstract methods - these need to be implemented in subclasses
    async publish(event) {
        throw new Error('Method "publish" must be implemented.');
    }

    subscribe(eventClass, handlerClass) {
        throw new Error('Method "subscribe" must be implemented.');
    }

    unsubscribe(eventClass, handlerClass) {
        throw new Error('Method "unsubscribe" must be implemented.');
    }
}

export default BaseEventBus;