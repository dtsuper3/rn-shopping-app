import React, { useReducer } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps
} from "react-native";
import { emailValidator } from "../helpers";

interface IInput extends TextInputProps {
    label: string;
    errorText: string;
    inititalValue: string | number;
    inititallyValid: boolean;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number
}

interface IInputReducer {
    value: string | number;
    isValid: boolean;
    touched: boolean;
}

enum InputEnum {
    INPUT_CHANGE = "INPUT_CHANGE"
}

interface IInputChangeAction {
    type: InputEnum.INPUT_CHANGE;
    value: string;
}

const inputReducer = (state: IInputReducer, action: IInputChangeAction): IInputReducer => {
    switch (action.type) {
        case (InputEnum.INPUT_CHANGE){

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
        dispatch({ type: InputEnum.INPUT_CHANGE, value: text })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.lablel}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={props.}
                onChangeText={handleInputChange}
            />
            {!formState.inputValidities.title && <Text>{props.errorText}</Text>}
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
        borderBottomWidth: 1
    },
    lablel: {
        fontFamily: "open-sans-bold",
    }
})