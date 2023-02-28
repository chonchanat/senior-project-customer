import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { ListAllAcitivty } from '../components/List';
import { SearchWithIcon } from '../components/Search';
import BackToTop from '../components/BackToTop';

import { getAllActivity } from '../api/activityAPI';

// import Cookies from 'js-cookie';

function CustomerActivity() {

    // const authReducer = useSelector(state => state.authReducer);

    useEffect(() => {
        async function getActivity() {
            const response = await getAllActivity();
            console.log(response)
            setActivityData(response);
        }
        getActivity();
    }, []);

    const [activityData, setActivityData] = useState([]);
    const [search, setSearch] = useState("");
    // const [main, setMain] = useState(Cookies.get('mainActivityCookie'));

    // function handlerClick(activityData) {
    //     setMain(activityData.code);
    //     Cookies.set('mainActivityCookie', activityData.code)
    // }

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <SearchWithIcon setSearch={setSearch} />
                {activityData
                    .filter((data) => {
                        return search.toLowerCase() === ""
                            ? data
                            : data.name[0].toLowerCase().includes(search);
                    })
                    .map((data) => {
                        return (
                            <ListAllAcitivty data={data}/>
                            // <MobileList data={data} main={main} role={authReducer.role} click={handlerClick}/>
                        );
                    })}
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;