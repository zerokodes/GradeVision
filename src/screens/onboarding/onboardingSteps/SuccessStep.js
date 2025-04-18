import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import styled from "styled-components";
import { COLORS } from "../../../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { completeOnboarding } from "../../../redux/slices/onboardingSlice";
import { CheckIcon } from "../../../components/icon/Icon";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled(Animated.View)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${COLORS.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

// const CheckIcon = styled(Text)`
//   font-size: 50px;
//   color: ${COLORS.text};
// `;

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
`;

const SuccessStep = () => {
  const { userData } = useSelector((state) => state.onboarding);
  const dispatch = useDispatch();
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Automatically complete onboarding after 2 seconds
    const timer = setTimeout(() => {
      console.log("got here");
      //   dispatch(completeOnboarding());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <IconContainer>
        <CheckIcon />
      </IconContainer>
      <Title>Your account has been created successfully</Title>
    </Container>
  );
};

export default SuccessStep;
