import * as React from 'react';
import { globalAddinContainer } from '../extensibility/AddinContainer.ts';
import './PageSkeleton.css';

interface PageSkeletonProps {
    contentPath: string;
    className?: string;
    dataBoundary?: string;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ contentPath, className, dataBoundary = 'explore' }) => {
    const addins = globalAddinContainer.get<{ component: React.FC<any>; props?: Record<string, any> }>(contentPath);

    return (
        <div data-boundary-page={dataBoundary}>
            <main className={`PageSkeleton-main ${className || ''}`}>
                {addins.map((addin, i) => {
                    const Component = addin.component;
                    return <Component key={i} {...(addin.props || {})} />;
                })}
            </main>
        </div>
    );
};

export { PageSkeleton };
