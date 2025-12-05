import * as React from 'react';
import { useSearchParams } from 'react-router';
import { Recommendations } from '../Recommendations.tsx';

const ProductRecommendationsWrapper: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sku = searchParams.get('sku');

    if (!sku) return null;

    return <Recommendations skus={[sku]} />;
};

export { ProductRecommendationsWrapper };
