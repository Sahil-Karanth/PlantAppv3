import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

headerOptions = {
  
  headerLeft: () => (
    <TouchableOpacity>
      <Ionicons name="menu" size={40} color="black" />  
    </TouchableOpacity>
  ),

  headerRight: () => (
    <TouchableOpacity>
      <Ionicons name="search" size={40} color="black" />
    </TouchableOpacity>
  ),

  // center header Title
  headerTitleAlign: 'center',

}

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={headerOptions} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}