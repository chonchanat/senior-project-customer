import { useState } from 'react';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { MobileList } from '../components/Table';
import { SearchWithIcon } from '../components/Search';
import BackToTop from '../components/BackToTop';

import ActivityData from '../fakeData/ActivityData';

function CustomerActivity() {

    const [search, setSearch] = useState("");

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <SearchWithIcon setSearch={setSearch} />
                <div className="overflow-hidden overflow-y-auto">
                    {ActivityData
                        .filter((data) => {
                            return search.toLowerCase() === ""
                                ? data
                                : data.nameOfAct.toLowerCase().includes(search);
                        })
                        .map((data, index) => {
                            return (
                                <MobileList MyActivity={data} index={index} />
                            );
                        })}
                </div>
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;