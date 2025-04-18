import React from "react";
import { ButtonContainer, ButtonText, IconContainer } from "./styles";

const SocialLoginButton = ({
  icon,
  title,
  onPress,
  backgroundColor,
  textColor,
  ...props
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      backgroundColor={backgroundColor}
      {...props}
    >
      <IconContainer>{icon}</IconContainer>
      <ButtonText textColor={textColor}>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default SocialLoginButton;
