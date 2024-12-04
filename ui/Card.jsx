export function Card({children,style,header,footer,summary,className}){
    return(
        <div className={`card ${className}`} style={style}>
            <h2>{header}</h2>
            <b className="muted">{summary}</b>
            <div className="card-body">{children}</div>
            <span>{footer}</span>
        </div>
    )
}

export function Box({children,style,header,footer,text}){
    return(
        <div className="box" style={style}>
            <h5 style={{color:text}}>{header}</h5>
            <div>{children}</div>
            <span style={{color:text}}>{footer}</span>
        </div>
    )
}