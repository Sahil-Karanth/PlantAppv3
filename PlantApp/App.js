import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './screens/HomeScreen';

// modals
import SettingsModal from './components/SettingsModal';


const Stack = createNativeStackNavigator();


export default function App() {

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  
  headerOptions = {
    
    headerLeft: () => (
      <TouchableOpacity onPress={() => setSettingsModalOpen(!settingsModalOpen)} >
        <Ionicons name="settings" size={40} color="black" />  
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

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={headerOptions} />
      </Stack.Navigator>

      <SettingsModal modalOpen={settingsModalOpen} setModalOpen={setSettingsModalOpen} />

    </NavigationContainer>


  );
}