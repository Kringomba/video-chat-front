import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { socket_events } from "../events";
import { IMessage } from "../../../shared";
import { CallService } from "../../call";
import { clear, pushMessages, store } from "../../../store";

export class SocketAction {
  callService = CallService.instance;

  //@ts-ignore
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  connect(roomId: string, history: any) {
    this.socket = io("ws://localhost:3002", {
      path: "/socket",
      query: {
        roomId,
        userPeerId: this.callService.peer!.id,
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
      this.callService.connectToNewUser(id)
    );
    this.socket.on(socket_events.SEND_MESSAGE_TO_USER, (message: IMessage) =>
      this.setMessageEvent(message)
    );
    this.socket.on(socket_events.DISCONNECT_USER, (event) =>
      this.callService.disconnectUser(event)
    );
  }

  setMessageEvent(message: IMessage) {
    store.dispatch(pushMessages(message));
  }

  sendMessage(message: IMessage) {
    this.socket.emit(socket_events.SEND_MESSAGE_TO_SERVER, message);
    this.setMessageEvent(message);
  }

  disconnect() {
    this.socket?.disconnect();
    this.callService.peer.disconnect()
    this.callService.stream?.getTracks().forEach(function (track) {
      track.stop();
    });
    store.dispatch(clear());
  }
}
