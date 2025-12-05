import { buildPath } from '../extensibility/AddinContainer.ts';
import React from 'react';

// Event names
export const selectedShopEventName = 'selected-shop';

// Event payload types
export interface SelectedShopEventData {
    shop: string;
}

export const headerRightComponentsAddinPath = buildPath('Header', 'Right Components');

export interface HeaderRightComponentAddin {
    component: React.FC;
    props?: Record<string, any>;
}

export interface PageAddin {
    component: React.FC<any>;
    props?: Record<string, any>;
}

export const mainPageAddinPath = buildPath('Pages', 'Explore', 'Main Page');
export const productsPageAddinPath = buildPath('Pages', 'Explore', 'Products');
export const storesPageAddinPath = buildPath('Pages', 'Explore', 'Stores');
