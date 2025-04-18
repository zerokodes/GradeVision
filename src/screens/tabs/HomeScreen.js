import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/button";
import { logout } from "../../redux/slices/authSlice";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.background};
`;

const HomeContainer = styled(View)`
  flex: 1;
  padding: ${SIZES.padding}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${COLORS.text};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const Subtitle = styled(Text)`
  color: ${COLORS.lightText};
  font-size: 18px;
  text-align: center;
  margin-bottom: 32px;
`;

const UserInfo = styled(Text)`
  color: ${COLORS.primary};
  font-size: 16px;
  margin-bottom: 8px;
`;

const LogoutButtonContainer = styled(View)`
  width: 50%;
  margin-top: 32px;
`;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.onboarding);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <LinearGradient
        colors={["rgba(255, 82, 181, 0.1)", "rgba(255, 82, 181, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={StyleSheet.absoluteFill}
      />
      <HomeContainer>
        <Title>Welcome to GPA Tracker!</Title>
        <Subtitle>Your personal academic performance tracker</Subtitle>

        <UserInfo>
          Name: {userData.firstName} {userData.lastName}
        </UserInfo>
        <UserInfo>School: {userData.school}</UserInfo>
        <UserInfo>Course: {userData.course}</UserInfo>

        <LogoutButtonContainer>
          <Button title="Logout" onPress={handleLogout} />
        </LogoutButtonContainer>
      </HomeContainer>
    </Container>
  );
};

export default HomeScreen;
