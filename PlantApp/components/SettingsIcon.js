import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsIcon(props) {

  return (
    <View style={GlobalStyles.container}>

      <Ionicons name="settings" size={30} color="black" />

    </View>
  );
}