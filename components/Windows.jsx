import { Button } from "@/ui/Button";
import { FaClosedCaptioning } from "react-icons/fa";

export function Windows({children,onClose,title}){
    return(
        <div className="windows-container">
            <div className="window">
                <div className="window-header">
                    <h3>{title}</h3>
                    <Button onClick={()=>onClose()}><FaClosedCaptioning/></Button>
                </div>
                <div className="window-body">
                    {children}
                </div>
            </div>
        </div>
    )
}