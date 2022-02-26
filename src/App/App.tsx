import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/main';
import AuthScreen from '../screens/auth';
import {RootStackParamList} from '../screens/RootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}