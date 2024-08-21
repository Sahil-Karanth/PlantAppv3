import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

// components
import InProgressText from './InProgressText';
import StartStopButton from './StartStopButton';


export default function ManualContent(props) {

  const [isStart, setIsStart] = useState(false)

  const styles = StyleSheet.create({

    ComponentContainer: { 
        flex: 1,
        backgroundColor: '#caf797',
        alignItems: 'center',
        justifyContent: 'center',
    }
  
  });


  return (
    <View style={styles.ComponentContainer}>

        {isStart ? <InProgressText /> : null}
        <StartStopButton
          isStart={isStart}
          setIsStart={setIsStart}
          timed={false}
          handleStart={props.handleStart}
          handleStop={props.handleStop}
        />

    </View>
  );
}

