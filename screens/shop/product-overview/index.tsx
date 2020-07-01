import React, { useEffect, useCallback } from 'react';
import {
    FlatList,
    Platform,
    Button,
    Text
    , View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { ReducerEnum } from '../../../interface/Redux';
import { RootState } from '../../../store/reducers';
import { ProductItem } from "../../../component/ProductItem";
import { NavigationContainerProps, NavigationRouteConfig } from 'react-navigation';
import { NavigationEnum } from '../../../interface/Navigation';
import * as CartActions from "../../../store/actions/cart";
import * as ProductActions from "../../../store/actions/product";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';
import { COLORS } from '../../../constants/colors';
import { notifyMessage } from '../../../component/Toast';

interface IProductOverviewScreen extends NavigationContainerProps {

}
export const ProductOverviewScreen: React.FC<IProductOverviewScreen> = (props) => {
    const { availableProducts: products, isLoading, dataExists } = useSelector((state: RootState) => state[ReducerEnum.product])
    const dispatch = useDispatch();

    const loadProducts = useCallback(() => {
        dispatch(ProductActions.fetchProducts())
    }, [dispatch])

    useEffect(() => {
        loadProducts
    }, [dispatch])

    useEffect(() => {
        const willFocusSub = props.navigation?.addListener("willFocus", loadProducts)
        return () => {
            willFocusSub?.remove()
        }
    }, [loadProducts])

    const handleSelectItem = (id: string, title: string) => {
        props.navigation?.navigate(NavigationEnum.ProductDetail,
            {
                productId: id,
                productTitle: title
            });
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No products found. Maybe start adding some!</Text>
        </View>
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    price={itemData.item.price}
                    title={itemData.item.title}
                    onSelect={() => handleSelectItem(itemData.item.id, itemData.item.title)}>
                    <Button
                        color={COLORS.primary}
                        title="View Details"
                        onPress={() => handleSelectItem(itemData.item.id, itemData.item.title)} />
                    <Button
                        color={COLORS.primary}
                        title="To Cart"
                        onPress={() => {
                            notifyMessage("Added to cart")
                            dispatch(CartActions.addToCart(itemData.item))
                        }} />
                </ProductItem>
            )}
        />
    )
}

(ProductOverviewScreen as any).navigationOptions = (navData: NavigationContainerProps): NavigationRouteConfig => {
    return {
        headerTitle: "All Products",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => { navData.navigation?.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => { navData.navigation?.navigate(NavigationEnum.Cart) }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
