import * as React from 'react';
import { useParams, useNavigate } from 'react-router';
import { VariantOption } from './VariantOption';
import data from '../data/db.json';
import '../css/ProductPage.css';
import { src, srcset } from './../../../common/utils';

function useSku() {
    const [sku, setSku] = React.useState(() => new URL(location.href).searchParams.get('sku'));
    const navigate = useNavigate();

    return [
        sku,
        (val: string) => {
            navigate(`?sku=${val}`, { replace: true });
            setSku(val);
        },
    ] as const;
}

const ProductPageContent: React.FC = () => {
    const { id } = useParams();
    const [sku, setSku] = useSku();

    const product = data.products.find((p) => p.id === id);
    const { name = '', variants = [], highlights = [] } = product || {};
    const variant = variants.find((v) => v.sku === sku) || variants[0];

    // Ensure URL has SKU query param (use default if missing)
    React.useEffect(() => {
        if (!sku && variant) {
            setSku(variant.sku);
        }
    }, [sku, variant, setSku]);

    const handleSkuSelect = (ev: React.MouseEvent) => {
        const attr = (ev.target as HTMLElement).getAttribute('href');

        if (attr) {
            const val = attr.substring(attr.indexOf('?sku=') + 5);
            setSku(val);
        }
    };

    if (!product) return null;
    return (
        <div className='d_ProductPage__details'>
            <img
                className='d_ProductPage__productImage'
                src={src(variant.image, 400)}
                srcSet={srcset(variant.image, [400, 800])}
                sizes='400px'
                width='400'
                height='400'
                alt={`${name} - ${variant.name}`}
            />
            <div className='d_ProductPage__productInformation'>
                <h2 className='d_ProductPage__title'>{name}</h2>
                <ul className='d_ProductPage__highlights'>
                    {highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                    ))}
                </ul>
                <ul className='d_ProductPage__variants' onClick={handleSkuSelect}>
                    {variants.map((v, i) => (
                        <VariantOption key={i} {...{ ...v, selected: v.sku === variant.sku }} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export { ProductPageContent };
