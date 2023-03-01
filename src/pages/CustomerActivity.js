import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { ListAllAcitivty } from '../components/List';
import { SearchWithIcon } from '../components/Search';
import BackToTop from '../components/BackToTop';

import { getAllActivity } from '../api/activityAPI';

import Cookies from 'js-cookie';

function CustomerActivity() {

    const authReducer = useSelector(state => state.authReducer);

    useEffect(() => {
        async function getActivity() {
            const response = await getAllActivity();
            setActivityData(response);
        }
        getActivity();
    }, []);

    const [activityData, setActivityData] = useState([]);
    const [search, setSearch] = useState("");
    // const [main, setMain] = useState(Cookies.get('mainActivityCookie'));
    const [control, setControl] = useState(Cookies.get("controlActivityCookie"));

    function handlerClick(activityData) {
        if (authReducer.role !== "customer") {
            console.log("lick")
            setControl(activityData.code);
            Cookies.set('controlActivityCookie', activityData.code)
        }
    }

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
                            <ListAllAcitivty data={data} click={handlerClick} control={control} role={authReducer.role}/>
                        );
                    })}
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;