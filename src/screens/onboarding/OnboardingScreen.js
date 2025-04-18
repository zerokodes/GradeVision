import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { Button } from "../../components/button";
import { ProgressDots } from "../../components/progressDots";
import {
  nextStep,
  prevStep,
  updateUserData,
  completeOnboarding,
} from "../../redux/slices/onboardingSlice";
import {
  WelcomeStep,
  IntroductionStep,
  NameStep,
  SchoolStep,
  RegisterStep,
  SuccessStep,
  SignInStep,
} from "./onboardingSteps";
import Prev from "../../components/Prev";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.background};
`;

const OnboardingContainer = styled(View)`
  flex: 1;
  padding: ${SIZES.padding}px;
  justify-content: space-between;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  padding-bottom: 20px;
`;

const CentralContentWrap = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
`;

const OnboardingScreen = () => {
  const { currentStep, userData } = useSelector((state) => state.onboarding);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: userData,
  });

  // Update form values when userData changes
  useEffect(() => {
    Object.keys(userData).forEach((key) => {
      setValue(key, userData[key]);
    });
  }, [userData, setValue]);

  //   NEXT or PREVIOUS ACTIONS..
  const handleNext = (data) => {
    // update user data..
    dispatch(updateUserData(data));

    // update counter..
    // if (currentStep === 5) {
    //   // Complete onboarding if at the last step
    //   dispatch(completeOnboarding());
    // } else {
    //   dispatch(nextStep());
    // }

    if (currentStep === 4) {
      const userdata = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      );
      dispatch(updateUserData(userdata));
      //   Make api request..
      // if successful, move to the next page; else display error message.

      console.log(userdata);
    } else {
      dispatch(nextStep());
    }
  };

  //   DISPLAY SCREENS..
  const steps = [
    <WelcomeStep />,
    <IntroductionStep />,
    <NameStep control={control} errors={errors} />,
    <SchoolStep control={control} errors={errors} setValue={setValue} />,
    <RegisterStep control={control} errors={errors} />,
    <SuccessStep />,
    <SignInStep />,
  ];

  const renderStep = () => {
    return steps[currentStep];
  };

  //   BUTTON LOGIC (when to display the different composition of button on the design)
  const renderButtons = () => {
    if (currentStep === 0 || currentStep === 1) {
      return (
        <ButtonContainer>
          <Button title="GET STARTED" onPress={handleSubmit(handleNext)} />
          {currentStep === 0 && (
            <Button
              title="I ALREADY HAVE AN ACCOUNT"
              onPress={() => dispatch(setStep(6))}
              secondary
            />
          )}
        </ButtonContainer>
      );
    } else if (currentStep === 5) {
      return null; // No buttons on success step
    } else if (currentStep === 6) {
      return null; // No buttons on sign in step
    } else {
      return (
        <ButtonContainer>
          <Button
            title={currentStep === 4 ? "CREATE" : "CONTINUE"}
            onPress={handleSubmit(handleNext)}
          />
        </ButtonContainer>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LinearGradient
          colors={["rgba(255, 82, 181, 0.1)", "rgba(255, 82, 181, 0)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.3 }}
          style={StyleSheet.absoluteFill}
        />
        <OnboardingContainer>
          {currentStep > 0 && currentStep < 5 ? <Prev /> : null}

          <CentralContentWrap>
            {renderStep()}
            {currentStep > 0 && currentStep < 5 && (
              <ProgressDots totalSteps={4} currentStep={currentStep - 1} />
            )}
          </CentralContentWrap>

          {renderButtons()}
        </OnboardingContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default OnboardingScreen;
