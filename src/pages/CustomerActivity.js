import { useState, useEffect } from 'react';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { MobileList } from '../components/List';
import { SearchWithIcon } from '../components/Search';
import BackToTop from '../components/BackToTop';

// import ActivityData from '../fakeData/ActivityData';
import { getAllActivity } from '../api/activityAPI';

function CustomerActivity() {

    useEffect(() => {
        async function getActivity() {
            const response = await getAllActivity();
            setActivityData(response);
        }
        getActivity();
    }, []);

    const [activityData, setActivityData] = useState([]);
    const [search, setSearch] = useState("");

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
                            <MobileList data={data} />
                        );
                    })}
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;