class SubscriptionInfo {
    constructor(handlerType) {
        if (!handlerType) {
            throw new Error("handlerType is required");
        }

        this.handlerType = handlerType;
    }

    static typed(handlerType) {
        return new SubscriptionInfo(handlerType);
    }
}

export { SubscriptionInfo };
