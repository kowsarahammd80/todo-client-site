import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../LayOut/Main/Main';
import DashboardHome from '../../components/DashboardHome/DashboardHome';
import ProductsUp from '../../components/ProductsAdd/ProductsUp';
import Catagoris from '../../components/Catagoris/Catagoris'
import CategoriesList from '../../components/Catagoris/CategoriesList';
import CategoryUp from '../../components/AllUpdates/CategoryUp/CategoryUp';
import AddSubCategory from '../../components/SubCategoy/AddSubCategory';
import SubCategoryList from '../../components/SubCategoy/SubCategoryList';
import ProductList from '../../components/ProductsAdd/ProductList';
import SubCategoryUpdate from '../../components/AllUpdates/SubCategoryUpdate/SubCategoryUpdate';
import HomeHerroAdd from '../../components/HomeHerroAdd/HomeHerroAdd';
import HomeHeroList from '../../components/HomeHerroAdd/HomeHeroList';
import HomeHeroStatusUpdate from '../../components/AllUpdates/HomeHeroUpdate/HomeHeroStatusUpdate';
import ProductDataUpdate from '../../components/AllUpdates/ProductUpdaate/ProductDataUpdate';



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
              element: <ProductsUp/>,  
            },
            {
                path: '/productsList',
                element: <ProductList/>
            },
            
            {
                path: '/productsList/:_id',
                element: <ProductDataUpdate/>
            } ,

            {
                path: '/categoy',
                element: <Catagoris/>
            },
            {
                path: '/categoriesList',
                element: <CategoriesList/>
            },
            {
                path: '/category/:_id',
                element: <CategoryUp/>
            },
            {
                path: '/addSubCategory',
                element: <AddSubCategory/>
            }, 
            {
                path: '/subCategoryList',
                element: <SubCategoryList/>
            },               
            {
                path: '/subCategoryList/:_id',
                element: <SubCategoryUpdate/>
            },               
            {
                path: '/home-Herro-Add',
                element: <HomeHerroAdd/>
            },               
            {
                path: '/home-Herro-list',
                element: <HomeHeroList/>
            },               
            {
                path: '/home-Herro-list/:_id',
                element: <HomeHeroStatusUpdate/>
            },                                 
            // {
            //     path: '/productsList/:_id',
            //     element: <ProductListShow/>
            // },  
                                          
        ]
    }
])

export default router;