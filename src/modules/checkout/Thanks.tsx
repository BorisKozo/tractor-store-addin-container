import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { thanksPageAddinPath } from '../../interface/checkout.interface.ts';
import './css/Thanks.css';
import { FC } from 'react';

const Thanks: FC = () => {
    return <PageSkeleton contentPath={thanksPageAddinPath} className='c_Thanks' dataBoundary='checkout' />;
};

export { Thanks };
