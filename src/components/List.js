import { AiFillStar, AiOutlineStar, AiOutlineControl } from 'react-icons/ai';

function StarRating({ rating }) {
    return (
        <div className="flex">
            {[...Array(5)].map((star, index) => {
                return (
                    <div key={index}>
                        <AiFillStar className={`text-yellow text-sm ${index >= rating && "hidden"}`} />
                        <AiOutlineStar className={`text-yellow text-sm ${index < rating && "hidden"}`} />
                    </div>
                );
            })}
        </div>
    );
}

function ListAllAcitivty({ data, waitRound, click = () => { return 0 }, control, role }) {

    function handlerStatus() {
        if (data.status === "open") return "bg-accept";
        else if (data.status === "temporarily closed") return "bg-yellow";
        else if (data.status === "closed") return "bg-red-400";
    }

    return (
        <div className="py-2 flex h-fit hover:bg-hover" key={data._id} onClick={() => click(data)}>
            <div className="h-auto w-[30%] flex items-center relative">
                <img src={data.picture} className="h-[80px] w-[120px] rounded-md" alt="iamge of activity" />
                <div className={`${handlerStatus()} w-4 h-4 absolute rounded-full right-[-8px] top-0`} />
            </div>
            <div className="w-[70%] pl-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold">{data.name[0]}</p>
                    {role !== "customer" && data.code === control && <AiOutlineControl className="text-yellow text-2xl" />}
                </div>
                <StarRating rating={data.rating} />
                <div className="flex justify-between mt-4">
                    <div>
                        <p className="text-xs">เวลาโดยประมาณ</p>
                        <p className="text-sm">{waitRound * data.duration} นาที</p>
                    </div>
                    <div>
                        <p className="text-xs text-right">รอบก่อนหน้า</p>
                        {waitRound ?
                            <p className="text-sm text-right">{waitRound} รอบ</p>
                            :
                            <p className="text-sm text-accept">พร้อมในรอบต่อไป</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListQueue({ data, click = () => { return 0 } }) {
    return (
        <div className="py-2 flex h-fit hover:bg-hover" key={data._id} onClick={() => click(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.activityPicture} className="h-[80px] w-[120px] rounded-md" alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <p className="font-bold">{data.activityName[0]}</p>
                <p className="text-sm">ผู้เข้าร่วมกิจกรรม : {data.size} คน</p>
                <div className="flex justify-between mt-4">
                    <div>
                        <p className="text-xs">เวลารอโดยประมาณ</p>
                        <p className="text-sm">{data.diffRound * data.duration} นาที</p>
                    </div>
                    <div>
                        <p className="text-xs text-right">รอบก่อนหน้า</p>
                        {data.diffRound ?
                            <p className="text-sm text-right">{data.diffRound} รอบ</p>
                            :
                            <p className="text-sm text-accept">พร้อมในรอบต่อไป</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListComment({ data, setSelectData }) {
    function comment() {
        if (data.status === "done" && !data.commentStatus) setSelectData(data);
    }
    function showText() {
        if (data.status === "done") {
            if (data.commentStatus) return "ให้คะแนนแล้ว";
            else return "กดเพื่อให้คะแนน";
        }
    }
    return (
        <div className="py-2 flex h-fit hover:bg-hover" onClick={comment}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.image} className="h-[80px] w-[120px] rounded-md" alt="iamge of activity" />
            </div>
            <div className="flex flex-col w-[70%] pl-4">
                <p className="font-bold">{data.name[0]}</p>
                <p className="text-sm flex items-center">ผู้เข้าร่วมกิจกรรม : {data.queueSize} คน ( -{data.star} <AiFillStar className="text-yellow text-sm" />)</p>
                <p className="text-sm flex items-center">สถานะ :
                    <span className={`${data.status === "done" ? "text-accept" : "text-decline"} ml-1`}>
                        {data.status === "done" ? "เข้าร่วมแล้ว" : data.status === "cancel" ? "ยกเลิกการจอง" : data.status === "notJoined" && "ไม่ได้เข้าร่วม"}
                    </span>
                </p>
                <p className="text-xs flex-1 flex justify-end items-end">{showText()}</p>
            </div>
        </div>
    );
}

export { ListComment, ListAllAcitivty, ListQueue };