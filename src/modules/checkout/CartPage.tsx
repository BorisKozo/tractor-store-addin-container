import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { cartPageAddinPath } from '../../interface/checkout.interface.ts';
import './css/CartPage.css';
import { FC } from 'react';

const CartPage: FC = () => {
    return <PageSkeleton contentPath={cartPageAddinPath} className='c_CartPage' dataBoundary='checkout' />;
};

export { CartPage };
