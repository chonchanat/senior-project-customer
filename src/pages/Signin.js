import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuthAsync, setAuth } from '../actions/authActions.js';

import { ButtonSubmit } from '../components/Button';

import Cookies from 'js-cookie';

function Signin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);
    const statusReducer = useSelector(state => state.statusReducer);

    useEffect(() => {
        function signinWithAuth() {
            const userCookie = Cookies.get("userCookie");
            if (authReducer) {
                navigate("/customer-home");
            }
            if (userCookie) {
                dispatch(setAuth(JSON.parse(userCookie)));
            }
        };
        signinWithAuth();
    }, [authReducer, navigate, dispatch])

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
                    <p className="text-center text-white text-3xl font-bold">Ku Que</p>
                    <p className="text-center text-white text-sm">SENIOR PROJECT</p>
                </div>
                <form onSubmit={handlerSignin}>
                    <div className="pb-6">
                        <p className="text-white pb-2">Phone number</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            required
                            placeholder="phone number"
                            onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </div>
                    <div className="pb-6">
                        <p className="text-white pb-2">Password</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            required
                            placeholder="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            <p className="h-[28px] text-right text-sm text-decline pt-2">{statusReducer.error}</p>
                    </div>

                    <ButtonSubmit width="w-full" bgColor="bg-accept" font="font-bold" title="Login"/>
                    <p className="text-right text-sm text-white pt-2 hover:underline">Forget Password?</p>
                </form>
            </div>
        </div>
    );
}

export default Signin;