import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { StyledButton, ButtonText } from "./styles";

const Button = ({ title, onPress, secondary, disabled, loading, ...rest }) => {
  return (
    <StyledButton
      onPress={onPress}
      secondary={secondary}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.text} />
      ) : (
        <ButtonText secondary={secondary}>{title}</ButtonText>
      )}
    </StyledButton>
  );
};

export default Button;
