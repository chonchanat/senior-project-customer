import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";
import { ListComment } from "../components/List";
import Comment from '../components/Comment';

import { getHistory } from "../api/userAPI";

function CustomerComment() {

    const authReducer = useSelector(state => state.authReducer);
    const [history, setHistory] = useState([]);
    const [selectData, setSelectData] = useState(null);


    useEffect(() => {
        async function getHistoryActivity() {
            const response = await getHistory(authReducer.username);
            setHistory(response);
        }
        getHistoryActivity();
    }, [])

    return (
        <div>
            <Navbar />
            <BlockMobile>

                {selectData === null ?
                    <div className="overflow-hidden overflow-y-auto">
                        <p className="my-2">ประวัติการเข้าร่วมกิจกรรม</p>
                        {
                            history.length ?
                                history.map((data) => {
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