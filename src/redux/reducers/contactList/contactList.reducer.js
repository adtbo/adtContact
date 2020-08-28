import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';

import { getContactList, deleteContact } from '../../../services/contact/contact.service';

// Constants

const GET_CONTACTS = 'LIST/GET_CONTACTS';
const DELETE_CONTACT = 'LIST/DELETE_CONTACT';
const SET_SEARCH = 'LIST/SET_SEARCH';

export const actionTypes = {
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_SEARCH,
};

// Actions

export const fetchContactList = createAction(GET_CONTACTS, getContactList);
export const deleteSelectedContact = createAction(DELETE_CONTACT, (contactId) => deleteContact(contactId));
export const setSearch = createAction(SET_SEARCH, (text) => Promise.resolve(text));

export const actions = {
    fetchContactList,
    deleteSelectedContact,
    setSearch,
};

// Reducer

// Initial State

export const initialState = {
    contacts: [],
    displayed: [],
    searchString: '',
    error: {
        status: false,
        message: '',
    },
}

const getContactsHandler = (state, action) => {
    
    const sortedContacts = action.payload.data.sort((a,b) => {
        let fa = (a.firstName+" "+a.lastName),
        fb = (b.firstName+" "+b.lastName);

        if(fa < fb) {
            return -1;
        }
        if(fa > fb){
            return 1;
        }
        else{
            return 0;
        }
    })

    return {
        ...state,
        contacts: sortedContacts,
        displayed: sortedContacts
    }
};

const errorHandler = (state, action) => {
    return {
        ...state,
        error:{
            status: true,
            message: action.payload.message
        }
    }
};

const setSearchHandler = (state, action) => {
    
    const filter = action.payload.toLowerCase();
    let newCon = [...state.contacts];
    let filteredContact = newCon.filter((data) => {
        return ((data.firstName+" "+data.lastName).toLowerCase()).indexOf(filter) >= 0;
    });
    
    return {
        ...state,
        displayed: filteredContact,
        searchString: action.payload,
    }
}

// type to reducers
export default typeToReducer({
    [GET_CONTACTS]: {
        FULFILLED: getContactsHandler,
        REJECTED: errorHandler
    },
    [SET_SEARCH]:{
        FULFILLED: setSearchHandler
    },
}, initialState);