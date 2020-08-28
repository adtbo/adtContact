import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { pathGenerator, baseUrl } from '../AppApi.service';
import { getContactList, getContact, createContact, deleteContact, editContact } from './contact.service';


jest.useFakeTimers()

describe('getContact', () => {
    const contactId = "12345"
    test('should return Promise', () => {
        const mock = new MockAdapter(axios);

        mock.onGet(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        jest.spyOn(axios, 'get');
        expect(getContact(contactId).then).toBeDefined();
    });

    test('should call axios.get with correct args', () => {

        const mock = new MockAdapter(axios);

        mock.onGet(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        const axiosSpy = jest.spyOn(axios, 'get');

        return getContact(contactId)
            .then(() => {
                expect(axiosSpy).toHaveBeenCalled();
                expect(axios.get.mock.calls[0][0]).toEqual(`/contact/${contactId}`);
            });
    });

    test('should response with some data if it is success', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            firstName: 'test',
            lastName: 'test',
            age: 12,
            photo: 'linkphoto'
        }

        mock.onGet(pathGenerator(`/contact/${contactId}`)).reply(200, mockResponse);
        const axiosSpy = jest.spyOn(axios, 'get');

        return getContact(contactId)
            .then((response) => {

                expect(response).toEqual(mockResponse);
            });
    });

    test('should response with some error data if it is failed', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            "message": 'bad request',
        }

        mock.onGet(pathGenerator(`/contact/${contactId}`)).reply(400, mockResponse);
        jest.spyOn(axios, 'get');

        return getContact(contactId)
            .catch((response) => {
                const formattedErrorData = {
                    message: "bad request",
                    //...response.response.data
                    
                }
                expect(response).toEqual(formattedErrorData);
            });
    });
});

describe('getContactList', () => {
    test('should return Promise', () => {
        const mock = new MockAdapter(axios);

        mock.onGet(pathGenerator(`/contact`)).reply(200, 'success');
        jest.spyOn(axios, 'get');
        expect(getContactList().then).toBeDefined();
    });

    test('should call axios.get with correct args', () => {

        const mock = new MockAdapter(axios);

        mock.onGet(pathGenerator(`/contact`)).reply(200, 'success');
        const axiosSpy = jest.spyOn(axios, 'get');

        return getContactList()
            .then(() => {
                expect(axiosSpy).toHaveBeenCalled();
                //expect(axios.get.mock.calls[0][0]).toEqual(`/contact`);
            });
    });

    test('should response with some data if it is success', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = [{
            firstName: 'test',
            lastName: 'test',
            age: 12,
            photo: 'linkphoto'
        }]

        mock.onGet(pathGenerator(`/contact`)).reply(200, mockResponse);
        const axiosSpy = jest.spyOn(axios, 'get');

        return getContactList()
            .then((response) => {

                expect(response).toEqual(mockResponse);
            });
    });

    test('should response with some error data if it is failed', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            "message": 'bad request',
        }

        mock.onGet(pathGenerator(`/contact`)).reply(400, mockResponse);
        jest.spyOn(axios, 'get');

        return getContactList()
            .catch((response) => {
                const formattedErrorData = {
                    message: "bad request",
                    //...response.response.data
                    
                }
                expect(response).toEqual(formattedErrorData);
            });
    });
});

