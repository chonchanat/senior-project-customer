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

// import Test from './pages/Test';

const App = createBrowserRouter([
    {
        path: "/customer-login",
        element: <CustomerLogin />,
    },
    {
        path: "/customer-home",
        element: <CustomerHome />,
    },
    {
        path: "/customer-activity",
        element: <CustomerActivity />,
    },
    // {
    //     path: "/customer-bookqueue",
    //     element: <CustomerBookQueue />,
    // },
    {
        path: "/customer-map",
        element: <CustomerMap />,
    },
    {
        path: "/customer-myactivity",
        element: <CustomerMyActivity />,
    },
    {
        path: "/customer-myactivity/:id",
        element: <CustomerBookQueue />,
    },
    {
        path: "/customer-scan",
        element: <CustomerScan />,
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
