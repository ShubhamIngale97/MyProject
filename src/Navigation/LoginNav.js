import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { _GLOBAL_COLORS } from '../Styles/StylesConstants';
import Login from '../Pages/Login';

const Stack = createNativeStackNavigator()

function LoginNav(props) {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, contentStyle: { backgroundColor: _GLOBAL_COLORS.WHITE } }}>
            <Stack.Screen name='Login' component={Login} options={{ header: false }} />
        </Stack.Navigator>
    );
}

export default LoginNav;