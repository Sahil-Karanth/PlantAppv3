import React from 'react';
import { useState } from 'react';

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';

// modals
import SettingsModal from './components/SettingsModal';


const Stack = createNativeStackNavigator();


export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Plant Watering" component={HomeScreen}/>
        <Stack.Screen name="Latest Image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}