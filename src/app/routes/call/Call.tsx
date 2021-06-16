import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router-dom";
import { Chat, RemoteVideo } from "./components";
import "./style.css";
import { IMessage, useSocket } from "../../shared";

export const Call: React.FC = () => {
  const localVideo = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream>();
  const [micro, setMicro] = useState<boolean>(false);
  const [webcam, setWebcam] = useState<boolean>(false);
  const [chat, setChat] = useState<boolean>(false);
  const [remoteVideos, setRemoteVideos] = useState<Array<MediaStream>>([]);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [cookies] = useCookies(["name"]);
  const { socket } = useSocket();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const setUpSendMessage = useCallback(() => {
    const allMessages: Array<IMessage> = [];
    socket!.setOnMessageSend = (message: IMessage) => {
      allMessages.push(message);
      setMessages([...allMessages]);
    };
  }, []);

  const setUpVideoCall = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.current!.srcObject = mediaStream;
      stream.current = mediaStream;
      return mediaStream;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }, [localVideo, stream]);

  const configSocket = useCallback(async () => {
    setUpSendMessage();
    socket!.stream = await setUpVideoCall();
    const localRemoteVideos: Array<MediaStream> = [];
    socket!.addVideoStream = (stream) => {
      if (
        localRemoteVideos.filter(
          (localRemoteVideo) => localRemoteVideo.id === stream.id
        ).length === 0
      ) {
        localRemoteVideos.push(stream);
        setRemoteVideos([...localRemoteVideos]);
      }
      console.log(localRemoteVideos);
    };
    socket!.connect(id, history);
  }, [setRemoteVideos]);

  useEffect(() => {
    if (!cookies.name) {
      if (history.length > 2) {
        history.goBack();
      } else {
        history.push("/");
      }
    }
    configSocket();
    return () => {
      socket?.socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      stream.current?.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  }, [localVideo]);

  return (
    <div className="background">
      {chat ? <Chat messages={messages} /> : null}
      <video autoPlay={true} className="local-video" ref={localVideo} />
      {remoteVideos.map((stream, id) => {
        return <RemoteVideo key={`remote-video-${id}`} stream={stream} />;
      })}
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
