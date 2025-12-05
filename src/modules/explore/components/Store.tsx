import { src, srcset } from '../../../common/utils.ts';

interface StoreProps {
    image: string;
    street: string;
    name: string;
    city: string;
}

const Store = ({ name, image, street, city }: StoreProps) => {
    return (
        <li className='e_Store'>
            <div className='e_Store_content'>
                <img
                    className='e_Store_image'
                    src={src(image, 200)}
                    srcSet={srcset(image, [200, 400])}
                    width='200'
                    height='200'
                />
                <p className='e_Store_address'>
                    {name}
                    <br />
                    {street}
                    <br />
                    {city}
                </p>
            </div>
        </li>
    );
};

export { Store };
