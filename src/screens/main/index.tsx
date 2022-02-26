import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { MainBottomTabParamList } from './MainBottomTabParams';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

function MainScreen() {
  return (
    <BottomTab.Navigator
    
    screenOptions={{
      tabBarActiveTintColor: '#01d167',
      tabBarInactiveTintColor:'#d2d2d2',
      //tabBarActiveBackgroundColor:"#d2d2d2"
    }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({ focused}) => (
          <Icon name="home" size={25} color={focused? '#01d167' : '#d2d2d2'}  />
        )
      }} />
      <BottomTab.Screen name="DebitCard" component={HomeScreen} options={{
        headerShown: false, tabBarLabel:'Debit Card' ,
        tabBarIcon: ({focused}) => (
          <Icon name="credit-card-alt" size={20} color={focused? '#01d167' : '#d2d2d2'} />
        )
      }} />
      <BottomTab.Screen name="Payments" component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({ focused }) => (
          <MaterialIcon name="transfer" size={25} color={focused? '#01d167' : '#d2d2d2'} />
        )
      }} />
      <BottomTab.Screen name="Credit" component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({  focused}) => (
          <MaterialIcon name="arrow-up-circle" size={25} color={focused? '#01d167' : '#d2d2d2'} />
        )
      }} />
      <BottomTab.Screen name="Profile" component={HomeScreen} options={{
        headerShown: false, tabBarIcon: ({ focused }) => (
          <Icon name="user" size={25} color={focused? '#01d167' : '#d2d2d2'} />
        )
      }} />
    </BottomTab.Navigator>
  );
}

export default MainScreen;