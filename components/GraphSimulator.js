import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect,useState } from 'react'

const GraphSimulator = ({ savingPlan, apf }) => {

    const [savingPlanAho, setSavingPlanAho] = useState({
        totalAmmount: 0,
        interest: 0,
        inverst: 0
    })
    const getSavingPlan = () => {

    }

    const calculatedInterest = (savingPlan, apf) => {
        console.log(savingPlan)
        console.log(apf)
    }
    useEffect(() => {
        calculatedInterest(savingPlan, apf);
    }, [])

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