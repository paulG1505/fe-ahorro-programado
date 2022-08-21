import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Simulator = () => {
    const navigation = useNavigation()

    return (
        <View>
            <Text>Simulator</Text>

            <TouchableHighlight style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text>Invertir en este Plan</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Simulator

const styles = StyleSheet.create({})