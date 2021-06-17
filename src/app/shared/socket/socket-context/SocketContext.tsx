import React, {createContext, useContext} from "react";
import {SocketAction} from "./SocketAction";

export interface ISocketContext {
  socket: SocketAction | undefined;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
});

export const SocketContextProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket: new SocketAction() }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};