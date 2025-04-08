import React from 'react';
import { Outlet } from 'react-router-dom';
import OrderNav from '../../Sheard/OrderNav/OrderNav';

const OrderMain = () => {
    return (
        <div>
            <OrderNav/>
            <Outlet/>
        </div>
    );
};

export default OrderMain;