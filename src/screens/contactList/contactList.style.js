import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contactItem:{
        flex:1,
        flexDirection: 'row',
        margin: 10,
        padding: 4,
        alignItems: 'center'
    },
    searchInput:{
        borderRadius: 40,
        paddingHorizontal: 10
    },
    searchCont:{
    },
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    fabButton: {
        backgroundColor: '#E88C30',
        borderRadius: 35,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})