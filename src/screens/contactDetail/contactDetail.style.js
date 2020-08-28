import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avaCont:{
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor : '#E88C30'
    },
    labelStyle:{
        fontSize : 14,
        marginBottom : -6,
    },
    errorStyle:{
        fontSize : 10,
        color: 'red',
    },
    detailCont:{
        flex:3,
        alignItems: 'center',
        margin : 20,
        //borderWidth : 1,
    }
})