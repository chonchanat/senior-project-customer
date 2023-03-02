function Button({ children, bgColor, textColor = "text-white", width = "w-fit", font, click }) {
    return (
        <div className={`${bgColor} ${width} ${font} ${textColor} flex justify-center items-center py-2 px-4 rounded-md shadow-md hover:cursor-pointer`}
            onClick={click}>
            <p className="text-sm">{children}</p>
        </div>
    );
}

function ButtonSubmit({ bgColor, textColor = "text-white", width = "w-fit", font, title }) {
    return (
        <input className={`${bgColor} ${width} ${font} ${textColor} flex justify-center py-2 px-4 rounded-md text-sm shadow-md hover:cursor-pointer`}
            type="submit"
            value={title}>
        </input>
    );
}

function ButtonTransparent({ color = "black", width = "w-fit", click, children, css, font }) {
    return (
        // <div className={`${width} border-${color} text-${color} border text-center p-1 rounded-md cursor-pointer hover:bg-white`}
        <div className={`${width} ${font} p-2 text-center text-[#c7c7c7] text-sm bg-white rounded-md border-2 border-[#c7c7c7] ${css}`}
            onClick={click}>
            <p className="text-sm">{children}</p>
        </div>
    );
}

export { Button, ButtonSubmit, ButtonTransparent };