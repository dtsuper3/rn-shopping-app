import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ProductOverviewScreen } from "../screens/shop/product-overview";
import { COLORS } from "../constants/colors";
import { ProductDetailScreen } from "../screens/shop/product-detail";
import { NavigationEnum } from "../interface/Navigation";
import { CartScreen } from "../screens/shop/cart";

const ProductsNavigator = createStackNavigator({
    [NavigationEnum.ProductOverview]: {
        screen: ProductOverviewScreen
    },
    [NavigationEnum.ProductDetail]: {
        screen: ProductDetailScreen
    },
    [NavigationEnum.Cart]: {
        screen: CartScreen
    }
}, {
    defaultNavigationOptions: {
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
})

export default createAppContainer(ProductsNavigator)


