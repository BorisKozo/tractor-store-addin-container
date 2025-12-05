import * as React from 'react';
import { useNavigate } from 'react-router';
import { Button } from './Button';
import { globalAddinContainer } from '../../../extensibility/AddinContainer.ts';
import { clearCartEventName, storePickerAddinPath, StorePickerAddin } from '../../../interface/checkout.interface.ts';
import { selectedShopEventName, SelectedShopEventData } from '../../../interface/explore.interface.ts';
import '../css/Checkout.css';

function useShop() {
    const [shop, setShop] = React.useState('');

    React.useEffect(() => {
        const eventBus = globalAddinContainer.getEventBus();
        const changeShop = (data?: SelectedShopEventData) => {
            if (data) {
                setShop(data.shop);
            }
        };
        eventBus.registerEventHandler<SelectedShopEventData>(selectedShopEventName, changeShop);

        return () => {
            eventBus.unregisterEventHandler<SelectedShopEventData>(selectedShopEventName, changeShop);
        };
    }, []);

    return shop;
}

const defaultForm = {
    firstName: '',
    lastName: '',
};

const CheckoutPageContent: React.FC = () => {
    const navigate = useNavigate();
    const shop = useShop();
    const [data, setData] = React.useState(defaultForm);
    const isInvalid = !shop || !data.firstName || !data.lastName;
    const storePickers = globalAddinContainer.get<StorePickerAddin>(storePickerAddinPath);

    function changeData(ev: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = ev.currentTarget;
        setData({
            ...data,
            [name]: value,
        });
    }

    function submit(ev: React.SyntheticEvent) {
        const eventBus = globalAddinContainer.getEventBus();
        eventBus.fireEvent(clearCartEventName);
        navigate('/checkout/thanks');
        ev.preventDefault();
    }

    return (
        <>
            <h2>Checkout</h2>
            <form action='/checkout/place-order' method='post' className='c_Checkout__form' onSubmit={submit}>
                <h3>Personal Data</h3>
                <fieldset className='c_Checkout__name'>
                    <div>
                        <label className='c_Checkout__label' htmlFor='c_firstname'>
                            First name
                        </label>
                        <input
                            className='c_Checkout__input'
                            type='text'
                            id='c_firstname'
                            name='firstName'
                            required
                            value={data.firstName}
                            onChange={changeData}
                        />
                    </div>
                    <div>
                        <label className='c_Checkout__label' htmlFor='c_lastname'>
                            Last name
                        </label>
                        <input
                            className='c_Checkout__input'
                            type='text'
                            id='c_lastname'
                            name='lastName'
                            required
                            value={data.lastName}
                            onChange={changeData}
                        />
                    </div>
                </fieldset>

                <h3>Store Pickup</h3>
                <fieldset>
                    <div className='c_Checkout__store'>
                        {storePickers.map((storePicker, i) => {
                            const Component = storePicker.component;
                            return <Component key={i} />;
                        })}
                    </div>
                    <label className='c_Checkout__label' htmlFor='c_storeId'>
                        Store ID
                    </label>
                    <input
                        className='c_Checkout__input'
                        type='text'
                        id='c_storeId'
                        name='storeId'
                        value={shop}
                        readOnly
                        required
                    />
                </fieldset>

                <div className='c_Checkout__buttons'>
                    <Button type='submit' variant='primary' disabled={isInvalid}>
                        place order
                    </Button>
                    <Button href='/checkout/cart' variant='secondary'>
                        back to cart
                    </Button>
                </div>
            </form>
        </>
    );
};

export { CheckoutPageContent };
