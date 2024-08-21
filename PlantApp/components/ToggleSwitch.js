import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Switch } from 'react-native-switch';
import styles from '../styles/styles';

export default function ToggleSwitch(props) {

  return (
    <View style={styles.toggleSwitch}>
      <Switch
        value={props.isManualPage}
        onValueChange={(value) => props.setIsManualPage(value)}
        activeText={'Manual'}
        inActiveText={'Timed'}
        circleSize={50} // Increase for larger circle
        barHeight={50} // Increase for taller bar
        circleBorderWidth={3}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
        changeValueImmediately={true}
        switchLeftPx={5}
        switchRightPx={5}
        switchWidthMultiplier={2.5} // Increase for wider switch
        switchBorderRadius={20} // Adjust for rounded edges
        activeTextStyle={{ fontSize: 20 }}
        inactiveTextStyle={{ fontSize: 20 }}
      />
    </View>
  );
}