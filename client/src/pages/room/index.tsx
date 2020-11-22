import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Bar, VideoContainer } from './styles';

import { useSocket } from 'context/socket';
import Controls from 'components/Controls';

const Room: React.FC = () => {
  const { connect } = useSocket();
  const { roomName } = useParams<{ roomName: string }>();

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <Container>
      <Bar>
        <h1>Room - {roomName}</h1>
      </Bar>

      <VideoContainer>
        <video controls autoPlay>
          <source src="/home/vitor/Downloads/videoplayback.mp4" type="video/mp4" />
        </video>
      </VideoContainer>

      <Controls />
    </Container>
  )
}

export default Room;
