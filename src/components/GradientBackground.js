import { StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={["rgba(255, 82, 181, 0.1)", "rgba(255, 82, 181, 0)"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default GradientBackground;

// const styles = StyleSheet.create({});
