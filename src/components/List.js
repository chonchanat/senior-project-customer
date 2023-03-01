import { AiFillStar, AiOutlineStar,AiOutlineControl } from 'react-icons/ai';

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

function ListAllAcitivty({ data, click=()=>{return 0}, control, role }) {
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data._id} onClick={() => click(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.picture} className="h-[80px] w-[120px]" alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold">{data.name[0]}</p>
                    {role !== "customer" && data.code === control &&<AiOutlineControl className="text-yellow text-2xl"/>}
                </div>
                <StarRating rating={data.rating} />
                <div className="flex justify-between mt-4">
                    <div>
                        <p className="text-xs">เวลาโดยประมาณ</p>
                        <p className="text-sm">{data.round * data.duration} นาที</p>
                    </div>
                    <div>
                        <p className="text-xs text-right">จำนวนคิว</p>
                        <p className="text-sm text-right">{data.queueNo} คิว</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListQueue({ data, click }) {
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data._id} onClick={() => click(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.activityPicture} className="h-[80px] w-[120px]" alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <p className="font-bold">{data.activityName[0]}</p>
                <p className="text-sm">ผู้เข้าร่วมกิจกรรม : {data.size} คน</p>
                <div className="flex justify-between mt-4">
                    <div>
                        <p className="text-xs">เวลาโดยประมาณ</p>
                        <p className="text-sm">{data.round * data.duration} นาที</p>
                    </div>
                    <div>
                        <p className="text-xs text-right">จำนวนคิว</p>
                        <p className="text-sm text-right">{data.queueNo} คิว</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListComment({ data, setSelectData }) {
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data.id} onClick={() => setSelectData(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.image} alt="iamge of activity" />
            </div>
            <div className="flex flex-col w-[70%] pl-4">
                <p className="font-bold">{data.name[0]}</p>
                <p className="text-sm flex items-center">ผู้เข้าร่วมกิจกรรม : 4 คน ( 48 <AiFillStar className="text-yellow text-sm" />)</p>
                <p className="text-xs flex-1 flex justify-end items-end">กดเพื่อให้คะแนน</p>
            </div>
        </div>
    );
}

export { ListComment, ListAllAcitivty, ListQueue };