import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 10, width: 400, height: 150, alignItems: 'center', paddingVertical: 20 }}>
                <Image
                    style={styles.banner}
                    source={require('../img/logo.jpg')} />
            </View>
            <View style={styles.containerOptions}>
                <Text style={styles.tittle}>¿Desea Simular su inversión?</Text>
                <TouchableOpacity style={styles.btnOptions}
                    onPress={() => navigation.navigate('Simulator')}
                >
                    <Text style={{ fontSize: 16, color: 'white' }}>Simulador</Text>
                </TouchableOpacity>
                <Text style={styles.tittle}>Mis Productos</Text>
                <TouchableOpacity style={styles.btnOptions}
                    onPress={() => navigation.navigate('Accounts')}
                >
                    <Text style={{ fontSize: 16, color: 'white' }} >Mis Cuentas</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 30, width: 300, height: 300, alignItems: 'center' }}>
                <Image
                    style={{ height: 200, width: 200 }}
                    source={require('../img/ahorro.png')} />
            </View>
        </View>

    )
};

export default HomeScreen

const styles = StyleSheet.create({
    containerImage: {
        alignItems: 'center',
        height: '20%'
    },
    containerOptions: {
        alignItems: 'center'
    },
    banner: {
        padding: 10,
        width: '80%',
        height: '80%',
        alignItems: 'center'
    },
    tittle: {
        fontSize: 20,
        color: 'black',
        fontweight: 'bold'
    },
    btnOptions: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#009C8C',
        borderRadius: 8
    }
})