import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { checkoutPageAddinPath } from '../../interface/checkout.interface.ts';
import './css/Checkout.css';
import { FC } from 'react';

const Checkout: FC = () => {
    return <PageSkeleton contentPath={checkoutPageAddinPath} className='c_Checkout' dataBoundary='checkout' />;
};

export { Checkout };
