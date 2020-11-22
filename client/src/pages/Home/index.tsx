import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Home: React.FC = () => {
  const history = useHistory();

  const joinRoom = useCallback(() => {
    history.push('/room/dale')
  }, [history])

  return (
    <Container>
      <h1>Video Chat - app</h1>
      <input />
      <button onClick={joinRoom}>Entrar</button>
    </Container>
  );
}

export default Home;
