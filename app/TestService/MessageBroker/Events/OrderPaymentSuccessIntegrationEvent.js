import IntegrationEvent from "../../../../core/EventBus/Concrete/IntegrationEvent.js";





export class OrderPaymentSuccessIntegrationEvent extends IntegrationEvent { 
    constructor(messageid, orderId = null, message = "succes order payment nodejs :)") {
        super(messageid); // Base class constructor call
        this.orderId = orderId || 0; // Initialize with given or default value
        this.message = message; // Default message
    }
}
