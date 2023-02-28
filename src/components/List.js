import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

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

// ปัญหาแสดงผลระหว่างหน้า กิจกรรมทั้งหมดและกิจกรรมที่เราจองไว้
function MobileList({ data, click = () => { return 0 }, queue = false, main, role }) {
    // const estimateTime = Math.ceil(data.queue / data.size) * data.duration;
    // const ready = Math.ceil(data.queue / data.size) <= 1;
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data._id} onClick={() => click(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.activityPicture} className="h-[80px] w-[120px]" alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <div className="flex justify-between">
                    <p className="font-bold">{data.activityName[0]}</p>
                    {/* {ready && queue && <p className="text-accept">รอบต่อไป</p>} */}
                </div>
                {/* {queue
                    ? <p className="text-sm">{data.member} คน</p>
                    : <div className="flex">
                        <StarRating rating={data.rating} />
                    </div>
                } */}
                {
                    role === "customer" ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <p className="text-xs">เวลาโดยประมาณ</p>
                                {/* <p className="text-sm">{estimateTime} นาที</p> */}
                            </div>
                            <div>
                                <p className="text-xs text-right">จำนวนคิว</p>
                                {/* <p className="text-sm text-right">{data.queue}/{data.size} คิว</p> */}
                            </div>
                        </div>
                        :
                        main === data.code ?
                            <MdFavorite className="ml-auto text-3xl text-decline" />
                            :
                            <MdFavoriteBorder className="ml-auto text-3xl text-decline" />

                }
            </div>
        </div>
    );
}

function ListAllAcitivty({ data }) {
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data._id}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.picture} className="h-[80px] w-[120px]" alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <div className="flex justify-between">
                    <p className="font-bold">{data.name[0]}</p>
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

function ListComment({ data, setSelectData }) {
    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={data.id} onClick={() => setSelectData(data)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={data.image} alt="iamge of activity" />
            </div>
            <div className="flex flex-col w-[70%] pl-4">
                <p className="font-bold">{data.name[0]}</p>
                <StarRating rating={data.rating} />
                <p className="text-xs flex-1 flex justify-end items-end">กดเพื่อให้คะแนน</p>
            </div>
        </div>
    );
}

export { MobileList, ListComment, ListAllAcitivty };