import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

// components
import InProgressText from './InProgressText';
import DaysDropdown from './DaysDropdown';
import StartStopButton from './StartStopButton';

export default function TimedContent(props) {

  const [isStart, setIsStart] = useState(false)

  return (
    <View style={styles.ComponentContainer}>

      <DaysDropdown />

      {isStart ? <InProgressText /> : null}
      <StartStopButton
        isStart={isStart}
        setIsStart={setIsStart}
        timed={true}
        closeDropdown={() => {}}
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