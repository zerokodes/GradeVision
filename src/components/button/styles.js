import { Text, Pressable } from "react-native";
import styled from "styled-components";
import { COLORS, SIZES } from "../../styles/globalStyles";

export const StyledButton = styled(Pressable)`
  background-color: ${(props) =>
    props.secondary ? "transparent" : COLORS.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-vertical: 8px;
  border: ${(props) =>
    props.secondary ? `1px solid ${COLORS.grayBorder}` : "none"};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const ButtonText = styled(Text)`
  color: ${(props) => (props.secondary ? COLORS.primary : COLORS.buttonText1)};
  font-weight: bold;
  font-size: 16px;
`;
