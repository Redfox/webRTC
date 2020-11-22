import React, { useState } from 'react';
import { MdMic, MdMicOff } from 'react-icons/md';
import { BiCamera, BiCameraOff } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import { Container, Bar, VideoContainer, Controls, Icon } from './styles';

const Room: React.FC = () => {
  const lsMicMuted = localStorage.getItem('@videoChat/micMuted');
  const lsVideoMuted = localStorage.getItem('@videoChat/VideoMuted');
  const [micMuted, setMicMuted] = useState(lsMicMuted ? Boolean(localStorage.getItem('@videoChat/micMuted')) : false);
  const [videoMuted, setVideoMuted] = useState(lsVideoMuted ? Boolean(localStorage.getItem('@videoChat/VideoMuted')) : false);
  const { roomName } = useParams<{ roomName: string }>();

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

      <Controls>
        <Icon>
          {micMuted ? <MdMicOff size={25} /> : <MdMic size={25} />}
        </Icon>
        <Icon>
          {videoMuted ? <BiCameraOff size={25} /> : <BiCamera size={25} />}
        </Icon>
      </Controls>
    </Container>
  )
}

export default Room;
