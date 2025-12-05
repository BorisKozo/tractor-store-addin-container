import { FC } from 'react';
import { mainPageAddinPath } from '../../interface/explore.interface.ts';
import { PageSkeleton } from '../../common/PageSkeleton.tsx';

const MainPage: FC = () => {
    return <PageSkeleton contentPath={mainPageAddinPath} className='e_HomePage' />;
};

export { MainPage };
