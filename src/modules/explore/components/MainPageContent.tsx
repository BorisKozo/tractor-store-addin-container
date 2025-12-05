import { FC } from 'react';
import './../css/HomePage.css';
import data from './../data/db.json';
import { Link } from 'react-router';
import { src, srcset } from '../../../common/utils.ts';

const MainPageContent: FC = () => {
    return (
        <div className='e_HomePage__content'>
            {data.teaser.map(({ title, image, url }, i) => (
                <Link key={i} className='e_HomePage__categoryLink' to={url}>
                    <img
                        src={src(image, 500)}
                        srcSet={srcset(image, [500, 1000])}
                        sizes='100vw, (min-width: 500px) 50vw'
                        alt=''
                    />
                    {title}
                </Link>
            ))}
        </div>
    );
};

export { MainPageContent };
