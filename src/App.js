import './App.css';

import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";

import Signin from './pages/Signin';

import CustomerHome from './pages/CustomerHome';
import CustomerActivity from './pages/CustomerActivity';
import CustomerBookQueue from './pages/CustomerBookQueue';
import CustomerMap from './pages/CustomerMap';
import CustomerMyActivity from './pages/CustomerMyActivity';
import CustomerScan from './pages/CustomerScan';
import PrivateRoute from './privateRoute';
import CustomerComment from './pages/CustomerComment';

import StaffScan from './pages/StaffScan';

// import Test from './pages/Test';

const App = createBrowserRouter([
    {
        path: "/customer-signin",
        element: <Signin />,
    },
    {
        path: "/customer-home",
        element: <PrivateRoute><CustomerHome /></PrivateRoute>,
    },
    {
        path: "/customer-activity",
        element: <PrivateRoute><CustomerActivity /></PrivateRoute>,
    },
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
        path: "/customer-scan/:code",
        element: <PrivateRoute><CustomerScan /></PrivateRoute>,
    },
    {
        path: "/customer-comment",
        element: <PrivateRoute><CustomerComment /></PrivateRoute>,
    },

    {
        path: "/staff-scan/:code",
        // element: <PrivateRoute><StaffScan /></PrivateRoute>,
        element: <StaffScan />,
    },

    {
        path: "/*",
        element: <Navigate to="/customer-signin" />,
    },
    //   {
    //     path: "/test",
    //     element: <Test />,
    // },
]);

export default App;
