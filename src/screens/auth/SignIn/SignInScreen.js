import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { COLORS, SIZES } from "../styles/globalStyles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginStart } from "../../../redux/slices/authSlice";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { Ionicons } from "@expo/vector-icons";
import { SocialLoginButton } from "../../../components/socialLoginBtn";
import HomeScreen from "../../tabs/HomeScreen/HomeScreen";

import {
  Container,
  SignInContainer,
  Title,
  FormContainer,
  OrContainer,
  Line,
  OrText,
  ForgotPasswordText,
  CloseButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { setStep } from "../../../redux/slices/onboardingSlice";
import { COLORS } from "../../../styles/globalStyles";

const SignInScreen = () => {
  const navigation = useNavigation();
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
    dispatch(loginStart(data));
    navigation.navigate("Home");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <Container>
      {/* <CloseButton onPress={() => dispatch(setStep(0))}>
        <Ionicons name="close" size={30} color={COLORS.primary} />
      </CloseButton> */}
      <LinearGradient
        colors={["rgba(255, 82, 181, 0.1)", "rgba(255, 82, 181, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={StyleSheet.absoluteFill}
      />
      <SignInContainer>
        <ScrollView>
          <Title>Sign In</Title>
          <FormContainer>
            <Controller
              control={control}
              name="email"
              rule={{ required: "Username or email is required" }}
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
              rule={{ required: "Password is required" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  secureTextEntry
                  topSpace
                />
              )}
            />

            <ForgotPasswordText>FORGET PASSWORD</ForgotPasswordText>

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
              onPress={handleFacebookLogin}
            />

            <SocialLoginButton
              icon={<Ionicons name="logo-google" size={20} color="#000000" />}
              title="GOOGLE"
              backgroundColor="#FFFFFF"
              textColor="#000000"
              onPress={handleGoogleLogin}
            />
          </FormContainer>
        </ScrollView>
      </SignInContainer>
    </Container>
  );
};

export default SignInScreen;
