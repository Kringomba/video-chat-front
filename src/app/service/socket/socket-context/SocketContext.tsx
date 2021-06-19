import React, {createContext, useContext, useRef} from "react";
import { SocketAction } from "./SocketAction";
import { CallService } from "../../call";

export interface ISocketContext {
  socket: SocketAction;
  call: CallService;
}

export const SocketContext = createContext<ISocketContext>({
  call: CallService.instance,
  socket: new SocketAction(),
});

export const SocketContextProvider: React.FC = ({ children }) => {
    const callServiceRef = useRef(CallService.createInstance())
  return (
    <SocketContext.Provider
      value={{
        call: callServiceRef.current,
        socket: new SocketAction(),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};