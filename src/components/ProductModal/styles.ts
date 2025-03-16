import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
`;
