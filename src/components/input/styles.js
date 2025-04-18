import { TextInput, Text, Pressable, View } from "react-native";
import { COLORS } from "../../styles/globalStyles";
import styled from "styled-components";

export const InputContainer = styled(View)`
  margin-verical: 8px;
`;

export const StyledInput = styled(TextInput)`
  background-color: transparent;
  padding: 16px 12px;
  border-radius: 8px;
  color: ${COLORS.text};
  border: 1px solid
    ${(props) => (props.isFocused ? COLORS.primary : COLORS.grayBorder)};
  margin-top: ${(props) => (props.topSpace ? "16px" : "8px")};
`;

export const Label = styled(Text)`
  color: ${COLORS.text};
  margin-bottom: 4px;
  font-size: 14px;
`;

export const Error = styled(Text)`
  color: ${COLORS.primary};
  font-size: 12px;
  margin-top: 4px;
`;

export const PasswordContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const PasswordVisibilityButton = styled(Pressable)`
  position: absolute;
  right: 12px;
  height: 100%;
  justify-content: center;
  top: 8px;
`;
