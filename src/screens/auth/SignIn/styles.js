import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../styles/globalStyles";
import styled from "styled-components";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const SignInContainer = styled(View)`
  flex: 1;
  padding: ${SIZES.padding}px;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: ${COLORS.mainText};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  margin-top: 80px;
  text-align: center;
`;

export const FormContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;

export const OrContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: 20px;
`;

export const Line = styled(View)`
  flex: 1;
  height: 1px;
  background-color: #444;
`;

export const OrText = styled(Text)`
  color: ${COLORS.lightText};
  margin-horizontal: 10px;
`;

export const ForgotPasswordText = styled(Text)`
  color: ${COLORS.primary};
  text-align: right;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  left: 16px;
`;
