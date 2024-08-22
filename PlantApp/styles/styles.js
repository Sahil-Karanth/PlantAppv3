import { StyleSheet } from 'react-native';

export default GlobalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#caf797',
        alignItems: 'center',
        padding: 20
    },
    
    text: {
        color: 'black',
        fontSize: 20
    },

    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    }

});
