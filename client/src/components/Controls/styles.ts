import styled from 'styled-components';

export const Container = styled.div`
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
