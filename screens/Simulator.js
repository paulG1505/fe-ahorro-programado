import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import GraphSimulator from '../components/GraphSimulator'
import useFetchAPF from '../components/useFetchAPF'

const Simulator = () => {

    const [graph, setGraph] = useState(false)
    const { apf, isLoading } = useFetchAPF();

    const [savingPlan, setSavingPlan] = useState({
        ammount: '',
        duration: '',
        value: ''
    })

    const [simulateGraph, setSimulateGraph] = useState({})

    const alertError = (data) => {
        const { ammount, duration, value } = data
        const { duracion, mma } = apf
        let error = false;
        if (ammount < parseInt(mma) || duration < duracion) {
            error = true
            Alert.alert('Error', 'Monto mínimo o Duración no permitida', [{ text: 'OK' }])
            setGraph(false)
        }
        else if (ammount === null || ammount.trim() === '') {
            error = true
            Alert.alert('Error', 'Campo Monto mínimo es obligatorio', [{ text: 'OK' }])
            setGraph(false)
        }
        else if (duration === null || duration.trim() === '') {
            error = true
            Alert.alert('Error', 'Campo Duracion es obligatorio', [{ text: 'OK' }])
            setGraph(false)
        } else if (value === null || value.trim() === '') {
            error = true
            Alert.alert('Error', 'Campo Ahorro mensual es obligatorio', [{ text: 'OK' }])
            setGraph(false)
        }
        return error;
    }
    const closeKeyboard = () => {
        Keyboard.dismiss();
    }


    useEffect(() => {
        handleSubmit();
    }, [simulateGraph,graph])
    

    const handleSubmit = () => {
        try {
            const error = alertError(savingPlan);
            if (error === false) {
                console.log("Entra", graph)
                const resp = calculatedInterest(savingPlan, apf)
                console.log("RESP",resp);
                setSimulateGraph(resp);
                setGraph(true)
                console.log("SIMULACION",simulateGraph)
                console.log("GRAFICO",graph)
                console.log("fin", graph)

            }
        } catch (error) {
            console.error(error)
        }

    }
    const calculatedInterest = (savingPlan, apf) => {
        const { tasa_base, tasa_max, tasa_min } = apf
        const { duration, value, ammount } = savingPlan
        let tasa = 0
        let valueTotal = 0
        let ammountInt = 0
        let result = {}
        let totalInverst = 0
        if (duration < 6) {
            tasa = parseFloat(tasa_min)
            tasa = ((duration * tasa) / 12) / 100
        } else if (duration >= 6 && duration <= 12) {
            tasa = parseFloat(tasa_base)
            tasa = ((duration * tasa) / 12) / 100
        } else {
            tasa = parseFloat(tasa_max)
            tasa = ((duration * tasa) / 12) / 100
        }
        valueTotal = value * duration
        ammountInt = valueTotal * tasa
        totalInverst = valueTotal + ammountInt + ammount
        result = { totalAmmount: totalInverst, interest: ammountInt, inverst: valueTotal, tasa_int: tasa }
        return result
    }
    const handleChange = (name, value) => {
        setSavingPlan({ ...savingPlan, [name]: value })
        setGraph(false)
    }

    const { duracion, mma } = apf

    return (
        <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
            <ScrollView>
                <View >
                    {
                        isLoading ? <ActivityIndicator /> :
                            <View style={styles.containerNote}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.label1}>Parametrización Banco</Text>
                                </View>
                                <Text style={styles.label}>Monto mínimo de apertura: </Text>
                                <Text style={styles.text1}>${mma}</Text>
                                <Text style={styles.label}>Duración mínima de plan de ahorro: </Text>
                                <Text style={styles.text}>{duracion} meses</Text>
                            </View>
                    }
                    <View style={{ textAlign: 'center', alignItems: 'center' }}>
                        <View style={styles.formImg}>
                            <Image style={styles.img} source={require('../img/calculadora.png')} />
                        </View>
                        <Text>Ingrese datos para simulación</Text>
                    </View>

                    <View style={{ paddingLeft: 20 }}>


                        <View>
                            <Text style={styles.label}>¿Cuánto quisiera ahorrar mensualmente?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese el valor mensual para ahorro"
                                keyboardType='numeric'
                                maxLength={5}
                                placeholderTextColor='#576574'
                                onChangeText={(text) => handleChange('value', text.replace(/[^0-9]/g, ''))}
                                value={savingPlan.value}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>¿Durante cuántos meses desea ahorrar?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese cantidad de meses de ahorro"
                                keyboardType='numeric'
                                placeholderTextColor='#576574'
                                maxLength={3}
                                onChangeText={(text) => handleChange('duration', text.replace(/[^0-9]/g, ''))}
                                value={savingPlan.duration}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>¿Con cuánto capital desea iniciar?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese el valor de apertura"
                                keyboardType='numeric'
                                maxLength={5}
                                placeholderTextColor='#576574'
                                onChangeText={(text) => handleChange('ammount', text.replace(/[^0-9]/g, ''))}
                                value={savingPlan.ammount}
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSave}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textbtn}>Calcular</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        graph ? <GraphSimulator simulateGraph={simulateGraph} /> : <View></View>
                    }

                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Simulator

const styles = StyleSheet.create({
    form: {
        textAlign: 'center'
    },
    textbtn: {
        color: 'black',
        textAlign: 'center'
    },
    img: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    formImg: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignItems: 'center'
    },
    input: {
        width: '90%',
        fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 40,
        color: 'black',
        padding: 5,
        textAlign: 'center',
        borderRadius: 5
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15,
    },
    btnSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#10ac84',
        width: '90%'
    },
    containerNote: {
        backgroundColor: '#FFF',
        borderBottomColor: 'e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 15
    },
    text1: {
        fontSize: 14,
        marginTop: 6,
    },
    label1: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15,
    },
})