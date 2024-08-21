import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

// components
import ToggleSwitch from '../components/ToggleSwitch';
import ManualContent from '../components/ManualContent';
import TimedContent from '../components/TimedContent';

export default function HomeScreen(props) {

    const [isManualPage, setIsManualPage] = useState(true);

    return (
        <View style={GlobalStyles.container}>

            <ToggleSwitch
                isManualPage={isManualPage}
                setIsManualPage={setIsManualPage}
            />
            
            {isManualPage ? (
                <ManualContent />
            ) : (
                <TimedContent />
            )}

        </View>
  );
}