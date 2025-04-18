import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
// import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/globalStyles";
import { Happy } from "../../../components/icon/Icon";

const Container = styled(View)`
  position: relative;
  /*   background-color: yellow;  added */
`;
// flex: 1;
//   justify-content: center;
//   align-items: center;

const IconContainer = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled(Text)`
  color: ${COLORS.mainText};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
`;

const Subtitle = styled(Text)`
  color: ${COLORS.lightText};
  font-size: 16px;
  text-align: center;
  max-width: 80%;
`;

const IntroductionStep = () => {
  return (
    <Container>
      <IconContainer>
        {/* <Ionicons name="happy-outline" size={50} color={COLORS.primary} /> */}
        <Happy />
      </IconContainer>
      <Title>Just a few questions before you create your account</Title>
      {/* <Subtitle>We'll help you set up your profile quickly</Subtitle> */}
    </Container>
  );
};

export default IntroductionStep;
