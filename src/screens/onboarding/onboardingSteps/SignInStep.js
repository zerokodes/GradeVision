import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../../styles/globalStyles";
import { SocialLoginButton } from "../../../components/socialLoginBtn";
import { setStep } from "../../../redux/slices/onboardingSlice";
import { Input } from "../../../components/input";

const Container = styled(View)`
  flex: 1;
  padding-vertical: 20px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Title = styled(Text)`
  color: ${COLORS.text};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FormContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;

const OrContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: 20px;
`;

const Line = styled(View)`
  flex: 1;
  height: 1px;
  background-color: #444;
`;

const OrText = styled(Text)`
  color: ${COLORS.lightText};
  margin-horizontal: 10px;
`;

const ForgotPasswordText = styled(Text)`
  color: ${COLORS.primary};
  text-align: right;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SignInStep = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Login logic..
  };

  return (
    <Container>
      <CloseButton onPress={() => dispatch(setStep(0))}>
        <Ionicons name="close" size={24} color={COLORS.text} />
      </CloseButton>
      <Title>Enter Your details</Title>

      <FormContainer>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Username or email is required",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Username or email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <TouchableOpacity>
          <ForgotPasswordText>FORGET PASSWORD</ForgotPasswordText>
        </TouchableOpacity>

        <Button title="SIGN IN" onPress={handleSubmit(onSubmit)} />

        <OrContainer>
          <Line />
          <OrText>Or</OrText>
          <Line />
        </OrContainer>

        <SocialLoginButton
          icon={<Ionicons name="logo-facebook" size={20} color="#FFFFFF" />}
          title="FACEBOOK"
          backgroundColor="#3b5998"
          textColor="#FFFFFF"
          onPress={() => console.log("Facebook sign in")}
        />

        <SocialLoginButton
          icon={<Ionicons name="logo-google" size={20} color="#000000" />}
          title="GOOGLE"
          backgroundColor="#FFFFFF"
          textColor="#000000"
          onPress={() => console.log("Google sign in")}
        />
      </FormContainer>
    </Container>
  );
};

export default SignInStep;
