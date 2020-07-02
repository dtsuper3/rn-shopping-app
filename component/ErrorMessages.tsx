import React from 'react'
import { View, StyleSheet } from 'react-native'

interface IErrorMessage { }

export const ErrorMessage: React.FC<IErrorMessage> = (props) => {
    return (
        <View style={styles.centered}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})