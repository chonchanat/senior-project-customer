import { useState } from "react";

import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";
import { ListComment } from "../components/List";
import Comment from '../components/Comment';

import MyActivityData from '../fakeData/MyActivityData';

function CustomerComment() {

    const [selectData, setSelectData] = useState(null);

    return (
        <div>
            <Navbar />
            <BlockMobile>

                {selectData === null ?
                    <div className="overflow-hidden overflow-y-auto">
                        <p className="my-2">กิจกรรมที่เข้าร่วมแล้ว</p>
                        {MyActivityData.map((data) => {
                            return (
                                <ListComment data={data} setSelectData={setSelectData} />
                            );
                        })}
                    </div>
                    :
                    <Comment data={selectData} setSelectData={setSelectData}/>
                }

            </BlockMobile>
        </div>
    );
}

export default CustomerComment;