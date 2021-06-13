import React, {useCallback, useEffect, useState} from 'react'
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import './style.css'
import {Popup} from "./components";
import { PopupContext } from '../../shared'

export const Welcome: React.FC = () => {
    const history = useHistory()
    const [name, setName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [cookies, setCookie] = useCookies(['name'])

    const connect = useCallback(() => {
        setCookie('name', name, {path: '/', maxAge: 60 * 60 * 24 * 365})
        history.push(`/call/${roomId}`)
    }, [history, name, roomId, setCookie])

    useEffect(() => {
        if (cookies.name) {
            setName(cookies.name)
        }
    }, [cookies])

    const {showPopup,setShowPopup} = React.useContext(PopupContext)

    return <div className="welcome-route">
            {showPopup ? <Popup/> : null}
            <div className="welcome-block">
                <h1 className="title">Project call</h1>
                <form className="input-form">
                    <label>Name</label>
                    <input className="input-text" type="text" value={name}
                           onChange={event => setName(event.target.value)}/>
                    <label>Room id</label>
                    <input className="input-text" type="text" value={roomId}
                           onChange={event => setRoomId(event.target.value)} required={true}/>
                    <input type="submit" onClick={connect}/>
                </form>
                <div className="link-to-create-room" onClick={setShowPopup}>Create room?</div>
            </div>
        </div>
}