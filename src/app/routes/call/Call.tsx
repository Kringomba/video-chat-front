import React, {useState} from "react";
import './style.css';

export const Call: React.FC = () => {
    const [micro, setMicro] = useState<boolean>(false)
    const [webcam, setWebcam] = useState<boolean>(false)
    const [chat, setChat] = useState<boolean>(false)
    return <div className="background">
        <div className="btn-row">
            <div className={micro ? 'on-micro' : 'off-micro'} onClick={()=>setMicro(!micro)}/>
            <div className={webcam ? 'on-webcam' : 'off-webcam'} onClick={()=>setWebcam(!webcam)}/>
            <div className={chat ? 'on-chat' : 'off-chat'} onClick={()=>setChat(!chat)}/>
        </div>
    </div>
}