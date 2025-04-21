import { View, Text, SafeAreaView } from "react-native";
import styled from "styled-components";
import { COLORS, SIZES } from "../../../styles/globalStyles";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const HomeContainer = styled(View)`
  flex: 1;
  padding: ${SIZES.padding}px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Text)`
  color: ${COLORS.text};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

export const Subtitle = styled(Text)`
  color: ${COLORS.lightText};
  font-size: 18px;
  text-align: center;
  margin-bottom: 32px;
`;

export const UserInfo = styled(Text)`
  color: ${COLORS.primary};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const LogoutButtonContainer = styled(View)`
  width: 50%;
  margin-top: 32px;
`;
