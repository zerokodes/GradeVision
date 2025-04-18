import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { COLORS } from "../../../styles/globalStyles";
import { Input } from "../../../components/input";

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

const NameStep = ({ control, errors }) => {
  return (
    <Container>
      <Title>What is your name</Title>
      <FormContainer>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last name is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.lastName?.message}
              topSpace
            />
          )}
        />
      </FormContainer>
    </Container>
  );
};

export default NameStep;
