import { useState, useEffect } from 'react';
import { globalAddinContainer } from '../../../extensibility/AddinContainer.ts';
import {
    AddToCartEventData,
    addToCartEventName,
    cartSkusRequestEventName,
    CartSkusUpdateEventData,
    cartSkusUpdateEventName,
    clearCartEventName,
    RemoveFromCartEventData,
    removeFromCartEventName,
    updatedCartEventName,
} from '../../../interface/checkout.interface.ts';

const store: Array<{ sku: string; quantity: number }> = [];
const eventBus = globalAddinContainer.getEventBus();

eventBus.registerEventHandler<AddToCartEventData>(addToCartEventName, (data) => {
    if (!data) return;
    const { sku } = data;

    const item = store.find((m) => m.sku === sku);

    if (item) {
        item.quantity++;
    } else {
        store.push({ sku, quantity: 1 });
    }

    eventBus.fireEvent(updatedCartEventName);
    const skus = store.map((item) => item.sku);
    eventBus.fireEvent<CartSkusUpdateEventData>(cartSkusUpdateEventName, { skus });
});

eventBus.registerEventHandler<RemoveFromCartEventData>(removeFromCartEventName, (data) => {
    if (!data) return;
    const { sku } = data;

    const index = store.findIndex((m) => m.sku === sku);

    if (index >= 0) {
        store.splice(index, 1);
        eventBus.fireEvent(updatedCartEventName);
        const skus = store.map((item) => item.sku);
        eventBus.fireEvent<CartSkusUpdateEventData>(cartSkusUpdateEventName, { skus });
    }
});

eventBus.registerEventHandler(clearCartEventName, () => {
    store.splice(0, store.length);
    eventBus.fireEvent(updatedCartEventName);
    eventBus.fireEvent<CartSkusUpdateEventData>(cartSkusUpdateEventName, { skus: [] });
});

eventBus.registerEventHandler(cartSkusRequestEventName, () => {
    const skus = store.map((item) => item.sku);
    eventBus.fireEvent<CartSkusUpdateEventData>(cartSkusUpdateEventName, { skus });
});

export function useLineItems() {
    const [items, setItems] = useState(store);

    useEffect(() => {
        const refresh = () => setItems([...store]);
        eventBus.registerEventHandler(updatedCartEventName, refresh);
        return () => {
            eventBus.unregisterEventHandler(updatedCartEventName, refresh);
        };
    }, []);

    return items;
}
