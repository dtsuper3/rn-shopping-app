import React from 'react'
import { StyleSheet, FlatList, Platform, Button, Alert, View, Text } from 'react-native'
import { ProductItem } from "../../../component/ProductItem";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { NavigationContainerProps, NavigationRouteConfig } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';
import { COLORS } from '../../../constants/colors';
import * as ProductAction from "../../../store/actions/product";
import { NavigationEnum } from '../../../interface/Navigation';

interface IUserProductsScreen extends NavigationContainerProps {

}
export const UserProductsScreen: React.FC<IUserProductsScreen> = (props) => {
    const userProducts = useSelector((state: RootState) => state.product.userProducts);
    const dispatch = useDispatch();

    const handleEditProduct = (id: string) => {
        props.navigation?.navigate(NavigationEnum.EditProducts, { productId: id });
    }

    const handleDelete = (id: string) => {
        Alert.alert("Are your sure?", "Do you really want to delete this items?", [
            { text: "No", style: "default", },
            {
                text: "Yes", style: "destructive", onPress: () => {
                    dispatch(ProductAction.deleteProduct(id))
                }
            }
        ])
    }

    if (userProducts.length === 0) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No products found, maybe start creating some?</Text>
        </View>
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    title={itemData.item.title}
                    imageUrl={itemData.item.imageUrl}
                    price={itemData.item.price}
                    onSelect={() => { handleEditProduct(itemData.item.id) }}
                >
                    <Button
                        color={COLORS.primary}
                        title="Edit"
                        onPress={() => { handleEditProduct(itemData.item.id) }} />
                    <Button
                        color={COLORS.primary}
                        title="Delete"
                        onPress={() => handleDelete(itemData.item.id)} />
                </ProductItem>
            )}
        />
    )
}

(UserProductsScreen as any).navigationOptions = (navData: NavigationContainerProps): NavigationRouteConfig => {
    return {
        headerTitle: "Your Products",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => { navData.navigation?.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
                onPress={() => { navData.navigation?.navigate(NavigationEnum.EditProducts) }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({})
