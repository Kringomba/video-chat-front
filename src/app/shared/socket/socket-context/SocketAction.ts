import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io-client/build/typed-events";
import {socket_events} from "../events";
import {IMessage} from "../../interfaces";

export class SocketAction {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
    onMessageSend: ((message: IMessage) => void) | undefined;

    connect(roomId: string, history: any) {
        this.socket = io("ws://localhost:3002", {
            path: "/socket",
            query: {
                roomId,
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
        this.socket.on(socket_events.SEND_MESSAGE_TO_USER, (event) =>
            this.getMessage(event, this.onMessageSend!)
        );
    }

    set setOnMessageSend(callback: (message: IMessage) => void) {
        this.onMessageSend = callback;
    }

    getMessage(event: any, callback: (message: IMessage) => void) {
        if (callback) {
            callback(event);
        }
    }

    sendMessage(message: IMessage) {
        this.socket!.emit(socket_events.SEND_MESSAGE_TO_SERVER, message);
        this.getMessage(message, this.onMessageSend!);
    }
}