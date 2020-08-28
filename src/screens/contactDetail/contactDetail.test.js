import * as React from 'react';
import renderer from 'react-test-renderer';
import { ContactDetailScreen } from './contactDetail.screen';
import { Input, Button } from 'react-native-elements'

let props = {
    contactId: '',
    contact: {},
    error: {},
    getContact: jest.fn(() => Promise.resolve({})),
    createContact: jest.fn(() => Promise.resolve({})),
    updateContact: jest.fn(() => Promise.resolve({})),
    resetContact: jest.fn(),
    defaultValues: {},
    navigation: {
        navigate: jest.fn()
    },
    getContacts: jest.fn(() => Promise.resolve({})),
    setSearch: jest.fn()
};

describe('ContactDetail form Screen Unit test', () => {
  let tree;

  jest.useFakeTimers();
  
  jest.mock('react-hook-form');

  it(`renders correctly for new contact`, async () => {
    await renderer.act(() => {
      tree = renderer.create(<ContactDetailScreen  { ...props} />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });


  it(`renders correctly for update contact`, async () => {
    let newProps = JSON.parse(JSON.stringify(props));
    newProps.contactId= '1234'
    await renderer.act(() => {
      tree = renderer.create(<ContactDetailScreen  { ...newProps} />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  describe('check each component',() => {

    const setState =jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    it('submit button', async () =>{
      let newProps = JSON.parse(JSON.stringify(props));
      newProps.contactId= '1234'
      newProps.contact={
        firstName : 'John',
        lastName : 'Doe',
        Age : 28,
        photo : 'some photo link'
      }
      await renderer.act(() => {
        component = renderer.create(<ContactDetailScreen { ...newProps } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const submitBtn = root.findAllByType(Button)[0].props;
        await submitBtn.onPress();
        expect(setState).toHaveBeenCalled();
        // await submitBtn.onPress();
        // expect(newProps.updateContact).toHaveBeenCalled();
      })
    })

    it('submit button', async () =>{
      await renderer.act(() => {
        component = renderer.create(<ContactDetailScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const submitBtn = root.findAllByType(Button)[0].props;
        await submitBtn.onPress();
        
        // expect(props.createContact).toHaveBeenCalled();
      })
    })
  
    it('firstName input', async () =>{
      await renderer.act(() => {
        component = renderer.create(<ContactDetailScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const textInpt = root.findAllByType(Input)[0].props;
        // Controller
        await textInpt.onChange({
            nativeEvent: {
              text: 'John'
            }
          });
  
        //console.log(textInpt)
        
        //expect(props.uploadAsset).toHaveBeenCalled();
      })
    })

    it('lastName input', async () =>{
      await renderer.act(() => {
        component = renderer.create(<ContactDetailScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const textInpt = root.findAllByType(Input)[1].props;
        // Controller
        await textInpt.onChange({
            nativeEvent: {
              text: 'Doe'
            }
          });
  
        //console.log(textInpt)
        
        //expect(props.uploadAsset).toHaveBeenCalled();
      })
    })

    it('age input', async () =>{
      await renderer.act(() => {
        component = renderer.create(<ContactDetailScreen { ...props } />);
      });
  
      await renderer.act(async () => {
        const root = component.root;
        const textInpt = root.findAllByType(Input)[2].props;
        // Controller
        await textInpt.onChange({
            nativeEvent: {
              text: '28'
            }
          });
  
        //console.log(textInpt)
        
        //expect(props.uploadAsset).toHaveBeenCalled();
      })
    })
  });
});