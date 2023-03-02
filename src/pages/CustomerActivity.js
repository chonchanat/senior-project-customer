import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { ListAllAcitivty } from '../components/List';
import { SearchWithIcon } from '../components/Search';
import BackToTop from '../components/BackToTop';
import Divider from '../components/Divider';

import { getAllActivity } from '../api/activityAPI';

import Cookies from 'js-cookie';
import { ModalOptions } from '../components/Modal';

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

    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState({
        status: "open",
        sortMin: true,
    });

    const [control, setControl] = useState(Cookies.get("controlActivityCookie"));

    function handlerClick(activityData) {
        if (authReducer.role !== "customer") {
            setControl(activityData.code);
            Cookies.set('controlActivityCookie', activityData.code, { expires: 30 })
        }
    }
    function compare(a, b) {
        const timeA = (a.round-a.roundNow) * a.duration;
        const timeB = (b.round-b.roundNow) * b.duration;
        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }
        return 0;
    }

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <ModalOptions state={modal} setState={setModal} click={setOptions} options={options} />
                <SearchWithIcon setSearch={setSearch} setModal={setModal} />
                {activityData ?
                    activityData
                        .filter((data) => {
                            return search.toLowerCase() === ""
                                ? data
                                : data.name[0].toLowerCase().includes(search);
                        })
                        .filter((data) => {
                            return data.status === options.status;
                        })
                        .sort(compare)
                        .map((data) => {
                            return (
                                <div>
                                    <ListAllAcitivty data={data} click={handlerClick} control={control} role={authReducer.role} />
                                    <Divider />
                                </div>
                            );
                        })
                    :
                    <p className="my-8 text-slate-400 text-center">ยังไม่มีรายกายกิจกรรมในขณะนี้</p>

                }
            </BlockMobile>
            <BackToTop />
        </div>
    );
}

export default CustomerActivity;