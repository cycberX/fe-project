export function Form({children,action,method,onSubmit, style}){
    return(
        <form action={action} method={method} onSubmit={onSubmit} style={style}>
            {children}
        </form>
    )
}