import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, View } from 'react-native';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons'
import MainStackNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux';
import { Provider } from 'react-redux';

export default function App() {

  const [isLoadingComplete, setLoadingComplete]= React.useState(false);

  React.useEffect(()=>{
    async function loadResourceAndDataAsync(){
      try {

        await Font.loadAsync({
          ...FontAwesome.font
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourceAndDataAsync();
  })
  if(!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={ store }>
        <View style = {{flex : 1, marginTop : 20}}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
          <MainStackNavigator/>
        </View>
      </Provider>
    )
  }
}