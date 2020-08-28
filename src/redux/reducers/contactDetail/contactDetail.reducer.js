import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';

import { getContact, editContact, createContact } from '../../../services/contact/contact.service';

// Constants

const SET_CONTACT = 'DETAIL/SET_CONTACT';
const GET_CONTACT = 'DETAIL/GET_CONTACT';
const EDIT_CONTACT = 'DETAIL/EDIT_CONTACT';
const CREATE_CONTACT = 'DETAIL/CREATE_CONTACT';
const RESET_CONTACT = 'DETAIL/RESET_CONTACT';

export const actionTypes = {
    SET_CONTACT,
    GET_CONTACT,
    EDIT_CONTACT,
    CREATE_CONTACT,
    RESET_CONTACT
};

// Actions

export const setContactId = createAction(SET_CONTACT, contactId => Promise.resolve(contactId));
export const fetchContact = createAction(GET_CONTACT, getContact);
export const updateContact = createAction(EDIT_CONTACT, editContact);
export const createNewContact = createAction(CREATE_CONTACT, createContact);
export const resetContact = createAction(RESET_CONTACT);

export const actions = {
    setContactId,
    fetchContact,
    updateContact,
    createNewContact,
    resetContact,
};

// Reducer

// Initial State

export const initialState = {
    contactId: '',
    contact: {},
    error: {
        status: false,
        message: '',
    },
}

const setContactHandler = (state, action) => {
    return {
        ...state,
        contactId: action.payload
    }
}

const getAndUpdateContactHandler = (state, action) => {
    return {
        ...state,
        contact: action.payload.data
    }
};

const createContactHandler = (state, action) => {
    return {
        ...state,
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

const resetContactHandler = (state) => {
    return {
        ...state,
        ...initialState
    }
}

// type to reducers
export default typeToReducer({
    [SET_CONTACT]:{
        FULFILLED: setContactHandler
    },
    [GET_CONTACT]: {
        FULFILLED: getAndUpdateContactHandler,
        REJECTED: errorHandler
    },
    [EDIT_CONTACT]:{
        FULFILLED: getAndUpdateContactHandler,
        REJECTED: errorHandler
    },
    [CREATE_CONTACT]:{
        FULFILLED: createContactHandler,
        REJECTED: errorHandler
    },
    [RESET_CONTACT]: resetContactHandler
}, initialState);