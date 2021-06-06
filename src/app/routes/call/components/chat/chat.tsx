import React, {useCallback, useState} from "react";
import moment from "moment";
import './style.css'
import {MessageType} from "./type";
import * as Icon from 'react-bootstrap-icons';

export const Chat: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>('')
    const sendMessage = useCallback(() => {
        alert(userMessage)
        setUserMessage('');
    }, [userMessage])
    const messages: Array<MessageType> = [{
        username: 'test1',
        message: 'test text',
        date: moment().add(7, 'minutes')
    }, {
        username: 'test2',
        message: 'hjfgdbjbhjhbjkhbjhbj hbjhb jhb jhb jhbjbjhbjhbjhbjhb jhbjhbjhbjhb jhbjkbhjkhb',
        date: moment().add(1, 'minute')
    }, {
        username: 'test3',
        message: 'test text',
        date: moment().add(2, 'minutes')
    }, {
        username: 'test4',
        message: 'test text',
        date: moment().add(3, 'minutes')
    }, {
        username: 'test5',
        message: 'test text',
        date: moment().add(4, 'minutes')
    },{
        username: 'test2',
        message: 'hjfgdbjbhjhbjkhbjhbj hbjhb jhb jhb jhbjbjhbjhbjhbjhb jhbjhbjhbjhb jhbjkbhjkhb',
        date: moment().add(1, 'minute')
    }, {
        username: 'test3',
        message: 'test text',
        date: moment().add(2, 'minutes')
    }, {
        username: 'test4',
        message: 'test text',
        date: moment().add(3, 'minutes')
    }, {
        username: 'test5',
        message: 'test text',
        date: moment().add(4, 'minutes')
    },{
        username: 'test2',
        message: 'hjfgdbjbhjhbjkhbjhbj hbjhb jhb jhb jhbjbjhbjhbjhbjhb jhbjhbjhbjhb jhbjkbhjkhb',
        date: moment().add(1, 'minute')
    }, {
        username: 'test3',
        message: 'test text',
        date: moment().add(2, 'minutes')
    }, {
        username: 'test4',
        message: 'test text',
        date: moment().add(3, 'minutes')
    }, {
        username: 'test5',
        message: 'test text',
        date: moment().add(4, 'minutes')
    }]
    return <div className="chat-block">
        <div className="messages-block">
        {messages.sort((a, b) => b.date.valueOf() - a.date.valueOf()).map(({username, message,date}) => <div className="msg-block" key={`${username}-${message}-${date.valueOf()}}`}>
            <div className="msg-username">{username}</div>
            <div className="msg-message">{message}</div>
            <div className="msg-date">{date.format('DD/MM/YYYY')}</div>
        </div>)}
        </div>
        <div className="message-block">
            <input className="message-input" type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Message..."/>
            <button onClick={sendMessage} className="send-message-btn"><Icon.ArrowReturnRight size={30} /></button>
        </div>
    </div>
}