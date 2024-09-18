class ServiceProvider {
    constructor() {
        this.services = new Map(); 
    }

    addService(name = null, instance) {
        if (name == null) {
            instance.constructor.name
        }
        this.services.set(name, instance); 
    }

    getService(name) {
        return this.services.get(name); 
    }
    getAll() {
        return this.services;
    }
}

export const serviceProvider = new ServiceProvider();
