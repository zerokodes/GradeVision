import React, { useState } from "react";
import { TextInput, ScrollView, Text, Pressable } from "react-native";
import { COLORS } from "../../styles/globalStyles";
// import { Ionicons } from "@expo/vector-icons";
import {
  InputContainer,
  StyledInput,
  Label,
  Error,
  PasswordContainer,
  PasswordVisibilityButton,
} from "./styles";
import { Eye } from "../icon/Icon";

const Input = ({
  label,
  error,
  secureTextEntry,
  onFocus,
  onBlur,

  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // // Remove spaces at both start and end
  // const handleTextChange = (text) => {
  //   onChangeText && onChangeText(text.trim());
  // };

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}

      {secureTextEntry ? (
        <PasswordContainer>
          <StyledInput
            isFocused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={COLORS.inputBoxText}
            secureTextEntry={!isPasswordVisible}
            {...props}
            style={{ flex: 1 }}
            selectionColor={COLORS.primary + "80"}
            cursorColor={COLORS.primary}
          />
          <PasswordVisibilityButton onPress={togglePasswordVisibility}>
            <Eye isPasswordVisible={isPasswordVisible} />
          </PasswordVisibilityButton>
        </PasswordContainer>
      ) : (
        <StyledInput
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={COLORS.inputBoxText}
          selectionColor={COLORS.primary + "80"}
          cursorColor={COLORS.primary}
          {...props}
        />
      )}

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;
