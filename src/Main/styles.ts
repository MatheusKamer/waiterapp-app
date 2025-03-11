import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
  background-color: #fafafa;
  flex: 1;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  background-color: red;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  background-color: blue;
  flex: 1;
`;

export const Footer = styled.View`
  min-height: 110px;
  background-color: #fff;
`;

export const FooterContainer = styled.SafeAreaView``;
