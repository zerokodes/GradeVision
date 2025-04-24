import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../components/button";
import { logout } from "../../../redux/slices/authSlice";
import {
  Subtitle,
  Container,
  HomeContainer,
  Title,
  UserInfo,
  LogoutButtonContainer,
} from "./styles";
import GradientBackground from "../../../components/GradientBackground";
import Header from "../../../components/Header";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.onboarding);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <GradientBackground />
      <Header title="Stella" subTitle="Computer Engineering" />
      <HomeContainer>
        {/* <Title>Welcome to GPA Tracker!</Title>
        <Subtitle>Your personal academic performance tracker</Subtitle>

        <UserInfo>
          Name: {userData.firstName} {userData.lastName}
        </UserInfo>
        <UserInfo>School: {userData.school}</UserInfo>
        <UserInfo>Course: {userData.course}</UserInfo>

        <LogoutButtonContainer>
          <Button title="Logout" onPress={handleLogout} />
        </LogoutButtonContainer> */}
      </HomeContainer>
    </Container>
  );
};

export default HomeScreen;
