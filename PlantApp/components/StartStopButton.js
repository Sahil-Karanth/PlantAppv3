import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

export default function StartStopButton(props) {

    const handlePress = () => {

        if (props.timed && props.manualRunning) {
            alert("Cannot start manual mode while timed mode is running!");
            return;
        } else if (!props.timed && props.timedRunning) {
            alert("Cannot start timed mode while manual mode is running!");
            return;
        }


        // send to Pi

        response = true // replace with fetch request to server

        if (!response) {
            alert("Failed to send command to Pi");
            return;
        }


        // props.setIsStart(!props.isStart);

        if (props.isStart) {
            props.handleStop();
        } else {
            props.handleStart();
        }
    }

    const getText = () => {
        return props.isStart ? 'Stop' : 'Start';
    }
      
    const getBackgroundColor = () => {
        return props.isStart ? '#ff4747' : '#253CDA';
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