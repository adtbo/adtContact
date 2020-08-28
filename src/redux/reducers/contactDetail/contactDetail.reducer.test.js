import reducer, {
    actionTypes,
    initialState,
    actions
} from './contactDetail.reducer';

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

    describe('SET_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.setContactId).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.setContactId().type).toBe('DETAIL/SET_CONTACT');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'DETAIL/SET_CONTACT',
                payload: ""
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
                contactId: action.payload
            });
        });
    });

    describe('GET_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.fetchContact).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.fetchContact().type).toBe('DETAIL/GET_CONTACT');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'DETAIL/GET_CONTACT',
                payload: {}
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
                contact: {
                    ...action.payload
                }
            });
        });
    });

    describe('EDIT_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.updateContact).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.updateContact().type).toBe('DETAIL/EDIT_CONTACT');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'DETAIL/EDIT_CONTACT',
                payload: {}
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
                contact: {
                    ...action.payload
                }
            });
        });
    });

    describe('CREATE_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.createNewContact).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.createNewContact().type).toBe('DETAIL/CREATE_CONTACT');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'DETAIL/CREATE_CONTACT',
                payload: {}
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
            });
        });
    });

    describe('RESET_CONTACT', () => {
        test('Should be exported as a function.', () => {
            expect(actions.resetContact).toBeDefined();
        });

        test('Should return an action with the correct type.', () => {
            expect(actions.resetContact().type).toBe('DETAIL/RESET_CONTACT');
        });

        test('FULLFILED', () => {
            const action = {
                type: 'DETAIL/RESET_CONTACT',
                payload: {}
            };
            const nextState = reducer(initialState, action);
            expect(nextState).toEqual({
                ...initialState,
            });
        });
    });
});
