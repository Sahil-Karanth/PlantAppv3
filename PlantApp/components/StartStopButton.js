import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

export default function StartStopButton(props) {

    const handlePress = () => {
        props.setIsStart(!props.isStart);
        
    }

    const getText = () => {
        return props.isStart ? 'Stop' : 'Start';
    }
      
    const getBackgroundColor = () => {
        return props.isStart ? '#ff4747' : '#2f42ed';
    }
    
    const styles = StyleSheet.create({
    
        ComponentContainer: { 
            flex: 1,
            backgroundColor: '#caf797',
            alignItems: 'center',
            justifyContent: 'center',
        },
    
        Button: {
            backgroundColor: getBackgroundColor(),
            padding: 20,
            borderRadius: 5,
            marginTop: 20,
            
        },
    
        Text: {
          color: 'white',
          fontSize: 40
        }
      
    });

  return (
    <View>

        <TouchableOpacity style={[styles.Button]} onPress={handlePress}>
            <Text style={styles.Text} >{getText()}</Text>
        </TouchableOpacity>

    </View>
  );
}