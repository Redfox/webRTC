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

  video {
    width: 100%;
    height: 100%;
  }
`;

export const Controls = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  background: white;
  padding: 12px 13px;
  border-radius: 50%;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: black;
  }
`;
