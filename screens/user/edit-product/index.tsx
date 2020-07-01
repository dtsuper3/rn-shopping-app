import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Platform,
    Alert,
    KeyboardAvoidingView
} from 'react-native'
import { NavigationContainerProps, NavigationRouteConfig } from 'react-navigation'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CustomHeaderButton } from '../../../component/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/reducers'
import * as ProductAction from '../../../store/actions/product';
import { notifyMessage } from '../../../component/Toast'
import { Input } from '../../../component/Input'

interface IEditProductScreen extends NavigationContainerProps { }

enum FormReducerType {
    FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

enum FormInputEnum {
    title = "title",
    imageUrl = "imageUrl",
    description = "description",
    price = "price"
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

    const handleInputChange = useCallback((inputIdentifier: FormInputType, inputValue: string, inputValidity: boolean) => {
        dispatchFormState({
            type: FormReducerType.FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            inputId: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={10}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        name={FormInputEnum.title}
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={handleInputChange}
                        inititalValue={editedProduct ? editedProduct.title : ""}
                        inititallyValid={!!editedProduct}
                        required />

                    <Input
                        name={FormInputEnum.imageUrl}
                        label="Image URL"
                        errorText="Please enter a valid image URL!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={handleInputChange}
                        inititalValue={editedProduct ? editedProduct.imageUrl : ""}
                        inititallyValid={!!editedProduct}
                        required />

                    {
                        !editedProduct &&
                        <Input
                            name={FormInputEnum.price}
                            label="Price"
                            errorText="Please enter a valid price!"
                            onInputChange={handleInputChange}
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            required
                            min={0.1} />
                    }

                    <Input
                        name={FormInputEnum.description}
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={handleInputChange}
                        inititalValue={editedProduct ? editedProduct.description : ""}
                        inititallyValid={!!editedProduct}
                        required
                        minLength={5} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
})
