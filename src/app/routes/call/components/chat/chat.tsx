import React, { useCallback, useState } from "react";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import "./style.css";
import { IMessage, useSocket } from "../../../../shared";
import { useCookies } from "react-cookie";

export const Chat: React.FC<{ messages: Array<IMessage> }> = ({ messages }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [cookies] = useCookies(["name"]);
  const { socket } = useSocket();

  const sendMessage = useCallback(() => {
    socket?.sendMessage({
      message: userMessage,
      date: moment.now(),
      username: cookies.name,
    });
    setUserMessage("");
  }, [cookies.name, socket, userMessage]);

  return (
    <div className="chat-block">
      <div className="messages-block">
        {messages
          .sort((a, b) => b.date.valueOf() - a.date.valueOf())
          .map(({ username, message, date }) => (
            <div
              className="msg-block"
              key={`${username}-${message}-${date.valueOf()}}`}
            >
              <div className="msg-username">{username}</div>
              <div className="msg-message">{message}</div>
              <div className="msg-date">
                {moment(date).format("DD/MM/YYYY")}
              </div>
            </div>
          ))}
      </div>
      <div className="message-block">
        <input
          className="message-input"
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={sendMessage} className="send-message-btn">
          <Icon.ArrowReturnRight size={30} />
        </button>
      </div>
    </div>
  );
};
