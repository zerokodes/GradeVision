import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { ChevronLeftIcon, HeadsetIcon, BellIcon } from "./icon/Icon";
import { profile } from "../../assets/images";
import { COLORS, FONTS } from "../styles/globalStyles";

const Header = ({ showBackButton, subTitle, title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onBackPress}
          >
            <ChevronLeftIcon />
          </TouchableOpacity>
        )}
        <View style={styles.profileContainer}>
          <Image source={profile} style={styles.profileImage} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title},</Text>
            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          </View>
        </View>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <HeadsetIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 15,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
  },
  backButton: {
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 8,
    // padding: 10,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    color: COLORS.mainText,
    fontFamily: FONTS.bold,
  },
  subTitle: {
    fontSize: 12,
    color: "#FF72C0",
    fontFamily: FONTS.medium,
  },
  iconButton: {
    marginLeft: 16,
    backgroundColor: "#ff86cb20",
    padding: 10,
    borderRadius: 50,
  },
});

export default Header;
