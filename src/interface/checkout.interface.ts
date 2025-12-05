import { buildPath } from '../extensibility/AddinContainer.ts';
import React from 'react';

// Event names
export const addToCartEventName = 'add-to-cart';
export const removeFromCartEventName = 'remove-from-cart';
export const clearCartEventName = 'clear-cart';
export const updatedCartEventName = 'updated-cart';
export const cartSkusUpdateEventName = 'cart-skus-update';
export const cartSkusRequestEventName = 'cart-skus-request';

// Event payload types
export interface AddToCartEventData {
    sku: string;
}

export interface RemoveFromCartEventData {
    sku: string;
}

export interface CartSkusUpdateEventData {
    skus: string[];
}

export interface PageAddin {
    component: React.FC<any>;
    props?: Record<string, any>;
}

export const cartPageAddinPath = buildPath('Pages', 'Checkout', 'Cart Page');
export const checkoutPageAddinPath = buildPath('Pages', 'Checkout', 'Checkout Page');
export const thanksPageAddinPath = buildPath('Pages', 'Checkout', 'Thanks Page');

export const storePickerAddinPath = buildPath('Checkout', 'Store Picker');

export interface StorePickerAddin {
    component: React.FC;
}
