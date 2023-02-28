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

    const fixedPosition = [12.8235, 99.9388];

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <CardWithHead title="แผนที่" bgColor="#F8F8F8">
                    <div className="w-full bg-red-300 z-30">
                        <MapContainer center={fixedPosition} zoom={17} scrollWheelZoom={true} style={{ height: "600px" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {activityData.map((data) => {
                                let myIconDiv = L.divIcon({
                                    className: "icon-map",
                                    html: `<img src=${data.picture} />`,
                                })
                                return (
                                    <Marker position={data.position} icon={myIconDiv}>
                                        <Popup offset={[16, 0]}>
                                            <p className="text-center font-bold">{data.name[0]}</p>
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