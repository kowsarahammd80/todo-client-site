import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../LayOut/Main/Main';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import DashboardHome from '../../components/DashboardHome/DashboardHome';
import ProductsAdd from '../../components/ProductsAdd/ProductsAdd';
import ProductsPages from '../../Pages/ProductsPage/ProductsPages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path: '/',
                element: <DashboardHome/>
            },
            {
              path: '/productsAdd',
              element: <ProductsAdd/>,  
            }
        ]
    }
])

export default router;