import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { getParametric } from '../api'
import GraphSimulator from '../components/GraphSimulator'

const Simulator = () => {

    const [apf, setApf] = useState({})
    const [graph, setGraph] = useState(false)
    const [savingPlan, setSavingPlan] = useState({
        ammount: '',
        duration: '',
        value: ''
    })
    const [isError, setIsError] = useState(false)

    const [simulateGraph, setSimulateGraph] = useState({})

    const alertError = (data) => {
        const { ammount, duration, value } = data
        const { duracion, mma } = apf
        if (ammount < parseInt(mma) || duration < duracion) {
            Alert.alert('Error', 'Monto mínimo o Duración no permitida', [{ text: 'OK' }])
            setIsError(true)
            setGraph(false)
        }
        else if (ammount === null || ammount.trim() === '') {
            Alert.alert('Error', 'Campo Monto mínimo es obligatorio', [{ text: 'OK' }])
            setIsError(true)
            setGraph(false)
        }
        else if (duration === null || duration.trim() === '') {
            Alert.alert('Error', 'Campo Duracion es obligatorio', [{ text: 'OK' }])
            setIsError(true)
            setGraph(false)
        } else if (value === null || value.trim() === '') {
            Alert.alert('Error', 'Campo Ahorro mensual es obligatorio', [{ text: 'OK' }])
            setIsError(true)
            setGraph(false)
        }

    }
    const closeKeyboard = () => {
        Keyboard.dismiss();
    }

    const loadApf = async () => {
        const data = await getParametric();
        const resp = await data[0]
        setApf({ id: resp.id, duracion: resp.dur_plan_min, mma: resp.mont_min_apert, tasa_min: resp.tasa_int_min, tasa_base: resp.tasa_int_base, tasa_max: resp.tasa_int_max });
    }

    useEffect(() => {
        loadApf();

    }, [])


    const handleSubmit = () => {
        try {
            alertError(savingPlan);
            if (!isError) {
                const resp = calculatedInterest(savingPlan, apf)
                setSimulateGraph(resp);
                setGraph(true)
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
        totalInverst = valueTotal + ammountInt + parseFloat(ammount)
        result = { totalAmmount: totalInverst, interest: ammountInt, inverst: valueTotal, tasa_int: tasa }
        return result
    }
    const handleChange = (name, value) => {
        setSavingPlan({ ...savingPlan, [name]: value })
        setGraph(false)
        //setSavingPlanAho({})
    }

    const { duracion, mma } = apf

    return (
        <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
            <ScrollView>
                <View >
                    <View>
                        <Text>Nota: Parametrización Banco</Text>
                        <Text>Monto mínimo de apertura ${mma}</Text>
                        <Text>Duración mínima de plan de ahorro {duracion} meses</Text>
                    </View>
                    <View style={{ textAlign: 'center', alignItems: 'center' }}>
                        <View style={styles.formImg}>
                            <Image style={styles.img} source={require('../img/calculadora.png')} />
                        </View>
                        <Text>Ingrese datos para simulación</Text>
                    </View>

                    <View style={{ paddingLeft: 20 }}>


                        <View>
                            <Text style={styles.label}>Cuanto quisiera ahorrar mensualmente</Text>
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
                            <Text style={styles.label}>Durante cuantos meses desea ahorrar</Text>
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
                            <Text style={styles.label}>Con cuanto capital desea iniciar</Text>
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
})