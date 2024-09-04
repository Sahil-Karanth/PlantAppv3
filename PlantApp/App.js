import React from 'react';
import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideApp = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={HomeScreen} />
      <InsideStack.Screen name="Latest Image" component={ImageScreen} />
    </InsideStack.Navigator>
  );
};





export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }
  , []);



  return (

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Plant Watering" component={HomeScreen}/>
    //     <Stack.Screen name="Latest Image" component={ImageScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Plant Watering" component={InsideApp} options={{headerShown: false}} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerTitleAlign: 'center'}} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} options={{headerTitleAlign: 'center'}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>


  );
}