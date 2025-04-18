import styled from "styled-components";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../styles/globalStyles";

export const ButtonContainer = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || "#FFFFFF"};
  margin-vertical: 8px;
`;

export const ButtonText = styled(Text)`
  color: ${(props) => props.textColor || "#000000"};
  font-weight: bold;
  margin-left: 8px;
`;

export const IconContainer = styled(View)`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;
