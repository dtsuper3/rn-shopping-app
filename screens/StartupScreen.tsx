import React, { useEffect } from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from "react-native";
import { COLORS } from "../constants/colors";
import * as AuthInterface from "../interface/Auth";
import { NavigationContainerProps } from "react-navigation";
import { RootNavigationEnum } from "../interface/Navigation";
import { useDispatch } from "react-redux";
import * as AuthAction from "../store/actions/auth";

interface IStartupScreen extends NavigationContainerProps { }

export const StartupScreen: React.FC<IStartupScreen> = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem(AuthInterface.STORAGE_KEY.userData);
            if (!userData) {
                props.navigation?.navigate(RootNavigationEnum.Auth);
                return;
            }
            const transformedData = JSON.parse(userData);
            // console.log("transformedData:-", transformedData)
            const { token, userId, expiryDate } = transformedData;
            if (expiryDate < Date.now() || !token || !userId) {
                props.navigation?.navigate(RootNavigationEnum.Auth);
                return;
            }
            const expirationTime = expiryDate - Date.now();
            props.navigation?.navigate(RootNavigationEnum.Shop);
            dispatch(AuthAction.authenticateUser(userId, token, expirationTime));
        };

        tryLogin();
    }, []);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})