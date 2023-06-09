import React from "react";
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";


interface ICartItem {
    quantity: number;
    title: string
    amount: number
    onRemove?: any;
    deletable?: boolean
}
export const CartItem: React.FC<ICartItem> = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>INR {props.amount.toFixed(2)}</Text>
                {
                    props.deletable &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons
                            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                            size={23}
                            color={COLORS.danger} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center"
    },
    quantity: {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16
    },
    mainText: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
})

