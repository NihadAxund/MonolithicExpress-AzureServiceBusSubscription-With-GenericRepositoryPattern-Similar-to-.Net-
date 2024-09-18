class IEventBusSubscriptionManager {
    constructor() {
        if (new.target === IEventBusSubscriptionManager) {
            throw new Error("Cannot instantiate interface IEventBusSubscriptionManager");
        }
    }

    get isEmpty() {
        throw new Error("Property 'isEmpty' must be implemented.");
    }

    get onEventRemoved() {
        throw new Error("Property 'onEventRemoved' must be implemented.");
    }

    set onEventRemoved(handler) {
        throw new Error("Property 'onEventRemoved' must be implemented.");
    }

    addSubscription(eventType, handlerType) {
        throw new Error("Method 'addSubscription()' must be implemented.");
    }

    removeSubscription(eventType, handlerType) {
        throw new Error("Method 'removeSubscription()' must be implemented.");
    }

    hasSubscriptionsForEvent(eventName) {
        throw new Error("Method 'hasSubscriptionsForEvent()' must be implemented.");
    }

    hasSubscriptionsForEventType(eventType) {
        throw new Error("Method 'hasSubscriptionsForEventType()' must be implemented.");
    }

    getEventTypeByName(eventName) {
        throw new Error("Method 'getEventTypeByName()' must be implemented.");
    }

    clear() {
        throw new Error("Method 'clear()' must be implemented.");
    }

    getHandlersForEvent(eventType) {
        throw new Error("Method 'getHandlersForEvent()' must be implemented.");
    }

    getHandlersForEventByName(eventName) {
        throw new Error("Method 'getHandlersForEventByName()' must be implemented.");
    }

    getEventKey(eventType) {
        throw new Error("Method 'getEventKey()' must be implemented.");
    }
}

export { IEventBusSubscriptionManager };
