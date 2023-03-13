function Card({ title, bgColor, icon, click }) {
    return (
        <div className="w-[48%] h-[120px] rounded-xl mb-4 pb-1 py-3 shadow-lg flex flex-col items-center justify-between" style={{ backgroundColor: bgColor }}
            onClick={click}>
            {icon}
            <p className="text-white font-bold">{title}</p>
        </div>
    );
}

function CardWithHead({ title, bgColor = "white", children }) {
    return (
        <div className="w-full rounded-xl mb-4 overflow-hidden shadow-lg" style={{ backgroundColor: bgColor }}>
            <p className="text-center bg-fha-desktop py-1 text-white font-bold text-sm">{title}</p>
            <div className="h-auto p-2">
                {children}
            </div>
        </div>
    );
}

function CardComment({children, click}) {
    return (
        <div className="w-full rounded-xl shadow-lg flex items-center justify-center bg-fha-desktop p-2" onClick={click}>
                {children}
        </div>
    );
}

function CardActivity({ data }) {
    return (
        <div className="w-[full] h-[120px] overflow-hidden relative flex flex-col justify-center items-center rounded-lg">
            <img src={data.picture} alt="activity"/>
            {/* <p className="bg-fha p-2 rounded-lg font-bold text-white text-sm absolute top-2 shadow-md">กิจกรรม</p> */}
            <p className="bg-fha p-2 rounded-lg font-bold text-white text-sm absolute top-2 shadow-md">{data.name[0]}</p>
        </div>
    );
}

export { Card, CardWithHead, CardComment, CardActivity };