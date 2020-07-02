import React from 'react'
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/reducers'
import { COLORS } from '../../../constants/colors'
import * as CartInterface from "../../../interface/Cart";
import { CartItem } from "../../../component/CartItem"
import * as CartAction from "../../../store/actions/cart";
import * as OrderAction from "../../../store/actions/order";
import { notifyMessage } from '../../../component/Toast'
import { isLoading } from 'expo-font'

interface ICartScreen { }

interface ITransformedCartItems extends CartInterface.ICartItem {
    productId: string;
}

export const CartScreen: React.FC<ICartScreen> = (props) => {
    const cartTotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const cartItems: ITransformedCartItems[] = useSelector((state: RootState) => {
        const transformedCartItems: ITransformedCartItems[] = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const isLoading = useSelector((state: RootState) => state.order.isLoading);
    const dispatch = useDispatch();

    const handleAddOrder = () => {
        dispatch(OrderAction.addOrder(cartItems, cartTotalAmount))
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>INR {Math.round(cartTotalAmount.toFixed(2) as any * 100) / 100}</Text>
                </Text>
                {
                    isLoading ?
                        <ActivityIndicator size="small" color={COLORS.primary} />
                        :
                        <Button
                            title="Order Now"
                            color={COLORS.accent}
                            onPress={handleAddOrder}
                            disabled={cartItems.length === 0} />
                }
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            notifyMessage("Removed from cart")
                            dispatch(CartAction.removeFromCart(itemData.item.productId))
                        }} />
                )}
            />
        </View>
    )
}

(CartScreen as any).navigation = {
    headerTitle: "Your Cart"
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    amount: {
        color: COLORS.primary
    },

})