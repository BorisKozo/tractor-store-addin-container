import { globalAddinContainer } from '../../extensibility/AddinContainer.ts';
import { routesAddinPath } from '../../interface/app.interface.ts';
import { headerRightComponentsAddinPath, HeaderRightComponentAddin } from '../../interface/explore.interface.ts';
import {
    cartPageAddinPath,
    checkoutPageAddinPath,
    thanksPageAddinPath,
    PageAddin,
} from '../../interface/checkout.interface.ts';
import { productPageAddinPath, PageAddin as DecidePageAddin } from '../../interface/decide.interface.ts';
import { CartPage } from './CartPage.tsx';
import { Checkout } from './Checkout.tsx';
import { Thanks } from './Thanks.tsx';
import { MiniCart } from './MiniCart.tsx';
import { CartPageContent } from './components/CartPageContent.tsx';
import { CheckoutPageContent } from './components/CheckoutPageContent.tsx';
import { ThanksPageContent } from './components/ThanksPageContent.tsx';
import { ProductAddToCartWrapper } from './components/ProductAddToCartWrapper.tsx';
import { CompactHeader } from './CompactHeader.tsx';

function initializeRouter() {
    globalAddinContainer.add(routesAddinPath, [
        {
            id: 'Cart Page',
            content: {
                path: '/checkout/cart',
                Component: CartPage,
            },
        },
        {
            id: 'Checkout Page',
            content: {
                path: '/checkout/checkout',
                Component: Checkout,
            },
        },
        {
            id: 'Thanks Page',
            content: {
                path: '/checkout/thanks',
                Component: Thanks,
            },
        },
    ]);
}

function initializeHeaderComponents() {
    globalAddinContainer.add<HeaderRightComponentAddin>(headerRightComponentsAddinPath, [
        {
            id: 'MiniCart',
            content: {
                component: MiniCart,
            },
        },
    ]);
}

function initializePageContent() {
    globalAddinContainer.add<PageAddin>(cartPageAddinPath, [
        {
            id: 'CartPageContent',
            position: 20,
            content: {
                component: CartPageContent,
            },
        },
    ]);

    globalAddinContainer.add<PageAddin>(checkoutPageAddinPath, [
        {
            id: 'CompactHeader',
            position: 10,
            content: {
                component: CompactHeader,
            },
        },
        {
            id: 'CheckoutPageContent',
            position: 20,
            content: {
                component: CheckoutPageContent,
            },
        },
    ]);

    globalAddinContainer.add<PageAddin>(thanksPageAddinPath, [
        {
            id: 'ThanksPageContent',
            position: 20,
            content: {
                component: ThanksPageContent,
            },
        },
    ]);

    // Product page - AddToCart
    globalAddinContainer.add<DecidePageAddin>(productPageAddinPath, [
        {
            id: 'AddToCart',
            position: 25,
            content: {
                component: ProductAddToCartWrapper,
            },
        },
    ]);
}

export function initializeCheckout() {
    initializeRouter();
    initializeHeaderComponents();
    initializePageContent();
}
