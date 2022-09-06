import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()

    return (
        <>
            <View style={styles.containerImage}>
                <Image
                    style={styles.banner}
                    source={require('../img/logo.jpg')} />
            </View>
            <View style={styles.containerOptions}>
                <Text style={styles.tittle}>¿Desea Simular su inversión?</Text>
                <TouchableOpacity style={styles.btnOptions}
                    onPress={() => navigation.navigate('Simulator')}
                >
                    <Text>Simulador</Text>
                </TouchableOpacity>
                <Text style={styles.tittle}>Mis Productos</Text>
                <TouchableOpacity style={styles.btnOptions}
                    onPress={() => navigation.navigate('Accounts')}
                >
                    <Text>Mis Cuentas</Text>
                </TouchableOpacity>
            </View>
        </>

    )
};

export default HomeScreen

const styles = StyleSheet.create({
    containerImage: {
        alignItems: 'center',
        height:'20%'
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
    tittle:{
        fontSize:20,
        color: 'black',
        fontweight: 'bold'
    },
    btnOptions:{
        marginVertical:20,
        padding:10,
        backgroundColor: '#009C8C',
        borderRadius:8
    }
})