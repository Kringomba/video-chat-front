import React, {useCallback, useEffect, useState} from 'react'
import {useCookies} from "react-cookie";
import './style.css'

export const Welcome: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [cookies, setCookie] = useCookies(['name'])

    const connect = useCallback(() => {
        setCookie('name', name, {path: '/', maxAge: 60 * 60 * 24 * 365})
    }, [name, roomId, setCookie])

    useEffect(() => {
        if (cookies.name) {
            setName(cookies.name)
        }
    }, [cookies])

    return <div className="welcome-route">
        <div className="welcome-block">
            <h1 className="title">Project call</h1>
            <form className="input-form">
                <label>Name</label>
                <input className="input-text" type="text" value={name}
                       onChange={event => setName(event.target.value)}/>
                <label>Room id</label>
                <input className="input-text" type="text" value={roomId}
                       onChange={event => setRoomId(event.target.value)}/>
                <input type="submit" onClick={connect}/>
            </form>
        </div>
    </div>
}