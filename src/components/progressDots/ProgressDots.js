import React from "react";
import { DotsContainer, Dot } from "./styles";

const ProgressDots = ({ totalSteps, currentStep }) => {
  return (
    <DotsContainer currentStep={currentStep}>
      {[...Array(totalSteps)].map((_, index) => (
        <Dot
          key={index}
          active={index === currentStep}
          completed={index < currentStep}
        />
      ))}
    </DotsContainer>
  );
};

export default ProgressDots;
