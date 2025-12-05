import * as React from 'react';
import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { productsPageAddinPath } from '../../interface/explore.interface.ts';

const CategoryPage: React.FC = () => {
    return <PageSkeleton contentPath={productsPageAddinPath} className='e_CategoryPage' />;
};

export { CategoryPage };
