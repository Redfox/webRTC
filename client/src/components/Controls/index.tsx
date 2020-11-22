import React, { useState, useCallback } from 'react';
import { MdMic, MdMicOff } from 'react-icons/md';
import { BiCamera, BiCameraOff } from 'react-icons/bi';

import { Container, Icon } from './styles';

export const Controls: React.FC = () => {
  const [micMuted, setMicMuted] = useState(() => {
    return localStorage.getItem('@videoChat/micMuted') === 'true';
  });
  const [videoMuted, setVideoMuted] = useState(() => {
    return localStorage.getItem('@videoChat/VideoMuted') === 'true';
  });
  
  const toggleMic = useCallback(() => {
    setMicMuted(!micMuted) 
    window.localStorage.setItem('@videoChat/micMuted', String(!micMuted));
  }, [micMuted]);

  const toggleVideo = useCallback(() => {
    setVideoMuted(!videoMuted) 
    window.localStorage.setItem('@videoChat/VideoMuted', String(!videoMuted));
  }, [videoMuted]);

  return (
    <Container>
      <Icon onClick={toggleMic}>
        {micMuted ? <MdMicOff size={25} /> : <MdMic size={25} />}
      </Icon>

      <Icon onClick={toggleVideo}>
        {videoMuted ? <BiCameraOff size={25} /> : <BiCamera size={25} />}
      </Icon>
    </Container>
  )
}

export default Controls;
