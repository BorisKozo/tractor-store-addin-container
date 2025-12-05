import { globalAddinContainer } from '../../extensibility/AddinContainer.ts';
import { routesAddinPath } from '../../interface/app.interface.ts';
import { productPageAddinPath, PageAddin } from '../../interface/decide.interface.ts';
import { ProductPage } from './ProductPage.tsx';
import { ProductPageContent } from './components/ProductPageContent.tsx';

function initializeRouter() {
    globalAddinContainer.add(routesAddinPath, [
        {
            id: 'Product Page',
            content: {
                path: '/product/:id',
                Component: ProductPage,
            },
        },
    ]);
}

function initializePageContent() {
    globalAddinContainer.add<PageAddin>(productPageAddinPath, [
        {
            id: 'ProductPageContent',
            position: 20,
            content: {
                component: ProductPageContent,
            },
        },
    ]);
}

export function initializeDecide() {
    initializeRouter();
    initializePageContent();
}
