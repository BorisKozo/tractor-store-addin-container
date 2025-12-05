import { FC } from 'react';
import { Recommendations } from '../Recommendations.tsx';

interface RecommendationsWrapperProps {
    skus: string[];
    className?: string;
}

const RecommendationsWrapper: FC<RecommendationsWrapperProps> = ({ skus, className }) => {
    return (
        <div className={className}>
            <Recommendations skus={skus} />
        </div>
    );
};

export { RecommendationsWrapper };
