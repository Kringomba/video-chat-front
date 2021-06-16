import React, { useEffect, useRef } from "react";

export const RemoteVideo: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current!.srcObject = stream
  }, [stream]);
  return <video ref={videoRef}  autoPlay={true}/>;
};