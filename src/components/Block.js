function BlockMobile({ children }) {
    return (
        <div className="pt-[60px] min-h-screen px-3 py-2 bg-bg-mobile">
            <div className="max-w-sm mx-auto">
                {children}
            </div>
        </div>
    );
}

function BlockDesktop({ children }) {
    return (
        <div className="bg-bg-desktop min-w-[1024px] flex min-h-screen pt-[50px]">
            {children}
        </div>
    );
}

function BlockDesktopLeft({ children }) {
    return (
        <div className="py-4 flex">
            {children}
        </div>
    );
}

function BlockDesktopRight({ children }) {
    return (
        <div className="py-4 w-full flex flex-col">
            {children}
        </div>
    );
}

function HeadDesktop({ children }) {
    return (
        <div className="bg-fha-desktop py-4 px-8 mr-4 mb-4 rounded-xl drop-shadow-xl text-white text-xl font-bold xl:max-w-[1280px]">
            {children}
        </div>
    );
}

function ContentDesktop({ children }) {
    return (
        <div className="h-full bg-white pt-3 px-8 mr-4 rounded-xl drop-shadow-xl xl:max-w-[1280px]">
            {children}
        </div>
    );
}

function HeadContentDesktop({ children }) {
    return (
        <div className="pb-3 mb-4 border-b-2 border-[#E0E0E0] flex justify-between items-center">
            {children}
        </div>
    );
}

export { BlockMobile, BlockDesktop, BlockDesktopLeft, BlockDesktopRight, HeadDesktop, ContentDesktop, HeadContentDesktop };