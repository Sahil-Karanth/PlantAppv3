import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function DaysDropdown(props) {

    const [selected, setSelected] = useState([]);
  
    const data = [
        { label: 'Monday', value: '1' },
        { label: 'Tuesday', value: '2' },
        { label: 'Wednesday', value: '3' },
        { label: 'Thursday', value: '4' },
        { label: 'Friday', value: '5' },
        { label: 'Saturday', value: '6' },
        { label: 'Sunday', value: '7' },
      ];
  
    return(

        <View style={{width: 300}}>
            
            <MultiSelect
                style={styles.dropdown}
                search={false}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Days"
                value={selected}
                onChange={item => {
                    setSelected(item);
                }}
                disable={props.DropdownDisabled}
            />

        </View>
    )

}

styles = StyleSheet.create({

    dropdown: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
    },

    placeholderStyle: {
        fontSize: 20,
    },


});