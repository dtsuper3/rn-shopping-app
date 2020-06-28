import React from "react";
import { Platform } from "react-native";
import {
    createStackNavigator,
    createAppContainer, createDrawerNavigator
} from "react-navigation";
import { ProductOverviewScreen } from "../screens/shop/product-overview";
import { COLORS } from "../constants/colors";
import { ProductDetailScreen } from "../screens/shop/product-detail";
import { NavigationEnum, DrawerNavigationEnum } from "../interface/Navigation";
import { CartScreen } from "../screens/shop/cart";
import { OrdersScreen } from "../screens/shop/orders";
import { Ionicons } from "@expo/vector-icons";
import { UserProductsScreen } from "../screens/user/user-products";
import { EditProductScreen } from "../screens/user/edit-product";


const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? COLORS.primary : ""
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerTintColor: Platform.OS === "android" ? "white" : COLORS.primary,
}

const ProductsNavigator = createStackNavigator(
    {
        [NavigationEnum.ProductOverview]: {
            screen: ProductOverviewScreen
        },
        [NavigationEnum.ProductDetail]: {
            screen: ProductDetailScreen
        },
        [NavigationEnum.Cart]: {
            screen: CartScreen
        },
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === "android" ? "md-create" : "ios-create"}
                    size={23}
                    color={drawerConfig.tintColor as string}
                />
            )
        },
        defaultNavigationOptions: defaultNavigationOptions,
    },
)

const OrdersNavigator = createStackNavigator(
    {
        [NavigationEnum.Order]: {
            screen: OrdersScreen
        },
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === "android" ? "md-list" : "ios-list"}
                    size={23}
                    color={drawerConfig.tintColor as string}
                />
            )
        },
        defaultNavigationOptions: defaultNavigationOptions
    }
)

const AdminNavigator = createStackNavigator(
    {
        [NavigationEnum.UserProducts]: {
            screen: UserProductsScreen
        },
        [NavigationEnum.EditProducts]: {
            screen: EditProductScreen
        },
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === "android" ? "md-create" : "ios-create"}
                    size={23}
                    color={drawerConfig.tintColor as string}
                />
            )
        },
        defaultNavigationOptions: defaultNavigationOptions
    }
)

const ShopNavigator = createDrawerNavigator(
    {
        [DrawerNavigationEnum.Products]: ProductsNavigator,
        [DrawerNavigationEnum.Orders]: OrdersNavigator,
        [DrawerNavigationEnum.Admin]: AdminNavigator,
    },
    {
        contentOptions: {
            activeTintColor: COLORS.primary
        }
    }
)
export default createAppContainer(ShopNavigator)


