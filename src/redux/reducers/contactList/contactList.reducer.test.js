import reducer, {
    actionTypes,
    initialState,
    actions
} from './contactList.reducer';

describe('Home Redux Reducer', () => {
    const spies = {
        goBack: jest.fn(),
        dispatch: jest.fn()
    };

    beforeEach(() => {
        spies.dispatch.mockClear();
        spies.goBack.mockClear();
    });

    describe('Reducer', () => {
        test('Should be a function.', () => {
            expect(reducer).toBeDefined();
        });

        test('Shoud initialize with a state', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });

        test('Should return the previous state if an action was not matched.', () => {
            let state = reducer(undefined, {});
            expect(state).toEqual(initialState);
            state = reducer(state, { type: '@@@@@@@' });
            expect(state).toEqual(initialState);
        });
    });

    describe('GET_CONTACTS', () => {
        test('Should be exported as a function.', () => {
            expect(actions.fetchContactList).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.fetchContactList().type).toBe('LIST/GET_CONTACTS');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'LIST/GET_CONTACTS',
                payload: []
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
                contacts: action.payload
            });
        });
    });

    describe('DELETE_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.deleteSelectedContact).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.deleteSelectedContact().type).toBe('LIST/DELETE_CONTACT');
        });

    });

    describe('SET_SEARCH', () => {
        test('Should be exported as a function.', () => {
            expect(actions.setSearch).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.setSearch().type).toBe('LIST/SET_SEARCH');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'LIST/SET_SEARCH',
                payload: ""
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
                searchString: action.payload
            });
        });
    });
});