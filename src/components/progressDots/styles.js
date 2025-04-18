import styled from "styled-components";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { View } from "react-native";

export const DotsContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: ${(props) =>
    props.currentStep === 0 ? "center" : "flex-start"};
  padding: ${SIZES.padding}px;
  padding-left: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Dot = styled(View)`
  width: 24px;
  height: 6px;
  border-radius: 3px;
  margin-right: 4px;
  background-color: ${(props) =>
    props.active
      ? COLORS.primary
      : props.completed
      ? COLORS.primary + "80"
      : "#444"};
`;

// justify-content: center;
// margin-vertical: 16px;
