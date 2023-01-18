import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuthAsync, setAuth } from '../actions/authActions.js';

import { Button } from '../components/Button';
import Spinner from '../components/Spinner';

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
    const [noti, setNoti] = useState(null);

    function handlerSignin() {
        if (user.phone && user.password) {
            setNoti(null);
            dispatch(fetchAuthAsync(user.phone, user.password));
        } else {
            setNoti("Please enter your phone and password");
        }
    }

    return (
        <div className="h-screen bg-fha flex justify-center">
            <div className="w-80 px-6 pt-16">
                <div className="pb-16">
                    <p className="text-center text-white text-3xl font-bold">Ku Que</p>
                    <p className="text-center text-white text-sm">SENIOR PROJECT</p>
                </div>
                <div>
                    <div className="pb-6">
                        <p className="text-white pb-2">Phone number</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            placeholder="phone number"
                            onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </div>
                    <div className="pb-6">
                        <p className="text-white pb-2">Password</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            placeholder="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <p className="h-[28px] text-right text-sm text-decline pt-2">{noti ? noti : statusReducer.error}</p>
                    </div>

                    <Button bgColor="bg-accept" font="font-bold" click={handlerSignin}>
                        {statusReducer.loading ?
                            <Spinner color="white" />
                            :
                            "Login"
                        }
                    </Button>
                    <p className="text-right text-sm text-white pt-2 hover:underline">Forget Password?</p>
                </div>
            </div>
        </div>
    );
}

export default Signin;