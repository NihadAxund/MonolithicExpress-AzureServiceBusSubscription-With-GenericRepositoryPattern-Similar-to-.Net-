import IntegrationEvent from "../../../../core/EventBus/Concrete/IntegrationEvent.js";





export class OrderStartedIntegrationEvent extends IntegrationEvent {
    constructor(orderId = null) {
        super(); // Base class constructor call
        this.orderId = orderId || 0; // Initialize with given or default value
        this.message = "TEST with nodejs :)"; // Default message
    }
}
