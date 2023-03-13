import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block'
import { CardWithHead } from '../components/Card';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../App.css';

import { getAllActivity } from '../api/activityAPI';

function CustomerMap() {

    useEffect(() => {
        async function getActivity() {
            const response = await getAllActivity();
            setActivityData(response);
        }
        getActivity();
    }, []);

    const [activityData, setActivityData] = useState([]);

    const fixedPosition = [12.8236, 99.9396];

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <CardWithHead title="แผนที่" bgColor="#F8F8F8">
                    <div className="w-full bg-red-300 z-30">
                        <MapContainer center={fixedPosition} zoom={16} scrollWheelZoom={true} style={{ height: "560px", zIndex: 1 }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {activityData.map((data, index) => {
                                let myIconDiv = L.divIcon({
                                    className: "icon-map",
                                    html: `<img src=${data.activity.picture} />`,
                                })
                                return (
                                    <Marker position={data.activity.position} icon={myIconDiv} key={index}>
                                        <Popup offset={[16, 0]}>
                                            <p className="text-center font-bold">{data.activity.name[0]}</p>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>
                </CardWithHead>
            </BlockMobile>
        </div>
    );
}

export default CustomerMap;