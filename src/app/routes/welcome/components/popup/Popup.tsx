import React, {useCallback, useContext, useEffect, useState} from "react";
import * as Icon from 'react-bootstrap-icons';
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import './style.css'
import {PopupContext, PopupLayout} from "../../../../shared";
import axios from '../../../../service/axios'

export const Popup: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [cookies, setCookie] = useCookies(['name'])
    const [count, setCount] = useState<number>(2)
    const {setShowPopup} = useContext(PopupContext)
    const history = useHistory()

    useEffect(() => {
        setName(cookies.name)
    }, [cookies])

    const createRoom = useCallback(async (e) => {
        e.preventDefault()

        setCookie('name', name, {path: '/', maxAge: 60 * 60 * 24 * 365})
        const res = await axios.post('/room', {
            options: {
                max_people_count: count
            }
        });
        history.push(`/call/${res.data.uuid}`)
    }, [setCookie, name, count])

    return <PopupLayout>
        <div className="content-popup">
            <span className="close-btn">
                <Icon.XLg onClick={setShowPopup} size={25} className="close-icon-btn"/>
            </span>
            <form className="input-form" onSubmit={createRoom}>
                <label>Name</label>
                <input className="input-text" type="text" value={name}
                       onChange={event => setName(event.target.value)}/>
                <label>Number of people</label>
                <select className="select-count-people" onChange={(event) => setCount(parseInt(event.target.value))}
                        required={true}>
                    <option/>
                    {new Array(9).fill('').map((_, index) => <option
                        key={`people-number-${index + 2}`}>{index + 2}</option>)}
                </select>
                <input type="submit" value="Create"/>
            </form>
        </div>
    </PopupLayout>
}