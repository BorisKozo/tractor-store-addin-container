import { Addin } from './AddinRegistry';
import { IEventBus } from './EventBus.interfaces.ts';

export enum OverwriteStrategy {
    KEEP_NEW,
    KEEP_EXISTING,
    THROW,
}

/**
 * Allows you to control some of the addin addition aspects
 */
export interface AddinAddOptions {
    /**
     * What happens if you try to add an addin with an id that already exists
     */
    overwriteStrategy: OverwriteStrategy;
}

export interface IAddinContainer {
    /**
     * Returns a service of type T that was added under the given _id_.
     * @param id - The id of the service to get
     */
    getService<T>(id: string): T;

    /**
     * Adds a given _service_ under the given _id_ into the addin container.
     * Note that the service is added as any other addin. The add and get methods are provided as syntactic sugar to perform these operations more easily.
     * @param id - The id of the service to add.
     * @param service - The service to add.
     */
    addService(id: string, service: any): void;

    /**
     * Returns all the addins in the given _path_. If the addins had children they will be built automatically.
     * @param path - The path of the addins to get.
     */
    getAddins<T = unknown>(path: string): Addin<T>[];

    /**
     * Returns all the _content_ elements of every addin in the given _path_. If the _content_ is a function it will be invoked and the return value of that function will be returned.
     * @param path - The path of the addins which content will be returned.
     * @param contentParams - If the content of the addin is a function. It will be called with these arguments spread.
     */
    get<T = unknown>(path: string, contentParams?: any[]): T[];

    /**
     * Returns all the _content_ elements of every addin in the given _path_ as a map where the key is the addin id and the value is the addin content.
     * @param path - The path of the addins which content will be returned.
     * @param contentParams - If the content of the addin is a function. It will be called with these arguments spread.
     */
    getAsMap<T = unknown>(path: string, contentParams?: any[]): Map<string, T>;

    /**
     * Returns the _content_ element of a specific addin with the given _id_. If an addin with the given _id_ is not found ```undefined``` is returned.
     * @param path - The path of the addin to get.
     * @param id - The id of the addin to get.
     * @param contentParams - If the content of the addin is a function. It will be called with these arguments spread.
     */
    getById<T = unknown>(path: string, id: string, contentParams?: any[]): T | undefined;

    /**
     * Adds the given addins (_items_) to the given path. You have some control of the addition process with the _options_ argument.
     * @param path - The path where the addins will be added.
     * @param addins - The addins to add
     * @param options - Some options that control the add operation.
     */
    add<T>(path: string, addins: Addin<T>[], options?: AddinAddOptions): void;

    /**
     * Adds the given contents _items_ as addins in the given _path_. For each item a new addin will be created and the item is set as its content.
     * The id of the addin will be taken from the item itself using the _idProperty_ field. For example if the item has a "name" property
     * passing "name" and the _idProperty_ will try to create addins with ids taken from the "name" property.
     * @param path - The path where the addins will be added.
     * @param items - The content of the added addins.
     * @param idProperty - The porperty of each item to take as the addin id.
     * @param options - Some options that control the add operation.
     */
    addMap(path: string, items: any[], idProperty?: string, options?: AddinAddOptions): void;

    /**
     * Returns the global event bus
     */
    getEventBus(): IEventBus;

    /**
     * Call this method once you are finished initializing the container. Once initialized you can no longer add to it but now you can get items from it.
     */
    start(): void;
}
