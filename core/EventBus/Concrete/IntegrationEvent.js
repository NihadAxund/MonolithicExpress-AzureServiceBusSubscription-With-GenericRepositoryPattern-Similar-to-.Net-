import { v4 as uuidv4 } from 'uuid';
import IIntegrationEvent from '../../Abstraction/IIntegrationEvent.js';

export default class IntegrationEvent extends IIntegrationEvent {

    constructor(id = null, createDate = null) {
        super();
        this.id = id || uuidv4(); // Generate a new UUID if not provided
        this.createDate = createDate || new Date(); // Use the current date if not provided
    }


    // Factory method to create an instance with specific values
    static create(id, createDate) {
        return new IntegrationEvent(id, createDate);
    }
}

