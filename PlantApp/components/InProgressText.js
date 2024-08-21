import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

export default function InProgressText(props) {

  return (
    <View style={styles.ComponentContainer}>

        <Text style={GlobalStyles.text}>Watering In Progess...</Text>

        <View style={styles.ActivityIndicator}>
            <ActivityIndicator size="xl" color="#0000ff" />
        </View>

    </View>
  );
}

styles = StyleSheet.create({

    ActivityIndicator: {
        marginTop: 20
    },



});