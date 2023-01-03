function StarRating({ rating }) {
    return (
        <div className="flex">
            {[...Array(5)].map((star, index) => {
                return (
                    <div key={index}>
                        <img className={index < rating ? "" : "hidden"} src="https://img.icons8.com/emoji/16/000000/star-emoji.png" alt="rating star" />
                        <img className={index >= rating ? "" : "hidden"} src="https://img.icons8.com/ios/16/000000/star--v1.png" alt="rating star" />
                    </div>
                );
            })}
        </div>
    );
}

function MobileList({ activity, click = () => { return 0 }, queue = false }) {

    const estimateTime = Math.ceil(activity.queue / activity.size) * activity.duration;
    const ready = Math.ceil(activity.queue / activity.size) <= 1;

    return (
        <div className="py-2 flex h-fit border-b-2 border-[#E0E0E0] hover:bg-hover" key={activity.id} onClick={() => click(activity)}>
            <div className="h-auto w-[30%] overflow-hidden flex items-center">
                <img src={activity.image} alt="iamge of activity" />
            </div>
            <div className="w-[70%] pl-4">
                <div className="flex justify-between">
                    <p className="font-bold">{activity.name}</p>
                    {ready && queue && <p className="text-accept">รอบต่อไป</p>}
                </div>
                {queue
                    ? <p className="text-sm">{activity.member} คน</p>
                    : <div className="flex">
                        <StarRating rating={activity.rating} />
                    </div>
                }
                <div className="flex justify-between mt-4">
                    <div>
                        <p className="text-xs">เวลาโดยประมาณ</p>
                        <p className="text-sm">{estimateTime} นาที</p>
                    </div>
                    <div>
                        <p className="text-xs text-right">จำนวนคิว</p>
                        <p className="text-sm text-right">{activity.queue}/{activity.size} คิว</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { MobileList };