import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Home: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const joinRoom = useCallback(() => {
    history.push(`/room/${roomName}`)
  }, [roomName, history])

  return (
    <Container>
      <h1>Video Chat - app</h1>
      <input value={roomName} onChange={e => setRoomName(e.target.value)} />
      <button onClick={joinRoom}>Entrar</button>
    </Container>
  );
}

export default Home;
