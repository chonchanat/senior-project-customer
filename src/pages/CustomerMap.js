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

function CustomerMap() {

    const camelPosition = [12.8235, 99.9388];

    const activityPosition = [
        {
            name: "คาปิบาร่า",
            pos: [12.8238, 99.9384],
            text: "ให้อาหารคาปิบาร่า",
        },
        {
            name: "อูฐ",
            pos: [12.8240, 99.9393],
            text: "ขี่อูฐ",
        },
        {
            name: "คาร์ทไรเดอร์",
            pos: [12.8242, 99.9397],
            text: "ขับคาร์ทไรเดอร์ตะลอน",
        },
        {
            name: "เครื่องซักผ้า",
            pos: [12.8235, 99.9395],
            text: "ปั่นให้คุณมึนตึ๊บ",
        },
    ]

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <CardWithHead title="แผนที่" bgColor="#F8F8F8">
                    <div className="w-full bg-red-300 z-30">
                        <MapContainer center={camelPosition} zoom={17} scrollWheelZoom={true} style={{ height: "500px" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {activityPosition.map((actPos) => {
                                let myIconDiv = L.divIcon({
                                    className: "icon-map",
                                    html: `<img src="https://www.online-station.net/wp-content/uploads/2021/03/MainThomasCGI.jpg" />`,
                                })
                                return (
                                    <Marker position={actPos.pos} icon={myIconDiv}>
                                        <Popup offset={[16,0]}>
                                            <p className="text-center font-bold">{actPos.name}</p>
                                            <p>{actPos.text}</p>
                                        </Popup>
                                    </Marker>
                                );
                            }
                            )}
                        </MapContainer>
                    </div>
                </CardWithHead>
            </BlockMobile>
        </div>
    );
}

export default CustomerMap;