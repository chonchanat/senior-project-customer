function Button({ children, bgColor, textColor = "text-white", width = "w-full", font, click }) {
    return (
        <div className={`${bgColor} ${width} ${font} ${textColor} flex justify-center items-center p-2 rounded-md text-sm drop-shadow-md`}
            onClick={click}>
            {children}
        </div>
    );
}

function ButtonSubmit({ bgColor, textColor = "text-white", width = "w-full", font, link }) {
    return (
        <input type="submit" className={`${bgColor} ${width} ${font} ${textColor} py-2 px-4 rounded-md text-sm drop-shadow-md`}>
        </input>
    );
}

function ButtonTransparent({ color = "black", width = "w-fit", click, children, css, font }) {
    return (
        // <div className={`${width} border-${color} text-${color} border text-center p-1 rounded-md cursor-pointer hover:bg-white`}
        <div className={`${width} ${font} p-2 text-center text-[#c7c7c7] text-sm bg-white rounded-md border-2 border-[#c7c7c7] ${css}`}
            onClick={click}>
            {children}
        </div>
    );
}

export { Button, ButtonSubmit, ButtonTransparent };