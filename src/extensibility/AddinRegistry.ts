import { deepFreeze, splitPath } from './AddinContainer';
import { AddinAddOptions, OverwriteStrategy } from './AddinContainer.interface';

export type AddinContent<T> = ((...arg: any) => T) | T;

export interface Addin<T = unknown> {
    id: string;
    position?: number;
    permission?: () => boolean;
    content: AddinContent<T>;
    children?: Addin<unknown>[];
}

enum AddinRegistryState {
    Initializing,
    Running,
}

class IdExistsError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'IdExistsError';
    }
}

class InvalidStateError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidState';
    }
}

function getContent<T>(content: AddinContent<T>, contentParams?: any[]): T {
    if (typeof content === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const contentFn = content as Function;
        if (contentParams) {
            return contentFn(...contentParams) as T;
        }
        return contentFn();
    }
    return content as T;
}

const defaultAddinOptions: AddinAddOptions = {
    overwriteStrategy: OverwriteStrategy.THROW,
};

class RegistryNode<T> {
    private readonly _items: Addin<T>[];
    private _subNodes: Map<string, RegistryNode<unknown>>;

    constructor() {
        this._items = [];
        this._subNodes = new Map<string, RegistryNode<unknown>>();
    }

    addItems(items: Addin<T>[], options: AddinAddOptions) {
        let lastPosition = 0;
        items.forEach((item: Addin<T>) => {
            const clonedItem: Addin<T> = { ...item };
            clonedItem.position = clonedItem.position ?? lastPosition;
            lastPosition = clonedItem.position;
            const existingItemIndex = this._items.findIndex((existingItem) => existingItem.id === clonedItem.id);
            if (existingItemIndex === -1) {
                this._items.push(clonedItem);
            } else {
                switch (options.overwriteStrategy) {
                    case OverwriteStrategy.THROW: {
                        throw new IdExistsError(clonedItem.id);
                    }
                    case OverwriteStrategy.KEEP_EXISTING: {
                        return;
                    }
                    case OverwriteStrategy.KEEP_NEW: {
                        this._items[existingItemIndex] = clonedItem;
                    }
                }
            }

            if (clonedItem.children) {
                const innerRegistryNode = this.getRegistryNode([clonedItem.id]);
                innerRegistryNode.addItems(clonedItem.children!, options);
                delete clonedItem.children;
            }
            deepFreeze(clonedItem);
        });

        this._items.sort((first, second) => {
            return (first.position ?? 0) - (second.position ?? 0);
        });
    }

    getRegistryNode<K = unknown>(axes: string[]): RegistryNode<K> {
        if (axes.length === 0) {
            return this as RegistryNode<unknown> as RegistryNode<K>;
        }
        const nextAxis = axes.shift()!;
        if (!this.hasChildNode(nextAxis)) {
            this._subNodes.set(nextAxis, new RegistryNode<K>());
        }
        return this._subNodes.get(nextAxis)!.getRegistryNode<K>(axes);
    }

    hasChildNode(axis: string): boolean {
        return this._subNodes.has(axis);
    }

    getItems(): Addin<T>[] {
        return this._items
            .map<Addin<T>>((item) => {
                const result: Addin<T> = { ...item };
                if (this.hasChildNode(item.id)) {
                    result.children = this.getRegistryNode<unknown>([item.id]).getItems();
                }
                return result;
            })
            .filter((item) => {
                if (item.permission === undefined) {
                    return true;
                }
                return item.permission();
            });
    }
}

class AddinRegistry {
    private _root: RegistryNode<unknown>;
    private _state: AddinRegistryState;

    constructor() {
        this._root = new RegistryNode<unknown>();
        this._state = AddinRegistryState.Initializing;
    }

    private verifyState(state: AddinRegistryState) {
        if (this._state !== state) {
            throw new InvalidStateError(
                'AddinContainer operation is not supported in current state. You cannot modify the registry container after it was started or get items from it before it was started.',
            );
        }
    }

    protected getAddinsInternal<T = unknown>(path: string) {
        const axes = splitPath(path);
        const targetNode = this._root.getRegistryNode<T>(axes);
        return [...targetNode.getItems()];
    }

    add<T>(path: string, addins: Addin<T>[], options?: AddinAddOptions) {
        this.verifyState(AddinRegistryState.Initializing);
        if (options === undefined) {
            options = defaultAddinOptions;
        }
        const axes = splitPath(path);
        const targetNode = this._root.getRegistryNode(axes);
        try {
            targetNode.addItems(addins, options);
        } catch (ex: any) {
            if (ex.name === 'IdExistsError') {
                throw new Error(
                    `Could not add to path ${path} because an item with the id ${ex.message} already exists`,
                );
            }
            throw ex;
        }
    }

    addMap<T extends object>(path: string, items: T[], idProperty = 'id', options?: AddinAddOptions) {
        this.verifyState(AddinRegistryState.Initializing);
        this.add<T>(
            path,
            items.map((item: any) => {
                return {
                    id: item[idProperty],
                    content: item,
                    position: item.position,
                    permission: typeof item.permission === 'function' ? item.permission : undefined,
                } as Addin<T>;
            }),
            options,
        );
    }

    getAddins<T = unknown>(path: string): Addin<T>[] {
        this.verifyState(AddinRegistryState.Running);
        return this.getAddinsInternal(path);
    }

    get<T = unknown>(path: string, contentParams?: any[]): T[] {
        this.verifyState(AddinRegistryState.Running);
        const axes = splitPath(path);
        const targetNode = this._root.getRegistryNode<T>(axes);
        return targetNode.getItems().map((item) => {
            return getContent<T>(item.content, contentParams);
        });
    }

    getAsMap<T = unknown>(path: string, contentParams?: any[]): Map<string, T> {
        this.verifyState(AddinRegistryState.Running);
        const addins: Addin<T>[] = this.getAddinsInternal<T>(path);
        const result = new Map();
        addins.forEach((addin) => {
            result.set(addin.id, getContent<T>(addin.content, contentParams));
        });

        return result;
    }

    getById<T = unknown>(path: string, id: string, contentParams?: any[]): T | undefined {
        this.verifyState(AddinRegistryState.Running);
        const addins: Addin<T>[] = this.getAddinsInternal<T>(path);
        const foundAddin = addins.find((addin) => addin.id === id);
        if (foundAddin) {
            return getContent<T>(foundAddin.content, contentParams);
        }
        return undefined;
    }

    start() {
        this.verifyState(AddinRegistryState.Initializing);
        this._state = AddinRegistryState.Running;
    }
}

export default AddinRegistry;
