export class EventBusConfig {
    constructor({
        connectionRetryCount = 5,
        defaultTopicName = "SellingBuddyEventBus",
        subscriptionClientAppName = '',
        eventBusConnectionString = '',
        eventNameSuffix = '',
        eventNamePrefix = '',
        eventBusType = null,
    } = {}) {
        this.connectionRetryCount = connectionRetryCount;
        this.defaultTopicName = defaultTopicName;
        this.subscriptionClientAppName = subscriptionClientAppName;
        this.eventBusConnectionString = eventBusConnectionString;
        this.eventNameSuffix = eventNameSuffix;
        this.eventNamePrefix = eventNamePrefix;
        this.eventBusType = eventBusType;
    }

    // Getter for deleting prefix
    get deleteEventPrefix() {
        return this.eventNamePrefix !== '';
    }

    // Getter for deleting suffix
    get deleteEventSuffix() {
        return this.eventNameSuffix !== '';
    }

    static updateConfig(config) {
        Object.assign(this, config);
    }
}


// Enum for EventBusType
export const EventBusType = {
    AzureServiceBus: 0
};

