import { globalAddinContainer } from '../../extensibility/AddinContainer.ts';
import { routesAddinPath } from '../../interface/app.interface.ts';
import {
    mainPageAddinPath,
    productsPageAddinPath,
    storesPageAddinPath,
    PageAddin,
} from '../../interface/explore.interface.ts';
import {
    cartPageAddinPath,
    checkoutPageAddinPath,
    thanksPageAddinPath,
    PageAddin as CheckoutPageAddin,
    storePickerAddinPath,
    StorePickerAddin,
} from '../../interface/checkout.interface.ts';
import { productPageAddinPath, PageAddin as DecidePageAddin } from '../../interface/decide.interface.ts';
import { MainPage } from './MainPage.tsx';
import { CategoryPage } from './CategoryPage.tsx';
import { StoresPage } from './StoresPage.tsx';
import { MainPageContent } from './components/MainPageContent.tsx';
import { ProductsPageContent } from './components/ProductsPageContent.tsx';
import { StoresPageContent } from './components/StoresPageContent.tsx';
import { RecommendationsWrapper } from './components/RecommendationsWrapper.tsx';
import { CartRecommendationsWrapper } from './components/CartRecommendationsWrapper.tsx';
import { ProductRecommendationsWrapper } from './components/ProductRecommendationsWrapper.tsx';
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { StorePicker } from './StorePicker.tsx';

function initializeRouter() {
    globalAddinContainer.add(routesAddinPath, [
        {
            id: 'Main Page',
            content: {
                path: '/',
                Component: MainPage,
            },
        },
        {
            id: 'Category Page',
            content: {
                path: '/products/:category?',
                Component: CategoryPage,
            },
        },
        {
            id: 'Stores Page',
            content: {
                path: '/stores',
                Component: StoresPage,
            },
        },
    ]);
}

function initializePageContent() {
    globalAddinContainer.add<PageAddin>(mainPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'MainPageContent',
            position: 20,
            content: {
                component: MainPageContent,
            },
        },
        {
            id: 'Recommendations',
            position: 30,
            content: {
                component: RecommendationsWrapper,
                props: {
                    skus: ['CL-01-GY', 'AU-07-MT'],
                    className: 'e_HomePage__recommendations',
                },
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    globalAddinContainer.add<PageAddin>(productsPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'ProductsPageContent',
            position: 20,
            content: {
                component: ProductsPageContent,
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    globalAddinContainer.add<PageAddin>(storesPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'StoresPageContent',
            position: 20,
            content: {
                component: StoresPageContent,
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    // Checkout pages - Header, Footer, and Recommendations
    globalAddinContainer.add<CheckoutPageAddin>(cartPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'Recommendations',
            position: 30,
            content: {
                component: CartRecommendationsWrapper,
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    globalAddinContainer.add<CheckoutPageAddin>(checkoutPageAddinPath, [
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    // Store picker for checkout page
    globalAddinContainer.add<StorePickerAddin>(storePickerAddinPath, [
        {
            id: 'StorePicker',
            content: {
                component: StorePicker,
            },
        },
    ]);

    globalAddinContainer.add<CheckoutPageAddin>(thanksPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);

    // Product page - Header, Footer, and Recommendations
    globalAddinContainer.add<DecidePageAddin>(productPageAddinPath, [
        {
            id: 'Header',
            position: 10,
            content: {
                component: Header,
            },
        },
        {
            id: 'Recommendations',
            position: 30,
            content: {
                component: ProductRecommendationsWrapper,
            },
        },
        {
            id: 'Footer',
            position: 40,
            content: {
                component: Footer,
            },
        },
    ]);
}

export function initializeExplore() {
    initializeRouter();
    initializePageContent();
}
