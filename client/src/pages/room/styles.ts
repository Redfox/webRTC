import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #5b586d;
`;

export const VideoContainer = styled.div`
  flex: 1;
  display: flex;

  div {
    width: 100%;
    flex: 1;
    display: flex;  
  }

  div.thumb {
    background: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  video {
    flex: 1;
  }
`;


