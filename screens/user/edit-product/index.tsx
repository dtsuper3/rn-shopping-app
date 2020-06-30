import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Alert
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { NavigationContainerProps, NavigationRouteConfig } from 'react-navigation'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CustomHeaderButton } from '../../../component/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/reducers'
import * as ProductAction from '../../../store/actions/product';
import { notifyMessage } from '../../../component/Toast'

interface IEditProductScreen extends NavigationContainerProps { }

enum FormReducerType {
    FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

type FormInputType = "title" | "imageUrl" | "description" | "price";

interface IFormReducerState {
    inputValues: {
        title: string,
        imageUrl: string,
        description: string,
        price: string
    },
    inputValidities: {
        title: boolean,
        imageUrl: boolean,
        description: boolean,
        price: boolean
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

export const EditProductScreen: React.FC<IEditProductScreen> = (props) => {
    const prodId = props.navigation?.getParam("productId");
    const editedProduct = useSelector((state: RootState) => state.product.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: editedProduct ? editedProduct.description : ""
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const handleSubmit = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input!", "Please check the errors in the form.", [
                { text: "Okay" }
            ])
            return;
        }
        if (editedProduct) {
            dispatch(ProductAction.updateProduct(editedProduct.id, {
                title: formState.inputValues.title,
                description: formState.inputValues.description,
                imageUrl: formState.inputValues.imageUrl
            }))
            notifyMessage("Update Successfully")
        } else {
            dispatch(ProductAction.createProduct({
                title: formState.inputValues.title,
                description: formState.inputValues.description,
                imageUrl: formState.inputValues.imageUrl,
                price: +formState.inputValues.price
            }))
            notifyMessage("Added Successfully")
        }
        props.navigation?.goBack()
    }, [dispatch, formState]);


    useEffect(() => {
        props.navigation?.setParams({ submit: handleSubmit })
    }, [handleSubmit])

    const handleInputChange = (name: FormInputType, text: string) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: FormReducerType.FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            inputId: name
        });
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={text => handleInputChange("title", text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next" />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={text => handleInputChange("imageUrl", text)}
                    />
                </View>
                {
                    !editedProduct &&
                    <View style={styles.formControl}>
                        <Text style={styles.lablel}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.price.toString()}
                            onChangeText={text => handleInputChange("price", text)}
                            keyboardType="decimal-pad" />
                    </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={text => handleInputChange("description", text)} />
                </View>
            </View>
        </ScrollView>
    )
}

(EditProductScreen as any).navigationOptions = (navData: NavigationContainerProps): NavigationRouteConfig => {
    const submitFn = navData.navigation?.getParam("submit");
    return {
        headerTitle: navData.navigation?.getParam("productId") ? "Edit Product" : "Add Product",
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                onPress={submitFn} />
        </HeaderButtons>
    }
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
