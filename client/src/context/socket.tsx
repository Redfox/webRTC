import React, { createContext, useContext, useCallback } from 'react';
import { SocketContextData } from './models/socket';

const SocketContext = createContext<SocketContextData>({} as SocketContextData)

export const SocketProvider: React.FC = ({ children }) => {

  const connect = useCallback(() => {
    console.log('connect');
  }, []);

  return (
    <SocketContext.Provider value={{ connect }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = (): SocketContextData => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within an SocketProvider');
  }

  return context;
}