describe('postRecipe', () => {

    const ACCOUNT_RECIPE_URI = '/account';
    const ACCOUNT_RECIPE_URI_FULL = pathGenerator(ACCOUNT_RECIPE_URI)

    const body = {
        firstName: 'test',
        lastName: 'test',
        age: 12,
        photo: 'linkphoto'
    };

    test('should return Promise', () => {
        const mock = new MockAdapter(axios);

        mock.onPost(pathGenerator(ACCOUNT_RECIPE_URI)).reply(200, 'success');
        jest.spyOn(axios, 'post');
        expect(createContact(body).then).toBeDefined();
    });

    test('should call axios.post with correct args', () => {

        const mock = new MockAdapter(axios);

        mock.onPost(pathGenerator(`/contact`)).reply(200, 'success');
        const axiosSpy = jest.spyOn(axios, 'post');

        return createContact(body)
            .then(() => {
                expect(axiosSpy).toHaveBeenCalled();
                expect(axios.post.mock.calls[0][0]).toEqual(`/contact`);
            });
    });

    test('should response with some data if it is success', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            firstName: 'test',
            lastName: 'test',
            age: 12,
            photo: 'linkphoto'
        }

        mock.onPost(pathGenerator(`/contact`)).reply(200, mockResponse);
        const axiosSpy = jest.spyOn(axios, 'post');

        return createContact(body)
            .then((response) => {
                expect(response).toEqual(mockResponse);
            });
    });

    test('should response with some error data if it is failed', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            "message": 'bad request',
        }

        mock.onPost(pathGenerator(`/contact`)).reply(400, mockResponse);
        jest.spyOn(axios, 'post');

        return createContact()
            .catch((response) => {
                const formattedErrorData = {
                    message: "bad request",
                    //...response.response.data
                    
                }
                expect(response).toEqual(formattedErrorData);
            });
    });
});

describe('putContact', () => {
    const contactId = "12345"
    const body = {
        firstName: 'test',
        lastName: 'test',
        age: 12,
        photo: 'linkphoto'
    };
    test('should return Promise', () => {
        const mock = new MockAdapter(axios);

        mock.onPut(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        jest.spyOn(axios, 'put');
        expect(editContact(body, contactId).then).toBeDefined();
    });

    test('should call axios.put with correct args', () => {

        const mock = new MockAdapter(axios);

        mock.onPut(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        const axiosSpy = jest.spyOn(axios, 'put');

        return editContact(body, contactId)
            .then(() => {
                expect(axiosSpy).toHaveBeenCalled();
                expect(axios.put.mock.calls[0][0]).toEqual(`/contact/${contactId}`);
            });
    });

    test('should response with some data if it is success', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            firstName: 'test',
            lastName: 'test',
            age: 12,
            photo: 'linkphoto'
        }

        mock.onPut(pathGenerator(`/contact/${contactId}`)).reply(200, mockResponse);
        const axiosSpy = jest.spyOn(axios, 'put');

        return editContact(body, contactId)
            .then((response) => {

                expect(response).toEqual(mockResponse);
            });
    });

    test('should response with some error data if it is failed', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            "message": 'bad request',
        }

        mock.onPut(pathGenerator(`/contact/${contactId}`)).reply(400, mockResponse);
        jest.spyOn(axios, 'put');

        return editContact(body, contactId)
            .catch((response) => {
                const formattedErrorData = {
                    message: "bad request",
                    //...response.response.data
                    
                }
                expect(response).toEqual(formattedErrorData);
            });
    });
});

describe('deleteContact', () => {
    const contactId = "12345"
    test('should return Promise', () => {
        const mock = new MockAdapter(axios);

        mock.onDelete(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        jest.spyOn(axios, 'delete');
        expect(deleteContact(contactId).then).toBeDefined();
    });

    test('should call axios.delete with correct args', () => {

        const mock = new MockAdapter(axios);

        mock.onDelete(pathGenerator(`/contact/${contactId}`)).reply(200, 'success');
        const axiosSpy = jest.spyOn(axios, 'delete');

        return deleteContact(contactId)
            .then(() => {
                expect(axiosSpy).toHaveBeenCalled();
                expect(axios.delete.mock.calls[0][0]).toEqual(`/contact/${contactId}`);
            });
    });

    test('should response with some data if it is success', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            message: 'success'
        }

        mock.onDelete(pathGenerator(`/contact/${contactId}`)).reply(200, mockResponse);
        const axiosSpy = jest.spyOn(axios, 'delete');

        return deleteContact(contactId)
            .then((response) => {

                expect(response).toEqual(mockResponse);
            });
    });

    test('should response with some error data if it is failed', () => {

        const mock = new MockAdapter(axios);
        const mockResponse = {
            "message": 'bad request',
        }

        mock.onDelete(pathGenerator(`/contact/${contactId}`)).reply(400, mockResponse);
        jest.spyOn(axios, 'delete');

        return deleteContact(contactId)
            .catch((response) => {
                const formattedErrorData = {
                    message: "bad request",
                    //...response.response.data
                    
                }
                expect(response).toEqual(formattedErrorData);
            });
    });
});