// import { Dimensions } from "react-native";
import { useWindowDimensions } from "react-native";

export const COLORS = {
  primary: "#FF52B5",
  background: "#121212",
  mainText: "#9C9C9C",
  text: "#FFFFFF",
  lightText: "#CCCCCC",
  success: "#4CAF50",
  grayBorder: "#535353",
  inputBoxText: "#616161",
  buttonText1: "#480537",
};

export const SIZES = {
  // width: Dimensions.get("window").width,
  // height: Dimensions.get("windows").height,
  padding: 16,
  margin: 16,
  radius: 8,
};

export const FONTS = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  bold: "Inter_700Bold",
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
