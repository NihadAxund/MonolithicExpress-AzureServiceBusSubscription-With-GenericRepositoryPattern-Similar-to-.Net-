class QueueInfo {
    constructor(queueName, handlerType) {
        if (!queueName) {
            throw new Error("queueName is required");
        }
        if (!handlerType) {
            throw new Error("handlerType is required");
        }

        this.queueName = queueName;
        this.handlerType = handlerType;
    }

    static create(queueName, handlerType) {
        return new QueueInfo(queueName, handlerType);
    }
}

export { QueueInfo };
