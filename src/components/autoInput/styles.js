import styled from "styled-components";
import { View, Pressable, Text } from "react-native";
import { COLORS } from "../../styles/globalStyles";

export const SuggestionContainer = styled(View)`
  background-color: #1a1a1a;
  border-radius: 8px;
  max-height: 120px;
  margin-top: 4px;
  border: 1px solid #333;
`;

export const SuggestionItem = styled(Pressable)`
  padding: 12px;
  border-bottom-width: ${(props) => (props.isLast ? "0" : "1px")};
  border-bottom-color: #333;
`;

export const SuggestionText = styled(Text)`
  color: ${COLORS.text};
`;
