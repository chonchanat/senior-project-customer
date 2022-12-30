import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideMenu from './SideMenu';
import Wrapper from './Wrapper';

import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {

    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div className="h-[44px] w-full bg-fha fixed top-0 z-50 flex justify-between items-center px-4">
                <p className="text-lg sm:text-2xl font-bold text-white" onClick={() => navigate("/customer-home")}>Ku Que</p>
                <GiHamburgerMenu style={{ "color": "white" }} size="24px" onClick={() => setToggle(true)}/>
            </div>
            <Wrapper state={toggle} bgColor="bg-black/50"
                click={() => setToggle(false)} />
            <SideMenu toggle={toggle} setToggle={setToggle}/>
        </>
    );
}

export { Navbar };