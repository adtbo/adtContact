import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'

import ContactListScreen from '../screens/contactList/contactList.screen'
import ContactDetailScreen from '../screens/contactDetail/contactDetail.screen'
import { lazy } from 'react'

const Stack = createStackNavigator()

function MainStackNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName= {'home'}
                screenOptions={{
                    headerShown: false,
                }}
                lazy={false}
            >
                <Stack.Screen name='home' component={ContactListScreen} />
                <Stack.Screen name='detail' component={ContactDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator