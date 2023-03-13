import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuthAsync, fetchUserData } from '../actions/authActions.js';

import { getOpenIDConnect } from '../privateRoute/index.js';

import { ButtonSubmit } from '../components/Button';

import Cookies from 'js-cookie';

function Signin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);
    const statusReducer = useSelector(state => state.statusReducer);
    const accesToken = Cookies.get("accessToken");

    // fetch accesToken
    useEffect(() => {
        function signinWithToken() {
            if (accesToken) {
                const username = getOpenIDConnect(accesToken).username;
                //call to fetch userData to save in authReducer
                dispatch(fetchUserData(username))
            }
        }
        signinWithToken();
    }, [accesToken, dispatch])

    // redirect to home if have authReducer (user data)
    useEffect(() => {
        function redirectWithAuth() {
            if(authReducer) navigate("/customer-home");
        }
        redirectWithAuth();
    }, [authReducer, navigate])

    const [user, setUser] = useState({
        phone: "",
        password: "",
    });

    function handlerSignin(e) {
        e.preventDefault();
        dispatch(fetchAuthAsync(user.phone, user.password));
    }

    return (
        <div className="h-screen bg-fha flex justify-center">
            <div className="w-80 px-6 pt-16">
                <div className="pb-16">
                    <p className="text-center text-white text-3xl font-bold">QueDee</p>
                    <p className="text-center text-white text-sm">Web Based Application</p>
                </div>
                <form onSubmit={handlerSignin}>
                    <div className="pb-6">
                        <p className="text-white pb-2">Phone number</p>
                        <input type="text" className="w-full py-2 px-4 rounded-md"
                            required
                            placeholder="phone number"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </div>
                    <div className="pb-6">
                        <p className="text-white pb-2">Password</p>
                        <input type="password" className="w-full py-2 px-4 rounded-md"
                            required
                            placeholder="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <p className="h-[28px] text-right text-sm text-decline pt-2">{statusReducer.error}</p>
                    </div>

                    <ButtonSubmit width="w-full" bgColor="bg-accept" font="font-bold" title="Login" />
                </form>
            </div>
        </div>
    );
}

export default Signin;