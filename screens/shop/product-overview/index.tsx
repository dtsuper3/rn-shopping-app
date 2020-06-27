import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { ReducerEnum } from '../../../interface/Redux';
import { RootState } from '../../../store/reducers';
import { ProductItem } from "../../../component/ProductItem";
import { NavigationContainerProps } from 'react-navigation';
import { NavigationEnum } from '../../../interface/Navigation';
import * as CartActions from "../../../store/actions/cart";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';

interface IProductOverviewScreen extends NavigationContainerProps {

}
export const ProductOverviewScreen: React.FC<IProductOverviewScreen> = (props) => {
    const products = useSelector((state: RootState) => state[ReducerEnum.product].availableProducts)
    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    price={itemData.item.price}
                    title={itemData.item.title}
                    onViewDetail={() => {
                        props.navigation?.navigate(NavigationEnum.ProductDetail,
                            {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            });
                    }}
                    onAddToCart={() => {
                        dispatch(CartActions.addToCart(itemData.item))
                    }} />
            )}
        />
    )
}

(ProductOverviewScreen as any).navigationOptions = (navData: any) => {
    return {
        headerTitle: "All Products",
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => { navData.navigation.navigate(NavigationEnum.Cart) }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({})
