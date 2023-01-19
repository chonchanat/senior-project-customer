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
            <p className="text-center bg-fha-desktop py-1 text-white text-sm">{title}</p>
            <div className="h-auto py-4 px-2 flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}

function CardComment({children, click}) {
    return (
        <div className="w-full rounded-xl shadow-lg flex items-center justify-center bg-fha-desktop p-3" onClick={click}>
                {children}
        </div>
    );
}

export { Card, CardWithHead, CardComment };