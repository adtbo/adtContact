import axios from 'axios';
import { generateConfig, pathGenerator } from '../AppApi.service';

export const getContactList = async () => {
    return await axios.get(
        pathGenerator('/contact'),
        generateConfig({})
    ).then((res) => {
            //console.log(res.data);
            return res.data;
    }).catch((error) => {
        const formattedErrorData = {
            ...error.response.data,
            status: error.status,
        };

        throw formattedErrorData;
    });
};

export const getContact = async (contactId) => {
    return await axios.get(
        pathGenerator(`/contact/${contactId}`),
        generateConfig({})
    ).then((res) => {
        return res.data ;
    }).catch((error) => {
        const formattedErrorData = {
            ...error.response.data,
            status: error.status,
        };

        throw formattedErrorData;
    });
};

export const createContact = async (data) => {
    return await axios.post(
        pathGenerator(`/contact`),
        data,
        generateConfig({})
    ).then((res) => {
        return res.data ;
    }).catch((error) => {
        const formattedErrorData = {
            ...error.response.data,
            status: error.status,
        };

        throw formattedErrorData;
    });
};

export const deleteContact = async (contactId) => {
    return await axios.delete(
        pathGenerator(`/contact/${contactId}`),
        generateConfig({})
    ).then((res) => {
        return res.data ;
    }).catch((error) => {
        const formattedErrorData = {
            ...error.response.data,
            status: error.status,
        };

        throw formattedErrorData;
    });
};

export const editContact = async (data, contactId) => {
    return await axios.put(
        pathGenerator(`/contact/${contactId}`),
        data,
        generateConfig({})
    ).then((res) => {
        return res.data ;
    }).catch((error) => {
        const formattedErrorData = {
            ...error.response.data,
            status: error.status,
        };

        throw formattedErrorData;
    });
};