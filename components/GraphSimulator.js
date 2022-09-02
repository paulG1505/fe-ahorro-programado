import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const GraphSimulator = ({ simulateGraph }) => {

    const navigation = useNavigation()
    
    useEffect(() => {
        console.log('En grafico')
        console.log(simulateGraph)
    }, [simulateGraph])

    return (
        <View>
            <Text>Grafico </Text>
            <TouchableHighlight style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text>Invertir en este Plan</Text>
            </TouchableHighlight>

        </View>
    )
}

export default GraphSimulator

const styles = StyleSheet.create({})