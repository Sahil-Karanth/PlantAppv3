import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

// components
import InProgressText from './InProgressText';
import DaysDropdown from './DaysDropdown';
import StartStopButton from './StartStopButton';

export default function TimedContent(props) {

  return (
    <View style={styles.ComponentContainer}>

    <DaysDropdown DropdownDisabled={props.isStart} setDays={props.setDays} />

    {props.isStart ? <InProgressText /> : null}

    {props.startSignalSent ? <Text style={styles.SignalText}>Signal Sent</Text> : null}

    <StartStopButton
      isStart={props.isStart}
      setIsStart={props.setIsStart}
      timed={true}
      manualRunning={props.manualRunning}
      handleStart={props.handleStart}
      handleStop={props.handleStop}
    />

    </View>
  );
}

const styles = StyleSheet.create({

  ComponentContainer: { 
      flex: 1,
      backgroundColor: '#caf797',
      alignItems: 'center',
      justifyContent: 'space-evenly',
  }
  
});