import React, { useReducer, useState, useCallback, useEffect } from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    Text,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../../component/Card";
import { Input } from "../../../component/Input";
import { COLORS } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as AuthAction from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { NavigationContainerProps } from "react-navigation";
import { RootNavigationEnum } from "../../../interface/Navigation";

enum FormReducerType {
    FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

enum FormInputEnum {
    email = "email",
    password = "password"
}
type FormInputType = "email" | "password"

interface IFormReducerState {
    inputValues: {
        [key in FormInputEnum]: string
    },
    inputValidities: {
        [key in FormInputEnum]: boolean
    },
    formIsValid: boolean
}

interface IFormInputChangeAction {
    type: FormReducerType.FORM_INPUT_UPDATE,
    value: string,
    isValid: boolean,
    inputId: FormInputType
}

type FormAction = IFormInputChangeAction

const formReducer = (state: IFormReducerState, action: FormAction): IFormReducerState => {
    if (action.type === FormReducerType.FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value
        };
        const updateValidities: any = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        }
        let isFormValid = true;
        for (const key in updateValidities) {
            isFormValid = isFormValid && updateValidities[key];
        }
        return {
            inputValues: updatedValues,
            inputValidities: updateValidities,
            formIsValid: isFormValid
        };

    }
    return state;


}
interface IAuthScreen extends NavigationContainerProps {

}
export const AuthScreen: React.FC<IAuthScreen> = (props) => {
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: ""
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert("An error Occurred!",
                error,
                [{ text: "okay", onPress: () => setError(undefined) }]
            )
        }
    }, [error])
    const authHanlder = async () => {
        const { email, password } = formState.inputValues;
        let action;
        if (isSignup) {
            action = AuthAction.signup(email, password)
        } else {
            action = AuthAction.login(email, password)
        }
        setError(undefined)
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation?.navigate(RootNavigationEnum.Shop);

        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    const handleInputChange = useCallback((inputIdentifier: FormInputType, inputValue: string, inputValidity: boolean) => {
        dispatchFormState({
            type: FormReducerType.FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            inputId: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="height">
            <LinearGradient colors={[COLORS.primary, COLORS.accent]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            name="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={handleInputChange}
                            inititalValue={formState.inputValues.email}
                        />
                        <Input
                            name="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            onInputChange={handleInputChange}
                            inititalValue={formState.inputValues.password}
                            password
                        />
                        <View style={styles.btnContainer}>
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                    :
                                    <Button
                                        title={isSignup ? "Sign Up" : "Login"}
                                        color={COLORS.success}
                                        onPress={authHanlder} />
                            }
                        </View>

                        <View style={styles.link}>
                            <TouchableOpacity onPress={() => {
                                setIsSignup(prevState => !prevState);
                            }}>
                                <Text style={styles.text}>{isSignup ? "Login" : "Sign Up"}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView >
    )
}

(AuthScreen as any).navigationOptions = {
    headerTitle: "Shopping App"
}
const styles = StyleSheet.create({
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20

    },
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        marginTop: 10
    },
    link: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        fontFamily: "open-sans",
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: COLORS.accent
    }
});