import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import Simulator from './screens/Simulator';
import Accounts from './screens/Accounts';
import CreateAccount from './screens/CreateAccount';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Bienvenido al Ahorro Programado',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#ffff' },

          })} />
        <Stack.Screen name="Simulator" component={Simulator}
          options={{
            title: 'Simulador de Ahorro',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#ffff' },
            headerTintColor: '#ffff'
          }}
        />
        <Stack.Screen name="Accounts" component={Accounts}
          options={{
            title: 'Mis Cuentas de Ahorro',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#ffff' },
            headerTintColor: '#ffff'
          }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount}
          options={{
            title: 'Datos Adicionales',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#ffff' },
            headerTintColor: '#ffff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
