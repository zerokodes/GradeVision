import { View, Text, Pressable } from "react-native";
import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "lucide-react-native";
import { COLORS } from "../styles/globalStyles";
import { useDispatch } from "react-redux";
import { prevStep } from "../redux/slices/onboardingSlice";

const BtnCircle = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff10;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const handleBack = () => {
  console.log("touch me");
  dispatch(prevStep());
};

const Prev = () => {
  const dispatch = useDispatch();
  return (
    <BtnCircle>
      <Pressable onPress={() => dispatch(prevStep())}>
        <ChevronLeft name="close" size={35} color={COLORS.primary} />
      </Pressable>
    </BtnCircle>
  );
};

export default Prev;
