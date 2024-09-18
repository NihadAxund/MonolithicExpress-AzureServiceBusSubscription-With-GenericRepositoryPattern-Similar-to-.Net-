class InMemoryEventBusSubscriptionManager {
    constructor(eventNameGetter) {
        this.handlers = new Map();
        this.eventTypes = [];
        this.eventNameGetter = eventNameGetter;
        this.onEventRemoved = null;
    }

    get isEmpty() {
        return this.handlers.size === 0;
    }

    clear() {
        this.handlers.clear();
    }

    addSubscription(eventType, handlerType) {
        const eventName = handlerType;
        this.addSubscriptionInternal(eventType, eventName);

        if (!this.eventTypes.includes(eventType)) {
            this.eventTypes.push(eventType);
        }
    }

    addSubscriptionInternal(handlerType, eventName) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }

        const existingSubscriptions = this.handlers.get(eventName);
        if (existingSubscriptions.some(sub => sub.handlerType === handlerType)) {
            throw new Error(`Handler Type ${handlerType.name} already registered for '${eventName}'`);
        }

        existingSubscriptions.push({ handlerType });
    }

    removeSubscription(eventType, handlerType) {
        const eventName = this.getEventKey(eventType);
        const subscriptionToRemove = this.findSubscriptionToRemove(eventType, handlerType);
        this.removeHandler(eventName, subscriptionToRemove);
    }

    removeHandler(eventName, subscriptionToRemove) {
        if (subscriptionToRemove) {
            const subscriptions = this.handlers.get(eventName);
            subscriptions.splice(subscriptions.indexOf(subscriptionToRemove), 1);

            if (subscriptions.length === 0) {
                this.handlers.delete(eventName);
                const eventTypeIndex = this.eventTypes.findIndex(e => e.name === eventName);
                if (eventTypeIndex !== -1) {
                    this.eventTypes.splice(eventTypeIndex, 1);
                }
                this.raiseOnEventRemoved(eventName);
            }
        }
    }

    getHandlersForEvent(eventType) {
     
        return this.getHandlersForEventByName(eventType);
    }

    getHandlersForEventByName(eventName) {
        return this.handlers.get(eventName) || [];
    }

    raiseOnEventRemoved(eventName) {
        if (this.onEventRemoved) {
            this.onEventRemoved(eventName);
        }
    }

    findSubscriptionToRemove(eventType, handlerType) {
        const eventName = this.getEventKey(eventType);
        return this.findSubscriptionToRemoveByName(eventName, handlerType);
    }

    findSubscriptionToRemoveByName(eventName, handlerType) {
        const subscriptions = this.handlers.get(eventName) || [];
        return subscriptions.find(sub => sub.handlerType === handlerType) || null;
    }

    getEventKey(eventType) {
        console.log(eventType);
        const eventName = eventType.name;
        return this.eventNameGetter(eventName);
    }

    getEventTypeByName(eventName) {
        if (!eventName) {
            throw new Error("Event name cannot be null or empty");
        }

        const eventType = this.eventTypes.find(t => t.name === eventName);

        if (!eventType) {
            throw new Error(`Event type with name '${eventName}' could not be found.`);
        }

        return eventType;
    }

    hasSubscriptionsForEvent(eventType) {

        return this.handlers.has(eventType);
    }

    hasSubscriptionsForEventByName(eventName) {
        return this.handlers.has(eventName);
    }
}

export { InMemoryEventBusSubscriptionManager };
