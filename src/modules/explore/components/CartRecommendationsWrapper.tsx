import { FC, useState, useEffect } from 'react';
import { Recommendations } from '../Recommendations.tsx';
import { globalAddinContainer } from '../../../extensibility/AddinContainer.ts';
import {
    cartSkusUpdateEventName,
    cartSkusRequestEventName,
    CartSkusUpdateEventData,
} from '../../../interface/checkout.interface.ts';

interface CartRecommendationsWrapperProps {
    className?: string;
}

const CartRecommendationsWrapper: FC<CartRecommendationsWrapperProps> = ({ className }) => {
    const [skus, setSkus] = useState<string[]>([]);

    useEffect(() => {
        const eventBus = globalAddinContainer.getEventBus();
        const handleCartUpdate = (data?: CartSkusUpdateEventData) => {
            if (data && data.skus && Array.isArray(data.skus)) {
                setSkus(data.skus);
            }
        };

        eventBus.registerEventHandler<CartSkusUpdateEventData>(cartSkusUpdateEventName, handleCartUpdate);

        // Request initial skus
        eventBus.fireEvent(cartSkusRequestEventName);

        return () => {
            eventBus.unregisterEventHandler<CartSkusUpdateEventData>(cartSkusUpdateEventName, handleCartUpdate);
        };
    }, []);

    if (skus.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            <Recommendations skus={skus} />
        </div>
    );
};

export { CartRecommendationsWrapper };
