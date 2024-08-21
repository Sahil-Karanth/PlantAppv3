import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from './styles/styles';
import React from 'react';

// component imports
import ToggleSwitch from './components/ToggleSwitch';

export default function App() {
  return (
    <View style={GlobalStyles.container}>

      <ToggleSwitch />

    </View>
  );
}