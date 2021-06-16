import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { socket_events } from "../events";
import { IMessage } from "../../interfaces";
import Peer from "peerjs";

export class SocketAction {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  onMessageSend: ((message: IMessage) => void) | undefined;
  addVideoStream: ((stream: MediaStream) => void) | undefined;
  stream: MediaStream | undefined;
  private peer: Peer;

  constructor() {
    this.peer = new Peer();
  }

  connect(roomId: string, history: any) {
    this.socket = io("ws://localhost:3002", {
      path: "/socket",
      query: {
        roomId,
        userPeerId: this.peer.id,
      },
    });
    this.socket.on(socket_events.FAIL_TO_JOIN, () => {
      alert("Fail to connect");
      if (history.length > 1) {
        history.goBack();
      } else {
        history.push("/");
      }
    });

    this.socket.on(socket_events.JOIN_NEW_USER, (id: string) =>
      this.connectToNewUser(id, this.stream!)
    );

    this.peer.on("call", (call) => {
      call.answer(this.stream!);
      call.on("stream", (userVideoStream) =>
        this.addVideoStream!(userVideoStream)
      );
    });
  }

  set setOnMessageSend(callback: (message: IMessage) => void) {
    this.onMessageSend = callback;
  }

  getMessage(event: any, callback: (message: IMessage) => void) {
    if (callback) {
      callback(event);
    }
  }

  connectToNewUser(id: string, stream: MediaStream) {
    const call = this.peer.call(id, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) =>
      this.addVideoStream!(userVideoStream)
    );
    call.on("close", () => {
      video.remove();
    });

    // peers[userId] = call
  }

  sendMessage(message: IMessage) {
    this.socket!.emit(socket_events.SEND_MESSAGE_TO_SERVER, message);
    this.getMessage(message, this.onMessageSend!);
  }
}
