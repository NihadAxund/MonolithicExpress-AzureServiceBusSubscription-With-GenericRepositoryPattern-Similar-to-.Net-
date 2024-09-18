'use strict';
import express from "express"
import path from "path"
import { createServer } from "http"
import cors from 'cors';

import  createDbConnection  from "./core/confige/db.config.js";

import { EventBusFactory } from "./service/EventBus/EventBusFactory.js";
import OrderStartedIntegrationEventHandler from "./app/medical-history-vault/MessageBroker/EventsHandlers/OrderStartedIntegrationEventHandler.js";
import * as bodyParser from "body-parser";
import { OrderStartedIntegrationEvent } from "./app/medical-history-vault/MessageBroker/Events/OrderStartedIntegrationEvent.js";
import { EventBusConfig } from "./core/EventBus/EventBusConfig.js";

import { serviceProvider } from "./shared/core/ServiceProvider.js";
import OrderPaymentSuccessIntegrationEventHandler from "./app/medical-history-vault/MessageBroker/EventsHandlers/OrderPaymentSuccessIntegrationEventHandler.js";
import testServiceRouter from "./app/TestService/testService.route.js";


export async function startServer() {
    console.log("-start server section-")

  

    await createDbConnection()
        .then(() => {
            //console.log("MongoDB connection established");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });

    const server = express();
    const app = createServer(server);
    const PORT = 5000;
    server.disable("x-powered-by");

    const corsOptions = {
        origin: true,
        credentials: true,
    };



    const Eventbusconfig = new EventBusConfig({
        connectionRetryCount: 5,
        subscriptionClientAppName: 'EventBus.UnitTest',
        defaultTopicName: 'TestService',
        eventBusType: 'AzureServiceBus',
        eventNameSuffix: 'IntegrationEvent',
        eventBusConnectionString: 'you service bus endpoint'

    })


    const eventBus = EventBusFactory.create(Eventbusconfig, serviceProvider);
    server.use(cors(corsOptions));
    server.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials"
        );
        next();
    });



    serviceProvider.addService('OrderStartedIntegrationEventHandler', new OrderStartedIntegrationEventHandler(eventBus));
    serviceProvider.addService('OrderPaymentSuccessIntegrationEventHandler', new OrderPaymentSuccessIntegrationEventHandler(eventBus));

    server.use("/", testServiceRouter);



    eventBus.subscribe(new OrderStartedIntegrationEvent(), serviceProvider.getService('OrderStartedIntegrationEventHandler'));
    /// test send azure servcice bus 
    server.get('/SendMessageEvent', async (req, res) => {
        try {
            const orderStartedEvent = new OrderStartedIntegrationEvent(123);
            await eventBus.publish(orderStartedEvent);
            res.send('Message sent to event bus');
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).send('Error sending message to event bus');
        }
    });


    app.listen(PORT, async () => {
        console.log(`Server is running: http://localhost:${PORT}`);
    });
};


startServer();