import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import styles from './contactDetail.style'
import { useForm, Controller } from 'react-hook-form';

import { connect } from 'react-redux'
import { actions } from '../../redux/reducers/contactDetail/contactDetail.reducer'
import { actions as listActions } from '../../redux/reducers/contactList/contactList.reducer'
import { Avatar, Input, Button, Accessory } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'

export const ContactDetailScreen = props => {

  const {
    contactId,
    contact,
    error,
    getContact,
    createContact,
    updateContact,
    resetContact,
    defaultValues,
    navigation,
    getContacts,
    setSearch,
  } = props;

  const { control, handleSubmit, errors, setValue, getValues} = useForm({
    reValidateMode: 'onChange',
    defaultValues: {...defaultValues}
  })

  useEffect(() => {

    async function fetchData() {
      setIsLoading(true);
      if(!contactId){
        resetContact();
        setEditable(true);
      }
      else{
        await getContact(contactId);
      }
      setIsLoading(false);
    }

    fetchData();
  },[])

  useEffect(()=>{
    if(contactId){
      setValue("firstName", contact.firstName)
      setValue("lastName", contact.lastName)
      setValue("age", contact.age ? contact.age.toString() : null)
      setValue("photo", contact.photo)
    }
  },[contact]);

  const [ editable, setEditable ] = useState(false);
  const [ isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if(contact.photo){
      data.photo = contact.photo;
    } else {
      data.photo = defaultValues.photo;
    }

    try {
      if(contactId){
        await updateContact(data, contactId);
      } else {
        await createContact(data);
      }
      await getContacts();
      await setSearch('');
      navigation.navigate('home')
    } catch (error){
      console.log(error.message)
    }
  }

  const urlRegex = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      <View style={styles.avaCont}>
        <Avatar
          icon={{name: 'user', color:'#E88C30', type: 'font-awesome'}}
          rounded
          size={200}
          source= {urlRegex.test(contact.photo) ? {uri: contact.photo} : null}
          overlayContainerStyle= { {backgroundColor: 'white'}}
        >
          {editable && <Accessory
            name={'pencil'}
            type={'font-awesome'}
            size={40}
          />}
        </Avatar>
      </View>
      <View style={styles.detailCont}>
        <ScrollView style={{width : '80%'}}>
        <Controller
          as ={ Input }
          control = { control }
          id = "firstName"
          name = "firstName"
          onChange ={ args => args[0].nativeEvent.text}
          disabled = {!editable}
          errorMessage = {errors.firstName ? errors.firstName.message : ''}
          errorStyle = {styles.errorStyle}
          value = {contact.firstName}
          label = 'First Name'
          labelStyle = {styles.labelStyle}
          rules = 
            {{
              required: {value: true, message: "first name can't be blank" },
              validate: (value) => value.trim() !== '' || "first name can't be blank",
              pattern: {value: /^[a-zA-Z0-9]*$/, message: "must only contain alphanumeric characters"},
              minLength: {value: 3, message: "must be at least 3 characters"}
            }}
        />
        <Controller
          as ={ Input }
          control = { control }
          id = "lastName"
          name = "lastName"
          onChange ={ args => args[0].nativeEvent.text}
          disabled = {!editable}
          errorMessage = {errors.lastName ? errors.lastName.message : ''}
          errorStyle = {styles.errorStyle}
          value = {contact.lastName}
          label = 'Last Name'
          labelStyle = {styles.labelStyle}
          rules = 
            {{
              required: {value: true, message: "last name can't be blank" },
              validate: (value) => value.trim() !== '' || "last name can't be blank",
              pattern: {value: /^[a-zA-Z0-9]*$/, message: "must only contain alphanumeric characters"},
              minLength: {value: 3, message: "must be at least 3 characters"}
            }}
        />
        <Controller
          as ={ Input }
          control = { control }
          id = "age"
          name = "age"
          onChange ={ args => args[0].nativeEvent.text}
          disabled = {!editable}
          errorMessage = {errors.age ? errors.age.message : ''}
          errorStyle = {styles.errorStyle}
          value = {contact.age}
          label = 'Age'
          labelStyle = {styles.labelStyle}
          keyboardType = 'numeric'
          rules = 
            {{
              required: {value: true, message: "age can't be blank" },
              validate: (value) => value.trim() !== '' || "age can't be blank",
              pattern: {value: /^[0-9]*$/, message: "must only contain number"},
              min : {value: 1, message: "age must be more than 0"}
            }}
        />
        <Button
          title = { editable ? "Save" : "Edit" }
          buttonStyle = { editable ? {backgroundColor :'#109121', borderRadius: 100} : {backgroundColor :'#E88C30', borderRadius: 100} }
          onPress = { editable ? handleSubmit(onSubmit) : () => setEditable(true) }
        />
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  contact: state.contactDetail.contact,
  error: state.contactDetail.error,
  contactId: state.contactDetail.contactId,
});

const mapDispatchToProps = {
  getContact: actions.fetchContact,
  updateContact: actions.updateContact,
  createContact: actions.createNewContact,
  resetContact: actions.resetContact,
  getContacts: listActions.fetchContactList,
  setSearch: listActions.setSearch,
};

ContactDetailScreen.defaultProps ={
  defaultValues:{
    firstName:'',
    lastName:'',
    age:'',
    photo:'https://www.digitaltveurope.com/files/2019/12/Baby-Yoda-Soup.jpg',
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ContactDetailScreen);