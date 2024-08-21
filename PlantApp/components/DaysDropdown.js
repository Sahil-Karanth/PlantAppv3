import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/styles';

import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function DaysDropdown(props) {

    const [selected, setSelected] = React.useState([]);
  
    const data = [
        {key:'1', value:'Monday'},
        {key:'2', value:'Tuesday'},
        {key:'3', value:'Wednesday'},
        {key:'4', value:'Thursday'},
        {key:'5', value:'Friday'},
        {key:'6', value:'Saturday'},
        {key:'7', value:'Sunday'},
    ]
  
    return(

        <View style={{width: 300}}>
            <MultipleSelectList
                ref={props.ref}
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                label="Days"
                boxStyles={{backgroundColor: '#f0f0f0'}}
                dropdownStyles={{backgroundColor: '#f0f0f0'}}
            />
        </View>
    )

}