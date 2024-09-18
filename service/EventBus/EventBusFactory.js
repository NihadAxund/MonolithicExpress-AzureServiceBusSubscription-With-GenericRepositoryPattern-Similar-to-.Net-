import { EventBusServiceBus } from "../../Business/EventBusSerivceBus.js";


export class EventBusFactory {
    static create(eventBusConfig, serviceProvider) {
        console.log(eventBusConfig)
        switch (eventBusConfig.eventBusType) {
            case 'AzureServiceBus':
                return new EventBusServiceBus(eventBusConfig, serviceProvider);
            default:
                throw new Error(`Unknown event bus type: ${eventBusConfig.eventBusType}`);
        }
    }
}
