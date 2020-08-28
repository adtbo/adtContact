import React, { useEffect, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import styles from './contactList.style'

import { connect } from 'react-redux'
import { actions } from '../../redux/reducers/contactList/contactList.reducer'
import { actions as detailActions } from '../../redux/reducers/contactDetail/contactDetail.reducer'
import { Ionicons } from '@expo/vector-icons'
import { ListItem, Avatar, SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

export const ContactListScreen = props => {

  const {
    navigation,
    setContactId,
    getContacts,
    deleteContact,
    setSearch,
    contactList,
    searchString,
    error,
  } = props;

  useEffect(() => {
    async function fetchData() {
      await getContacts();
    }
    fetchData();
  },[])

  const onDelete = async (contactId) => {
    await deleteContact(contactId)
    await getContacts();
  }

  const seeContactDetail = async (contactId) => {
    await setContactId(contactId)
    navigation.navigate('detail')
  }
    
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='search contact...'
        onChangeText={setSearch}
        onClear={()=> setSearch('')}
        value={searchString}
        searchIcon={{name: 'search', color:'#E88C30', type: 'font-awesome'}}
        clearIcon={{name: 'times', type: 'font-awesome'}}
        cancelIcon = {false}
        containerStyle = {styles.searchCont}
        inputContainerStyle = {styles.searchInput}
      />
        <FlatList
          data={ contactList }
          renderItem={({ item }) => 
            <ListItem
              bottomDivider
              onPress = {()=>seeContactDetail(item.id)}
            >
              <Avatar
                title={item.firstName.charAt(0)+item.lastName.charAt(0)}
                rounded
                size='medium'
                source={{uri: item.photo}}
              />
              <ListItem.Content
                style={{flex: 3}}
              >
                <ListItem.Title>{item.firstName+" "+item.lastName}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                name={'trash'}
                color={'red'}
                type={'font-awesome'}
                size={20}
                containerStyle={{flex:1}}
                onPress={()=> {
                  Alert.alert(
                    "Delete Contact",
                    "are you sure tou want to delete this contact?",
                    [
                      {
                        text: "cancel",
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: async () => {
                          deleteContact(item.id)
                          await getContacts()
                        }
                      }
                    ]
                  )
                }}
              />
            </ListItem>
          }
          keyExtractor={item => item.id}
          
        />
        <View style={ styles.fabContainer }>
            <TouchableOpacity
            onPress = {()=>seeContactDetail('')}
            style={styles.fabButton}>
                <Ionicons name='ios-add' color='#fff' size={50} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const mapStateToProps = state => ({
  contactList: state.contactList.displayed,
  searchString: state.contactList.searchString,
  error: state.contactList.error,
});

const mapDispatchToProps = {
  getContacts: actions.fetchContactList,
  deleteContact: actions.deleteSelectedContact,
  setSearch: actions.setSearch,
  setContactId: detailActions.setContactId,
};

export default connect( mapStateToProps, mapDispatchToProps )(ContactListScreen);