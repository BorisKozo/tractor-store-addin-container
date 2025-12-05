import { buildPath } from '../extensibility/AddinContainer.ts';
import React from 'react';

export interface PageAddin {
    component: React.FC<any>;
    props?: Record<string, any>;
}

export const productPageAddinPath = buildPath('Pages', 'Decide', 'Product Page');
