import { Link } from 'react-router';
import '../css/VariantOption.css';

declare module 'react' {
    interface CSSProperties {
        '--variant-color': string;
    }
}

interface VariantOptionProps {
    sku: string;
    name: string;
    selected?: boolean;
    color: string;
}

const VariantOption = ({ sku, name, selected, color }: VariantOptionProps) => {
    return (
        <li className='d_VariantOption' style={{ '--variant-color': color }}>
            <i className='d_VariantOption__color'></i>
            {selected ? <strong>{name}</strong> : <Link to={`?sku=${sku}`}>{name}</Link>}
        </li>
    );
};

export { VariantOption };
