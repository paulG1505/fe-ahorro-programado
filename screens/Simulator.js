import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getParametric } from '../api'

const Simulator = () => {
    const navigation = useNavigation()

    const [apf, setApf] = useState({})
    const [savingPlan, setSavingPlan] = useState({
        montmin: '',
        duration: ''
    })
    const [isError, setIsError] = useState(false)

    const alertError = (data) => {
        const { montmin, duration } = data
        const { duracion, mma } = apf
        if (montmin < parseInt(mma) || duration < duracion) {
            Alert.alert('Error', 'Monto mínimo o Duración no permitida', [{ text: 'OK' }])
            setIsError(true)
        }
        if (montmin === null || montmin.trim() === '') {
            Alert.alert('Error', 'Campo Monto mínimo es obligatorio', [{ text: 'OK' }])
            setIsError(true)
        }
        if (duration === null || duration.trim() === '') {
            Alert.alert('Error', 'Campo Duracion es obligatorio', [{ text: 'OK' }])
            setIsError(true)
        }
    }
    const closeKeyboard = () => {
        Keyboard.dismiss();
    }

    const loadApf = async () => {
        const data = await getParametric();
        const resp = await data[0]
        setApf({ id: resp.id, duracion: resp.dur_plan_min, mma: resp.mont_min_apert });
    }
    useEffect(() => {
        loadApf();
    }, [])

    const handleSubmit = async () => {
        try {
            alertError(savingPlan);
            if (!isError) {
                console.log(savingPlan)
                console.log('SIN ERROR')
            }
            //     await updateTask(route.params.id, task);

        } catch (error) {
            console.error(error)
        }

    }
    const handleChange = (name, value) => setSavingPlan({ ...savingPlan, [name]: value })

    const { duracion, mma } = apf

    return (
        <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
            <View >
                <View>
                    <Text>Nota: Parametrización Banco 1</Text>
                    <Text>Monto mínimo de apertura ${mma}</Text>
                    <Text>Duración mínima de plan de ahorro {duracion} meses</Text>
                </View>
                <View style={{ textAlign: 'center', alignItems: 'center' }}>
                    <View style={styles.formImg}>
                        <Image style={styles.img} source={require('../img/calculadora.png')} />
                    </View>
                    <Text>Ingrese datos para simulación</Text>
                </View>
                <ScrollView>

                    <View>

                        <View>
                            <Text style={styles.label}>Con cuanto capital desea iniciar</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese el valor de apertura"
                                keyboardType='numeric'
                                maxLength={5}
                                placeholderTextColor='#576574'
                                onChangeText={(text) => handleChange('montmin', text)}
                                value={savingPlan.montmin}
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
                                onChangeText={(text) => handleChange('duration', text)}
                                value={savingPlan.duration}
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSave}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textbtn}>Calcular</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableHighlight style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
                        onPress={() => navigation.navigate('CreateAccount')}>
                        <Text>Invertir en este Plan</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
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