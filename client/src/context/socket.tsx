import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { SocketContextData } from './models/socket';
import { AnswerEventHandler, CandidateEventHandler, JoinEventHandler, LeaveEventHandler, OfferEventHandler } from './socket.events';

const SocketContext = createContext<SocketContextData>({} as SocketContextData)

export const SocketProvider: React.FC = ({ children }) => {
  const [mediaAvailable, setMediaAvailable] = useState({ video: true, audio: true });
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const connect = useCallback(async (roomName: string) => {
    // TODO: improve logic
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
    } catch (err) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        setStream(stream);
        setMediaAvailable({ video: true, audio: false });
      } catch (error) {
        navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true
        }).then(stream => {
          setStream(stream);
          setMediaAvailable({ video: false, audio: true });
        }).catch(error => {
          setMediaAvailable({ video: false, audio: false });
          console.error(error);
          alert("Nenhum dispositivo disponivel");
        })
      }
    }

    const skt = io(process.env.REACT_APP_WS as string, { secure: true });
    setSocket(skt);

    skt.emit('ready', roomName)
  }, []);

  useEffect(() => {
    if(stream && socket) {
      socket.on('join', (socketId: string) => JoinEventHandler(socketId, stream, socket));
    
      socket.on('offer', (socketId: string, data: RTCSessionDescription) => OfferEventHandler(socketId, data, stream, socket));
      
      socket.on('answer', (socketId: string, data: RTCSessionDescription) => AnswerEventHandler(socketId, data))
    
      socket.on('candidate', (socketId: string, data: RTCIceCandidate) => CandidateEventHandler(socketId, data))
    
      socket.on('leave', (socketId: string) => LeaveEventHandler(socketId, socket));
    }
  }, [socket, stream]);

  return (
    <SocketContext.Provider value={{ connect, stream, mediaAvailable }}>
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
