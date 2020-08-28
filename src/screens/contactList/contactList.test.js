import * as React from 'react';
import renderer from 'react-test-renderer';
import { ContactListScreen } from './contactList.screen';
import { ListItem, Avatar, SearchBar } from 'react-native-elements'
import { TouchableOpacity, FlatList } from 'react-native'

let props = {
    error: {},
    navigation: {
        navigate: jest.fn()
    },
    getContacts: jest.fn(() => Promise.resolve({})),
    setSearch: jest.fn(() => Promise.resolve({})),
    setContactId: jest.fn(() => Promise.resolve({})),
    deleteContac: jest.fn(),
    contactList: [],
    searchString: '',
};

let newProps = JSON.parse(JSON.stringify(props));
    newProps.contactList= [
    {firstName : "John",
    lastName: "Doe",
    photo: "some photo",
    age: 100},
    {firstName : "Jane",
    lastName: "Doe",
    photo: "some photo",
    age: 88},
    ]

describe('ContactList form Screen Unit test', () => {
  let tree;

  jest.useFakeTimers();

  it(`renders blank correctly`, async () => {
    await renderer.act(() => {
      tree = renderer.create(<ContactListScreen  { ...props} />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it(`renders blank correctly`, async () => {
    await renderer.act(() => {
      tree = renderer.create(<ContactListScreen  { ...newProps} />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  describe('check each component',() => {

    it('SearchBar', async () =>{
  
      await renderer.act(() => {
        component = renderer.create(<ContactListScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const srcBar = root.findAllByType(SearchBar)[0].props;
        await srcBar.onChangeText();
        expect(props.setSearch).toHaveBeenCalled();
      })
    })

    it('FlatList', async () =>{
  
      await renderer.act(() => {
        component = renderer.create(<ContactListScreen { ...newProps } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const list = root.findAllByType(FlatList)[0];
        //expect(list[0].props.length).toBe(1)
      })
    })

    it('TouchableOppacity', async () =>{
  
      await renderer.act(() => {
        component = renderer.create(<ContactListScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const button = root.findAllByType(TouchableOpacity)[0].props;
        await button.onPress();
        expect(props.navigation.navigate).toHaveBeenCalled();
      })
    })
  });
});