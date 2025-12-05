import * as React from 'react';
import { useSearchParams } from 'react-router';
import { AddToCart } from '../AddToCart.tsx';

const ProductAddToCartWrapper: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sku = searchParams.get('sku');

    if (!sku) return null;

    return <AddToCart sku={sku} />;
};

export { ProductAddToCartWrapper };
