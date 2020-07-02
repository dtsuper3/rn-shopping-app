import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { COLORS } from '../constants/colors'

interface ILoader {

}

export const Loader: React.FC<ILoader> = () => {
    return (
        <View style={styles.centered}>
            <ActivityIndicator
                size="large"
                color={COLORS.primary}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})