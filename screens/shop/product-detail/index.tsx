import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from "../../../constants/colors"
import * as CartActions from '../../../store/actions/cart';
import * as ProductInterface from "../../../interface/Product";
import { notifyMessage } from '../../../component/Toast';

interface IProductDetailScreen extends NavigationContainerProps { }

export const ProductDetailScreen: React.FC<IProductDetailScreen> = (props) => {
    const productId = props.navigation?.getParam("productId");
    const selectedProduct = useSelector((state: RootState) => state.product.availableProducts.find(item => item.id === productId));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                source={{ uri: selectedProduct?.imageUrl }}
                style={styles.image} />
            <View style={styles.actions}>
                <Button
                    color={COLORS.primary}
                    title="Add to Cart"
                    onPress={() => {
                        notifyMessage("Added to cart")
                        dispatch(CartActions.addToCart(selectedProduct as ProductInterface.IProduct))
                    }} />
            </View>
            <Text style={styles.price}>{selectedProduct?.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct?.description}</Text>
        </ScrollView>
    )
}

(ProductDetailScreen as any).navigationOptions = (navData: any) => {
    return {
        headerTitle: navData.navigation.getParam("productTitle")
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    price: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20
    },
    description: {
        fontFamily: "open-sans",
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: "center"
    }
})
