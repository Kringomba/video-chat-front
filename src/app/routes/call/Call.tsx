import React, {useState} from "react";
import * as Icon from 'react-bootstrap-icons';
import {Chat} from './components'
import './style.css';


export const Call: React.FC = () => {
    const [micro, setMicro] = useState<boolean>(false)
    const [webcam, setWebcam] = useState<boolean>(false)
    const [chat, setChat] = useState<boolean>(false)
    return <div className="background">
        {chat ? <Chat/> : null}
        <div className="btn-bottom" style={chat ? {width: '75%'} : undefined}>
            <div className="btn-row">
                <div className="btn" onClick={() => setMicro(!micro)}>
                    {micro ?
                        <Icon.MicFill size={40}/> :
                        <Icon.MicMuteFill size={40}/>}
                </div>
                <div className="btn" onClick={() => setWebcam(!webcam)}>
                    {webcam ?
                        <Icon.CameraVideoFill size={40}/> :
                        <Icon.CameraVideoOffFill size={40}/>}
                </div>
                <div className="btn" onClick={() => setChat(!chat)}>
                    <Icon.ChatLeft size={40}/>
                </div>
                <div className="btn" onClick={()=>{}}>
                    <Icon.BoxArrowRight size={40}/>
                </div>
            </div>
        </div>
    </div>
}