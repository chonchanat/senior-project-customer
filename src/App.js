import './App.css';

import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";

import { CustomerLogin } from './pages/Login';

import CustomerHome from './pages/CustomerHome';
import CustomerActivity from './pages/CustomerActivity';
import CustomerBookQueue from './pages/CustomerBookQueue';
import CustomerMap from './pages/CustomerMap';
import CustomerMyActivity from './pages/CustomerMyActivity';
import CustomerScan from './pages/CustomerScan';
import PrivateRoute from './privateRoute';


// import Test from './pages/Test';

const App = createBrowserRouter([
    {
        path: "/customer-login",
        element: <CustomerLogin />,
    },
    {
        path: "/customer-home",
        element: <PrivateRoute><CustomerHome /></PrivateRoute>,
    },
    {
        path: "/customer-activity",
        element: <PrivateRoute><CustomerActivity /></PrivateRoute>,
    },
    // {
    //     path: "/customer-bookqueue",
    //     element: <CustomerBookQueue />,
    // },
    {
        path: "/customer-map",
        element: <PrivateRoute><CustomerMap /></PrivateRoute>,
    },
    {
        path: "/customer-myactivity",
        element: <PrivateRoute><CustomerMyActivity /></PrivateRoute>,
    },
    {
        path: "/customer-myactivity/:id",
        element: <PrivateRoute><CustomerBookQueue /></PrivateRoute>,
    },
    {
        path: "/customer-scan",
        element: <PrivateRoute><CustomerScan /></PrivateRoute>,
    },
    {
        path: "/*",
        element: <Navigate to="/customer-login" />,
    },
    //   {
    //     path: "/test",
    //     element: <Test />,
    // },
]);

export default App;
