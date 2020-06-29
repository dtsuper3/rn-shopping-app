import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { ReducerEnum } from '../../../interface/Redux';
import { RootState } from '../../../store/reducers';
import { ProductItem } from "../../../component/ProductItem";
import { NavigationContainerProps, NavigationRouteConfig } from 'react-navigation';
import { NavigationEnum } from '../../../interface/Navigation';
import * as CartActions from "../../../store/actions/cart";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';
import { COLORS } from '../../../constants/colors';
import { notifyMessage } from '../../../component/Toast';

interface IProductOverviewScreen extends NavigationContainerProps {

}
export const ProductOverviewScreen: React.FC<IProductOverviewScreen> = (props) => {
    const products = useSelector((state: RootState) => state[ReducerEnum.product].availableProducts)
    const dispatch = useDispatch();

    const handleSelectItem = (id: string, title: string) => {
        props.navigation?.navigate(NavigationEnum.ProductDetail,
            {
                productId: id,
                productTitle: title
            });
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
