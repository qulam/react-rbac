import {Navigate} from 'react-router-dom';

import {MainLayout, DashboardLayout} from 'src/components';

import Account from 'src/views/Account';
import CustomerList from 'src/views/CustomerList/CustomerList';
import Dashboard from 'src/views/Dashboard/Dashboard';
import Login from 'src/views/Login/Login';
import NotFound from 'src/views/NotFound/NotFound';
import ProductList from 'src/views/ProductList/ProductList';
import Register from 'src/views/Register/Register';
import Settings from 'src/views/Settings/Settings';
import {Page403} from "src/components/ui/ErrorPage/pages";
import groupRoutes from "src/views/Group/ui/routes";
import permissionRoutes from "src/views/Permission/ui/routes";
import userRoutes from "src/views/User/ui/routes";
import reportsRoutes from "src/views/Reports/ui/routes";

const routes = [
    {
        path: 'app',
        element: <DashboardLayout/>,
        children: [
            {path: 'account', element: <Account/>},
            {path: 'customers', element: <CustomerList/>},
            {path: 'Dashboard', element: <Dashboard/>},
            {path: 'products', element: <ProductList/>},
            {path: 'settings', element: <Settings/>},
            {path: '403', element: <Page403/>},
            ...groupRoutes,
            ...permissionRoutes,
            ...userRoutes,
            ...reportsRoutes,
            {path: '*', element: <Navigate to="/404"/>}
        ]
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {path: 'authentication/login', element: <Login/>},
            {path: 'authentication/register', element: <Register/>},
            {path: '404', element: <NotFound/>},
            {path: '/', element: <Navigate to="/app/dashboard"/>},
            {path: '*', element: <Navigate to="/404"/>}
        ]
    }
];

export default routes;
