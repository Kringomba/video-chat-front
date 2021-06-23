import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router-dom";
import { Chat, RemoteVideo } from "./components";
import "./style.css";
import { useSocket } from "../../service";
import { useSelector } from "react-redux";

export const Call: React.FC = () => {
  const localVideo = useRef<HTMLVideoElement>(null);
  const [microStatus, setMicro] = useState<boolean>(true);
  const [videoStatus, setVideo] = useState<boolean>(true);
  const [chat, setChat] = useState<boolean>(false);
  const [cookies] = useCookies(["name"]);
  const { call, socket } = useSocket();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const microAction = useCallback(() => {
    const micro = !microStatus;
    setMicro(micro);
    call.changeMicroStatus(micro);
  }, [microStatus, call]);

  const videoAction = useCallback(() => {
    const video = !videoStatus;
    setVideo(video);
    call.changeVideoStatus(video);
  }, [videoStatus, call]);

  const connectToRoom = useCallback(async () => {
    localVideo.current!.srcObject = await call.createMediaStream();
    socket.connect(id, history);
  }, [localVideo, call, socket, id, history]);

  useEffect(() => {
    if (!cookies.name) {
      if (history.length > 2) {
        history.goBack();
      } else {
        history.push("/");
      }
    } else {
      if (call.peer?.id !== null) {
        connectToRoom();
      } else {
        call.peer.on("open", () => connectToRoom());
      }
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const remoteStreams = useSelector(
    (state: { remoteStreams: Array<MediaStream> }) => state.remoteStreams
  );

  return (
    <div className="background">
      {chat ? <Chat /> : null}
      <div className="webcams">
        <video autoPlay={true} className={`webcam ${chat? "webcam_with_chat":""}`} ref={localVideo} />
        {remoteStreams.map((stream, id) => (
          <RemoteVideo key={`remote-video-${id}`} stream={stream} chat={chat} />
        ))}
      </div>
      <div className="btn-bottom" style={chat ? { width: "75%" } : undefined}>
        <div className="btn-row">
          <div className="btn" onClick={microAction}>
            {microStatus ? (
              <Icon.MicFill size={40} />
            ) : (
              <Icon.MicMuteFill size={40} />
            )}
          </div>
          <div className="btn" onClick={videoAction}>
            {videoStatus ? (
              <Icon.CameraVideoFill size={40} />
            ) : (
              <Icon.CameraVideoOffFill size={40} />
            )}
          </div>
          <div className="btn" onClick={() => setChat(!chat)}>
            <Icon.ChatLeftFill size={40} />
          </div>
          <div className="btn" onClick={() =>  navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
              navigator.clipboard.writeText(window.location.href)
            }
          })}>
            <Icon.PeopleFill size={40} />
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
