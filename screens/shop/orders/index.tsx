import React from 'react'
import { Text, FlatList, Platform } from 'react-native'
import { useSelector } from "react-redux";
import { RootState } from '../../../store/reducers';
import { NavigationContainerProps } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';
import { OrderItem } from '../../../component/OrderItem';

interface IOrdersScreen {

}
export const OrdersScreen: React.FC<IOrdersScreen> = (props) => {
    const orders = useSelector((state: RootState) => state.order.orders);
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmont}
                    date={itemData.item.date}
                    items={itemData.item.items}
                />
            )}
        />
    )
}

(OrdersScreen as any).navigationOptions = (navData: NavigationContainerProps) => {
    return {
        headerTitle: "Your Orders",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => { navData.navigation?.toggleDrawer() }} />
        </HeaderButtons>,
    }
}
