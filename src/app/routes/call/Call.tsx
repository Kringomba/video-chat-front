import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Chat } from "./components";
import "./style.css";
import { IMessage, useSocket } from "../../shared";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Call: React.FC = () => {
  const [micro, setMicro] = useState<boolean>(false);
  const [webcam, setWebcam] = useState<boolean>(false);
  const [chat, setChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [cookies] = useCookies(["name"]);
  const { socket } = useSocket();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    if (!cookies.name) {
      if (history.length > 2) {
        history.goBack();
      } else {
        history.push("/");
      }
    }
    const allMessages: Array<IMessage> = [];
    socket!.setOnMessageSend = (message: IMessage) => {
      allMessages.push(message);
      setMessages([...allMessages]);
    };
    socket?.connect(id, history);
    return () => {
      socket?.socket?.disconnect();
    };
  }, []);

  return (
    <div className="background">
      {chat ? <Chat messages={messages} /> : null}
      <div className="btn-bottom" style={chat ? { width: "75%" } : undefined}>
        <div className="btn-row">
          <div className="btn" onClick={() => setMicro(!micro)}>
            {micro ? (
              <Icon.MicFill size={40} />
            ) : (
              <Icon.MicMuteFill size={40} />
            )}
          </div>
          <div className="btn" onClick={() => setWebcam(!webcam)}>
            {webcam ? (
              <Icon.CameraVideoFill size={40} />
            ) : (
              <Icon.CameraVideoOffFill size={40} />
            )}
          </div>
          <div className="btn" onClick={() => setChat(!chat)}>
            <Icon.ChatLeft size={40} />
          </div>
          <div
            className="btn"
            onClick={() => {
              history.push("/");
            }}
          >
            <Icon.BoxArrowRight size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
