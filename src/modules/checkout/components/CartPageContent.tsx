import * as React from 'react';
import { LineItem } from './LineItem';
import { Button } from './Button';
import data from '../data/db.json';
import { useLineItems } from '../data/store';
import '../css/CartPage.css';

function convertToLineItems(items: Array<{ sku: string; quantity: number }>) {
    return items.reduce(
        (res, { sku, quantity }) => {
            const variant = data.variants.find((p) => p.sku === sku);
            if (variant) {
                res.push({ ...variant, quantity, total: variant.price * quantity });
            }
            return res;
        },
        [] as Array<{ sku: string; id: string; name: string; quantity: number; total: number; image: string }>,
    );
}

const CartPageContent: React.FC = () => {
    const rawLineItems = useLineItems();
    const lineItems = convertToLineItems(rawLineItems);
    const total = lineItems.reduce((res, { total }) => res + total, 0);

    return (
        <>
            <h2>Basket</h2>
            <ul className='c_CartPage__lineItems'>
                {lineItems.map((li, i) => (
                    <LineItem key={i} {...li} />
                ))}
            </ul>
            <hr />
            <p className='c_CartPage__total'>Total: {total} Ø</p>
            <div className='c_CartPage__buttons'>
                <Button href='/checkout/checkout' variant='primary'>
                    Checkout
                </Button>
                <Button href='/' variant='secondary'>
                    Continue Shopping
                </Button>
            </div>
        </>
    );
};

export { CartPageContent };
