import './css/Navigation.css';
import { FC } from 'react';
import { Link } from 'react-router';

const Navigation: FC = () => {
    return (
        <nav className='e_Navigation'>
            <ul className='e_Navigation__list'>
                <li className='e_Navigation__item'>
                    <Link to='/products'>Machines</Link>
                </li>
                <li className='e_Navigation__item'>
                    <Link to='/stores'>Stores</Link>
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };
