import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button.js';

function CustomerLogin() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    function handlerSigin() {
        navigate("/customer-home");
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
                        <p className="text-white pb-2">Username</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            placeholder="username"
                            onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </div>
                    <div className="pb-6">
                        <p className="text-white pb-2">Password</p>
                        <input className="w-full py-2 px-4 rounded-md"
                            placeholder="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>

                    <Button bgColor="bg-accept" font="font-bold" click={handlerSigin}>Login</Button>
                    <p className="text-right text-sm text-white pt-2 hover:underline">Forget Password?</p>
                </div>
            </div>
        </div>
    );
}

export { CustomerLogin };