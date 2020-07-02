import React, { useEffect } from 'react'
import { Text, FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../store/reducers';
import { NavigationContainerProps } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../../component/HeaderButton';
import { OrderItem } from '../../../component/OrderItem';
import * as OrderAction from "../../../store/actions/order";
import { Loader } from '../../../component/Loader';

interface IOrdersScreen {

}
export const OrdersScreen: React.FC<IOrdersScreen> = (props) => {
    const { orders, isLoading } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(OrderAction.fetchOrderAction())
    }, [dispatch]);
    console.log("Order Screem=>", orders)

    if (isLoading) {
        return <Loader />
    }
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
