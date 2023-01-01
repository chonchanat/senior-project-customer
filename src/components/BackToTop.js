import { useState, useEffect } from "react";

import { BiChevronUpCircle } from 'react-icons/bi';

function BackTotop() {

    useEffect(() => {
        function handlerScroll() {
            if (window.pageYOffset >= 100) {
                setYOffset(true);
            } else {
                setYOffset(false);
            }
        }
        window.addEventListener('scroll', handlerScroll);
    }, [])

    const [yOffset, setYOffset] = useState(false);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <div className={`fixed flex items-center justify-center rounded-lg right-6 w-[48px] h-[48px] bg-yellow ${yOffset ? "bottom-8 opacity-100" : "bottom-0 opacity-0"}`}
            style={{ transition: "all 0.3s ease-out" }}
            onClick={scrollToTop}>
            <BiChevronUpCircle size="40px" className="text-white" />
        </div>
    );
}

export default BackTotop;