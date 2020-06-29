import React, { useState, useEffect, useCallback } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform
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

export const EditProductScreen: React.FC<IEditProductScreen> = (props) => {
    const prodId = props.navigation?.getParam("productId");
    const editedProduct = useSelector((state: RootState) => state.product.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "");
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : "");
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");
    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        if (editedProduct) {
            dispatch(ProductAction.updateProduct(editedProduct.id, {
                title,
                description,
                imageUrl
            }))
            notifyMessage("Update Successfully")
        } else {
            dispatch(ProductAction.createProduct({
                title,
                description,
                imageUrl,
                price: parseFloat(price.toString())
            }))
            notifyMessage("Added Successfully")
        }
        props.navigation?.goBack()
    }, [dispatch, title, imageUrl, description, price, prodId]);


    useEffect(() => {
        props.navigation?.setParams({ submit: handleSubmit })
    }, [handleSubmit])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)} />
                </View>
                {
                    !editedProduct &&
                    <View style={styles.formControl}>
                        <Text style={styles.lablel}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price.toString()}
                            onChangeText={text => setPrice(text)} />
                    </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.lablel}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)} />
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
