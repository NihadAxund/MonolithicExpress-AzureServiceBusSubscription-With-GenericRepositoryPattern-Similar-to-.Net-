class OrderPaymentSuccessIntegrationEventHandler {
    constructor(eventBus) {
        //this._configuration = configuration;
        this._eventBus = eventBus;
       // this._logger = logger;
    }

    async handle(event) {

        console.log("*********************************************************")
        console.log(event);
        console.log("*********************************************************")
        return true; 
    }
}

export default OrderPaymentSuccessIntegrationEventHandler;
