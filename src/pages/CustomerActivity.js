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
                                : data.name.toLowerCase().includes(search);
                        })
                        .map((data) => {
                            return (
                                <MobileList MyActivity={data} />
                            );
                        })}
                </div>
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;