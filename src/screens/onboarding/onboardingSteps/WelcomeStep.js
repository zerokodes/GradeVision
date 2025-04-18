import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styled from "styled-components";
// import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/globalStyles";

import { Happy } from "../../../components/icon/Icon";

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
//   border-width: 2px;
//   border-color: ${COLORS.primary};

const Title = styled(Text)`
  color: ${COLORS.mainText};
  font-size: 24px;
  line-height: ${24 * 1.5}px;
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

const WelcomeStep = () => {
  return (
    <Container>
      <IconContainer>
        {/* <Ionicons name="happy-outline" size={50} color={COLORS.primary} /> */}
        <Happy />
      </IconContainer>
      <Title>The free way to know your CGPA</Title>
      {/* <Subtitle>Keep track of your grades and GPA easily</Subtitle> */}
    </Container>
  );
};

export default WelcomeStep;
