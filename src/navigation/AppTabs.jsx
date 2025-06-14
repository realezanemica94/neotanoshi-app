// src/AppTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import AccountStack from '../navigation/AccountStack'; 

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          paddingVertical: 4,
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color }) => {
          let icon;
          switch (route.name) {
            case 'Inicio':
              icon = require('../assets/images/menu/home_1.png');
              break;
            case 'Explorar':
              icon = require('../assets/images/menu/explore.png');
              break;
            case 'Favoritos':
              icon = require('../assets/images/menu/favorite.png');
              break;
            case 'Cuenta':
              icon = require('../assets/images/menu/profile.png');
              break;
            default:
              icon = null;
          }
          return (
            <Image
              source={icon}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Explorar" component={ExploreScreen} />
      <Tab.Screen name="Favoritos" component={FavoriteScreen} />
      <Tab.Screen name="Cuenta" component={AccountStack} />
    </Tab.Navigator>
  );
}
