import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const GraphSimulator = ({ simulateGraph }) => {

    const navigation = useNavigation()
    const screenWidth = Dimensions.get('window').width
    const [showGraph, setShowGraph] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        const { interest, inverst, totalAmmount } = calcPorcentGraph(simulateGraph)
        const valueData = {
            labels: [`Interés Ganado`, "Ahorro S/N Int ", "Total Ahorrado"],
            data: [interest, inverst, totalAmmount]
        }
        setData(valueData)
        setShowGraph(true)
    }, [])


    const calcPorcentGraph = (simulateGraph) => {
        let { totalAmmount, inverst, interest } = simulateGraph
        const percent = totalAmmount + inverst + interest
        totalAmmount = totalAmmount / percent;
        inverst = inverst / percent;
        interest = interest / percent;
        totalAmmount = (Math.round(totalAmmount * 10) / 10) + 0.1
        inverst = (Math.round(inverst * 10) / 10)
        interest = (Math.round(interest * 10) / 10) + 0.1
        const valuePercent = { totalAmmount, inverst, interest }
        return valuePercent
    }
    return (

        <View style={{alignItems: 'center'}}>
            
            <Text style={styles.title}>Simulación de Ahorro </Text>
            <View>
                {
                    showGraph ? <ProgressChart
                        data={data}
                        width={screenWidth}
                        height={230}
                        radius={20}
                        chartConfig={chartConfig}
                        style={{ marginVertical: 8, borderRadius: 10 }}
                    /> : <Text>Sin graph</Text>

                }

            </View>
            <TouchableHighlight style={styles.btnSubmit}
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.textSubmit}>Invertir en este Plan</Text>
            </TouchableHighlight>

        </View>
    )
}

export default GraphSimulator
const styles = StyleSheet.create({
    title: {
        fontWeight:'bold',
        fontSize:20
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: 'green',
        marginVertical: 10
    },
    textSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    decimalPlaces: 2,
    style:{
        borderRadius:18
    }
}