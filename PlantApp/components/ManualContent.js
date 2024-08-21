import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

// components
import InProgressText from './InProgressText';


export default function ManualContent(props) {

  const [isStart, setIsStart] = useState(false)

  const getText = () => {
    return isStart ? 'Stop' : 'Start';
  }
  
  const getBackgroundColor = () => {
    return isStart ? '#ff4747' : '#2f42ed';
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
    <View style={styles.ComponentContainer}>

        {isStart ? <InProgressText /> : null}


        <TouchableOpacity style={[styles.Button]} onPress={() => setIsStart(!isStart)}>
            <Text style={styles.Text} >{getText()}</Text>
        </TouchableOpacity>

    </View>
  );
}

