import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { COLORS } from "../../../styles/globalStyles";
import { Input } from "../../../components/input";
import { useDispatch, useSelector } from "react-redux";
import Prev from "../../../components/Prev";

const Container = styled(SafeAreaView)`
  width: 100%;
`;
// flex: 1;
//   justify-content: center;

const Title = styled(Text)`
  color: ${COLORS.mainText};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const FormContainer = styled(View)`
  width: 100%;
`;

const RegisterStep = ({ control, errors }) => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Create an account</Title>
        <FormContainer>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                topSpace
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                topSpace
              />
            )}
          />
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default RegisterStep;
