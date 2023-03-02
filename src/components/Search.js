import { IoOptions } from 'react-icons/io5'

function SearchWithIcon({ setSearch, setModal }) {
    return (
        <div className="flex items-center mb-2">
            <div className="h-[40px] bg-white rounded-[20px] shadow-lg flex flex-1 items-center pl-6 pr-2 mr-2">
                <input type="text" className="bg-transparent w-full outline-0"
                    onChange={(e) => setSearch(e.target.value)}></input>
                <img src="https://img.icons8.com/ios-filled/16/000000/search--v1.png" alt="search icon" className="bg-fha-desktop p-2 rounded-[50%]" />
            </div>
            <IoOptions className="text-4xl text-white bg-yellow p-1 rounded-lg shadow-lg" onClick={() => setModal(true)}/>
        </div>
    );
}

export { SearchWithIcon };