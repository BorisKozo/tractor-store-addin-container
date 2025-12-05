import * as React from 'react';
import { useParams } from 'react-router';
import data from './../data/db.json';
import { Product } from './Product';
import { Filter } from './Filter';
import './../css/CategoryPage.css';

const ProductsPageContent: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const cat = category && data.categories.find((c) => c.key === category);

    const title = cat ? cat.name : 'All Machines';
    const products = cat ? cat.products : data.categories.flatMap((c) => c.products);

    // sort products by price descending
    products.sort((a, b) => b.startPrice - a.startPrice);

    const filters = [
        { url: '/products', name: 'All', active: !cat },
        ...data.categories.map((c) => ({
            url: `/products/${c.key}`,
            name: c.name,
            active: c.key === category,
        })),
    ];

    return (
        <>
            <h2>{title}</h2>
            <div className='e_CategoryPage__subline'>
                <p>{products.length} products</p>
                <Filter filters={filters} />
            </div>
            <ul className='e_CategoryPage_list'>
                {products.map((product, i) => (
                    <Product key={i} {...product} />
                ))}
            </ul>
        </>
    );
};

export { ProductsPageContent };
