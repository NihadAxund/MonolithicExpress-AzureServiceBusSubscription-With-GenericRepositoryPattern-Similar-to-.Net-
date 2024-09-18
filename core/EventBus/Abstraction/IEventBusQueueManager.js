class IEventBusQueueManager {
    constructor() {
        if (new.target === IEventBusQueueManager) {
            throw new Error("Cannot instantiate interface IEventBusQueueManager");
        }
    }

    get isEmpty() {
        throw new Error("Property 'isEmpty' must be implemented.");
    }

    get onMessageRemoved() {
        throw new Error("Property 'onMessageRemoved' must be implemented.");
    }

    set onMessageRemoved(handler) {
        throw new Error("Property 'onMessageRemoved' must be implemented.");
    }

    addQueue(queueName) {
        throw new Error("Method 'addQueue()' must be implemented.");
    }

    removeQueue(queueName) {
        throw new Error("Method 'removeQueue()' must be implemented.");
    }

    hasQueue(queueName) {
        throw new Error("Method 'hasQueue()' must be implemented.");
    }

    clear() {
        throw new Error("Method 'clear()' must be implemented.");
    }

    getQueues() {
        throw new Error("Method 'getQueues()' must be implemented.");
    }

    getQueueName(eventType) {
        throw new Error("Method 'getQueueName()' must be implemented.");
    }
}

export { IEventBusQueueManager };
