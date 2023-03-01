import { useState } from "react";
import { useSelector } from "react-redux";

import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";
import { ListComment } from "../components/List";
import Comment from '../components/Comment';

function CustomerComment() {

    const authReducer = useSelector(state => state.authReducer);
    const [selectData, setSelectData] = useState(null);

    return (
        <div>
            <Navbar />
            <BlockMobile>

                {selectData === null ?
                    <div className="overflow-hidden overflow-y-auto">
                        <p className="my-2">ประวัติการเข้าร่วมกิจกรรม</p>
                        {
                            authReducer.activity.length !== 0 ?
                                authReducer.activity.map((data) => {
                                    return (
                                        <ListComment data={data} setSelectData={setSelectData} />
                                    );
                                })
                                :
                                <p className="my-8 text-slate-400 text-center">คุณยังไม่มีประวัติการเข้าร่วมในขณะนี้</p>
                        }
                    </div>
                    :
                    <Comment data={selectData} setSelectData={setSelectData} />
                }

            </BlockMobile>
        </div>
    );
}

export default CustomerComment;