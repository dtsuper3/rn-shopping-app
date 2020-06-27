import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { Platform } from "react-native";

interface ICustomHeaderButton {
    title: string;
}

export const CustomHeaderButton: React.FC<ICustomHeaderButton> = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === "android" ? "white" : COLORS.primary} />
    )
}