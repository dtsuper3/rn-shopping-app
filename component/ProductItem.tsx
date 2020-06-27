import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'
import { COLORS } from "../constants/colors";
import * as ProductInterface from "../interface/Product";

export const ProductItem: React.FC<ProductInterface.IProductItem> = (props) => {

    const TouchableComponent: any = (Platform.OS === "android" && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: props.imageUrl }}
                                style={styles.image} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>{props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                color={COLORS.primary}
                                title="View Details"
                                onPress={props.onViewDetail} />
                            <Button
                                color={COLORS.primary}
                                title="To Cart"
                                onPress={props.onAddToCart} />
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: "hidden"
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: "open-sans-bold"
    },
    price: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 20
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 10
    }
})