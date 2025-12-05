import AddinRegistry from './AddinRegistry';
import { IAddinContainer } from './AddinContainer.interface';
import { IEventBus } from './EventBus.interfaces.ts';
import { EventBusClass } from './EventBus.ts';

const AXES_SEPARATOR = '.';

export const deepFreeze = (obj: any): any => {
    if (obj instanceof Map) {
        obj.clear =
            obj.delete =
            obj.set =
                function () {
                    throw new Error('Frozen Map is read-only');
                };
    } else if (obj instanceof Set) {
        obj.add =
            obj.clear =
            obj.delete =
                function () {
                    throw new Error('Frozen set is read-only');
                };
    }

    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        const prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop === 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });
    return obj;
};

export function buildPath(...axes: string[]): string {
    return axes.join(AXES_SEPARATOR);
}

export function splitPath(path: string): string[] {
    return path.split(AXES_SEPARATOR);
}

class AddinContainer extends AddinRegistry implements IAddinContainer {
    private readonly _services: Map<string, any>;
    private readonly _eventBus: IEventBus;

    constructor() {
        super();
        this._services = new Map<string, any>();
        this._eventBus = new EventBusClass();
    }

    getService<T>(id: string): T {
        const service = this._services.get(id);
        if (service === undefined) {
            throw new Error(`The service ${id} is not in the addin container`);
        }
        return service as T;
    }

    addService(id: string, service: object): void {
        if (this._services.has(id)) {
            throw new Error(`A service with the id ${id} was already added to the container`);
        }
        this._services.set(id, service);
    }

    getEventBus(): IEventBus {
        return this._eventBus;
    }
}

export { AddinContainer };

//This is split into two lines for the autocomplete of Webstorm to work
export const globalAddinContainer = new AddinContainer();
// window['globalAddinContainer'] = globalAddinContainer;
export default globalAddinContainer as IAddinContainer;

export function getService<T>(id: string): T {
    return globalAddinContainer.getService<T>(id);
}
