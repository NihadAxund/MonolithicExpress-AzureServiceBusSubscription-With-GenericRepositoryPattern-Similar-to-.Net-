import { IIntegrationEventHandler } from "../../../../core/EventBus/Abstraction/IIntegrationEventHandler.js";
import { MedicalHistorySericeVaultController } from "../../testService.controller.js";
import { OrderPaymentSuccessIntegrationEvent } from "../Events/OrderPaymentSuccessIntegrationEvent.js";


class OrderStartedIntegrationEventHandler extends IIntegrationEventHandler {
    constructor( eventBus) {
        super()
 
        this.eventBus = eventBus;

    }

    async handle(event) {
        const keyword = "PaymentSuccess";
        MedicalHistorySericeVaultController.getMedicalHistoryVaultById(event.orderId);

        //const paymentSuccessFlag = this._configuration[keyword]; // Config'den �deme durumunu al�yoruz

        console.log("Event handler function");
        //const paymentEvent = paymentSuccessFlag
        //    ? new OrderPaymentSuccessIntegrationEvent(event.orderId)
        //    : new OrderPaymentFailedIntegrationEvent(event.orderId, "This is a Fake error message");

        const paymentEvent = new OrderPaymentSuccessIntegrationEvent(event.id, event.orderId,  "succes order payment nodejs :)");

        console.log(this.eventBus)

        await setTimeout(() => {
            this.eventBus.publish(paymentEvent);

        }, 1000);

        return true; 
    }
}

export default OrderStartedIntegrationEventHandler;
