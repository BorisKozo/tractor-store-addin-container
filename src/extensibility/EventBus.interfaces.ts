export type IEventHandler<T = any> = (data?: T) => void;

export interface IEventBus {
    registerEventHandler: <T = any>(name: string, handler: IEventHandler<T>) => void;
    unregisterEventHandler: <T = any>(name: string, handler: IEventHandler<T>) => void;
    fireEvent: <T = any>(name: string, data?: T) => void;
}
