import * as React from 'react';
import './BoundaryToggle.css';

const BoundaryToggle: React.FC = () => {
    const [showBoundaries, setShowBoundaries] = React.useState(false);

    React.useEffect(() => {
        const body = document.body;
        if (showBoundaries) {
            body.classList.add('show-boundaries');
        } else {
            body.classList.remove('show-boundaries');
        }
    }, [showBoundaries]);

    return (
        <button
            className='BoundaryToggle'
            onClick={() => setShowBoundaries(!showBoundaries)}
            title={showBoundaries ? 'Hide module boundaries' : 'Show module boundaries'}
            aria-label={showBoundaries ? 'Hide module boundaries' : 'Show module boundaries'}
        >
            {showBoundaries ? 'Hide Boundaries' : 'Show Boundaries'}
        </button>
    );
};

export { BoundaryToggle };

