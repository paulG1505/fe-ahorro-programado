import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ProgressChart } from "react-native-chart-kit";

const GraphSimulator = ({ simulateGraph }) => {

    const screenWidth = Dimensions.get('window').width
    const [showGraph, setShowGraph] = useState(false)
    const [data, setData] = useState({})

    const calcPorcentGraph = (simulateGraph) => {
        let { totalAmmount, inverst, interest } = simulateGraph
        const percent = parseFloat(totalAmmount) + parseFloat(inverst) + parseFloat(interest)
        totalAmmount = totalAmmount / percent;
        inverst = inverst / percent;
        interest = interest / percent;
        totalAmmount = (Math.round(totalAmmount * 10) / 10) + 0.1
        inverst = (Math.round(inverst * 10) / 10)
        interest = (Math.round(interest * 10) / 10) + 0.1
        const valuePercent = { totalAmmount, inverst, interest }
        return valuePercent
    }

    useEffect(() => {
        const { interest, inverst, totalAmmount } = calcPorcentGraph(simulateGraph)
        const valueData = {
            labels: [`Interés Ganado`, "Ahorro S/N Int ", "Total Ahorrado"],
            data: [interest, inverst, totalAmmount]
        }
        setData(valueData)
        setShowGraph(true)
    }, [simulateGraph])
    return (

        <View style={{ alignItems: 'center' }}>

            <Text style={styles.title}>Simulación de Ahorro </Text>
            <View>

                {
                    showGraph ? <View>
                        <View style={styles.containerPlan}>
                            <Text style={styles.labelSim}>Monto Invertido:    ${parseFloat(simulateGraph.inverst).toFixed(2)}</Text>
                            <Text style={styles.labelSim}>Interés Ganado:      ${parseFloat(simulateGraph.interest).toFixed(2)} </Text>
                            <Text style={styles.labelSim}>Total Ganado:         ${parseFloat(simulateGraph.totalAmmount).toFixed(2)}</Text>

                        </View>

                        <ProgressChart
                            data={data}
                            width={screenWidth}
                            height={230}
                            radius={20}
                            chartConfig={chartConfig}
                            style={{ marginVertical: 8, borderRadius: 10 }}
                        />
                    </View>
                        :
                        <Text>Sin graph</Text>

                }
            </View>
            <TouchableHighlight style={styles.btnSubmit}
            >
                <Text style={styles.textSubmit}>Invertir en este Plan</Text>
            </TouchableHighlight>

        </View>
    )
}

export default GraphSimulator
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: 'green',
        marginVertical: 10
    },
    containerPlan: {
        backgroundColor: '#64c27b',
        borderBottomColor: 'e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 15
    },
    textSim: {
        fontSize: 16,
        marginTop: 6,
        fontWeight: 'bold',
    },
    labelSim: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
    },
    textSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
})
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    decimalPlaces: 2,
    style: {
        borderRadius: 18
    }
}