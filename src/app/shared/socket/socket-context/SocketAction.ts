import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io-client/build/typed-events";
import {socket_events} from "../events";

export class SocketAction {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

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
    }
}