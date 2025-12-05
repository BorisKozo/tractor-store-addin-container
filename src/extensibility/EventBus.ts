import { forEach, remove, isEmpty } from 'lodash';
import { IEventBus, IEventHandler } from './EventBus.interfaces.ts';

export class EventBusClass implements IEventBus {
    private listeners: Map<string, IEventHandler[]> = new Map();

    public registerEventHandler<T = any>(name: string, handler: IEventHandler<T>) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, []);
        }

        const eventListeners = this.listeners.get(name)!;
        eventListeners.push(handler);
    }

    public unregisterEventHandler<T = any>(name: string, handler: IEventHandler<T>) {
        const eventListeners = this.listeners.get(name);
        if (!eventListeners) {
            return;
        }
        remove(eventListeners, (l: any) => l === handler);

        if (isEmpty(eventListeners)) {
            this.listeners.delete(name);
        }
    }

    fireEvent<T = any>(name: string, event?: T) {
        const eventListeners = this.listeners.get(name);
        if (!eventListeners || isEmpty(eventListeners)) {
            return false;
        }

        forEach(eventListeners, (listener: (data: any) => void) => {
            listener.apply(this, [event]);
        });
    }
}
