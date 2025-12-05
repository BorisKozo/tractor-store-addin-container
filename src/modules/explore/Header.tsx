import * as React from 'react';
import { Link } from 'react-router';
import './css/Header.css';
import { Navigation } from './Navigation.tsx';
import { globalAddinContainer } from '../../extensibility/AddinContainer.ts';
import { headerRightComponentsAddinPath, HeaderRightComponentAddin } from '../../interface/explore.interface.ts';

const Header: React.FC = () => {
    const rightComponents = globalAddinContainer.get<HeaderRightComponentAddin>(headerRightComponentsAddinPath);

    return (
        <header className='e_Header' data-boundary='explore'>
            <div className='e_Header__cutter'>
                <div className='e_Header__inner'>
                    <Link className='e_Header__link' to='/'>
                        <img
                            className='e_Header__logo'
                            src='https://blueprint.the-tractor.store/cdn/img/logo.svg'
                            alt='Micro Frontends - Tractor Store'
                        />
                    </Link>
                    <div className='e_Header__navigation'>
                        <Navigation />
                    </div>
                    {rightComponents.length > 0 && (
                        <div className='e_Header__cart'>
                            {rightComponents.map((addin, i) => {
                                const Component = addin.component;
                                return <Component key={i} {...(addin.props || {})} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export { Header };
