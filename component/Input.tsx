import React, { useReducer, useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps
} from "react-native";
import { emailValidator } from "../helpers";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface IInput extends TextInputProps {
    name: string;
    label: string;
    errorText: string;
    inititalValue?: string;
    inititallyValid?: boolean;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    onInputChange: any;
    password?: boolean;
}

interface IInputReducer {
    value: string | undefined;
    isValid: boolean | undefined;
    touched: boolean;
}

enum InputEnum {
    INPUT_CHANGE = "INPUT_CHANGE",
    INPUT_BLUR = "INPUT_BLUR"
}

interface IInputChangeAction {
    type: InputEnum.INPUT_CHANGE;
    value: string;
    isValid: boolean;
}

interface IInputBlurAction {
    type: InputEnum.INPUT_BLUR;
}

type InputAction = IInputChangeAction | IInputBlurAction;

const inputReducer = (state: IInputReducer, action: InputAction): IInputReducer => {
    switch (action.type) {
        case InputEnum.INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case InputEnum.INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

export const Input: React.FC<IInput> = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.inititalValue,
        isValid: props.inititallyValid,
        touched: false
    })
    const [icon, setIcon] = useState("md-eye-off")
    const [hidePassword, setHidePassword] = useState(true)

    const { onInputChange, name } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange(name, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, name])

    const handleInputChange = (text: string) => {
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailValidator(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min !== null && props.min !== undefined && +text < props.min) {
            isValid = false;
        }
        if (props.max !== null && props.max !== undefined && +text < props.max) {
            isValid = false;
        }
        if (props.minLength !== null && props.minLength !== undefined && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: InputEnum.INPUT_CHANGE, value: text, isValid: isValid })
    }

    const handleFocus = () => {
        dispatch({ type: InputEnum.INPUT_BLUR })
    }

    const changeIcon = useCallback(() => {
        icon !== "md-eye-off"
            ? (setIcon("md-eye-off"), setHidePassword(false))
            : (setIcon("md-eye"), setHidePassword(true))
    }, [props.password, hidePassword, icon])

    return (
        <View style={styles.formControl}>
            <Text style={styles.lablel}>{props.label}</Text>
            <View style={styles.passwordViewContainer}>
                <TextInput
                    {...props}
                    style={styles.input}
                    value={inputState.value}
                    onChangeText={handleInputChange}
                    onBlur={handleFocus}
                    secureTextEntry={props.password && hidePassword} />
                {
                    props.password &&
                    <Ionicons style={styles.icon} color={COLORS.primary} name={icon} size={28} onPress={() => changeIcon()} />}
            </View>
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: "100%"
    },
    input: {
        fontFamily: "open-sans-bold",
        marginVertical: 8,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "100%"
    },
    lablel: {
        fontFamily: "open-sans-bold",
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: "open-sans",
        color: "red",
        fontSize: 14
    },
    passwordViewContainer: {
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        top: 20,
        right: 0,
        elevation: 5
    }
})