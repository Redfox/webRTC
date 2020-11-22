import React from 'react';
import { useParams } from 'react-router-dom';

const Room: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();

  return (
    <h1>Room {roomName}</h1>
  )
}

export default Room;
