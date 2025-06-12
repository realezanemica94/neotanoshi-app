import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import AccountStack from './AccountStack'; 

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Explorar" component={ExploreScreen} />
      <Tab.Screen name="Favoritos" component={FavoriteScreen} />
      <Tab.Screen name="Cuenta" component={AccountStack} />
    </Tab.Navigator>
  );
}
