import * as React from 'react';
import { PageSkeleton } from '../../common/PageSkeleton.tsx';
import { storesPageAddinPath } from '../../interface/explore.interface.ts';

const StoresPage: React.FC = () => {
    return <PageSkeleton contentPath={storesPageAddinPath} className='e_StoresPage' />;
};

export { StoresPage };
