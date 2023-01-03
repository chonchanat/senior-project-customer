import { useState } from 'react';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { MobileList } from '../components/List';
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
                {ActivityData
                    .filter((data) => {
                        return search.toLowerCase() === ""
                            ? data
                            : data.name.toLowerCase().includes(search);
                    })
                    .map((data) => {
                        return (
                            <MobileList activity={data} />
                        );
                    })}
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;