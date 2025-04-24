// import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../styles/globalStyles";

import {
  Check,
  EyeIcon,
  EyeOff,
  SmileIcon,
  House,
  BookOpenCheck,
  Goal,
  ChevronLeft,
  Headset,
  Bell,
} from "lucide-react-native";

export const Happy = () => {
  //   return <Ionicons name="happy-outline" size={50} color={COLORS.primary} />;
  return <SmileIcon color={COLORS.primary} size={80} strokeWidth={1.5} />;
};

export const Eye = ({ isPasswordVisible }) => {
  return isPasswordVisible ? (
    <EyeOff color={COLORS.primary} size={24} />
  ) : (
    <EyeIcon color={COLORS.primary} size={24} />
  );
};

export const CheckIcon = () => {
  return <Check color={COLORS.buttonText1} size={60} />;
};

export const HouseIcon = ({ color }) => {
  return <House color={color} size={24} strokeWidth={2.5} />;
};

export const GoalIcon = ({ color }) => {
  return <Goal color={color} size={24} strokeWidth={2.5} />;
};

export const BookOpenCheckIcon = ({ color }) => {
  return <BookOpenCheck color={color} size={24} strokeWidth={2.5} />;
};

export const ChevronLeftIcon = ({ color }) => {
  return <ChevronLeft color={color} size={24} strokeWidth={1.5} />;
};

export const HeadsetIcon = () => {
  return <Headset color={COLORS.primary} size={20} strokeWidth={2.5} />;
};

export const BellIcon = () => {
  return <Bell color={COLORS.primary} size={20} strokeWidth={2.5} />;
};

{
  /* <Ionicons
    name={isPasswordVisible ? "eye-off" : "eye"}
    size={24}
    color={COLORS.text}
  /> */
}
