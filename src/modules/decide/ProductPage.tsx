import { FC } from 'react';
import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { productPageAddinPath } from '../../interface/decide.interface.ts';
import './css/ProductPage.css';

const ProductPage: FC = () => {
    return <PageSkeleton contentPath={productPageAddinPath} className='d_ProductPage' dataBoundary='decide' />;
};

export { ProductPage };
