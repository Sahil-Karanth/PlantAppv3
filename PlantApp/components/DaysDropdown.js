import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function DaysDropdown(props) {

    const [selected, setSelected] = useState([]);
  
    const data = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
      ];
  
    return(

        <View style={{width: 300}}>
            
            <MultiSelect
                style={styles.dropdown}
                search={false}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                selectedStyle={styles.selectedStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Days"
                value={selected}
                onChange={item => {
                    setSelected(item);
                    props.setDays(item);
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

    selectedStyle: {
        backgroundColor: 'white',
        borderRadius: 5

    },

    selectedTextStyle: {
        fontSize: 20,
        color: 'black',
        
    },


});