export default class IEventBus {
    async publish(event) {
        throw new Error("Method 'publish(event)' must be implemented.");
    }

    subscribe(eventType, handler) {
        throw new Error("Method 'subscribe(eventType, handler)' must be implemented.");
    }

    unsubscribe(eventType, handler) {
        throw new Error("Method 'unsubscribe(eventType, handler)' must be implemented.");
    }

    dispose() {
        throw new Error("Method 'dispose()' must be implemented.");
    }
}
