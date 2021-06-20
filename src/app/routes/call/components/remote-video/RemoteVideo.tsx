import React, { useEffect, useRef } from "react";

export const RemoteVideo: React.FC<{ stream: MediaStream, chat: boolean }> = ({ stream, chat }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current!.srcObject = stream
  }, [stream]);
  return <video ref={videoRef}  className={`webcam ${chat? "webcam_with_chat":""}`} autoPlay={true}/>;
};