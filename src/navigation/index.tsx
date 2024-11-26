import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import { useEffect, useRef } from 'react'
import { Alert, BackHandler } from 'react-native'

import Home from '../screen/Home'
import Detail from '../screen/Detail'
import Subgame from '../screen/Subgame'
import PopUpExitApp from '../components/PopUpExitApp'

const MainNavigator = (): JSX.Element => {

    const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();
    const popUpExitAppRef = useRef<any>(null)

    useEffect(() => {
        const closeAppAction = () => {
            // Alert.alert('Close', 'Are you sure you want to close Storegg?', 
            // [
            //     {
            //         text: 'Cancel',
            //         onPress: () => null,
            //         style: 'cancel',
            //     },
            //     { 
            //         text: 'Yes', 
            //         onPress: () => BackHandler.exitApp() 
            //     },
            // ])
            popUpExitAppRef.current.show(true)
            return true
        }

        const handleCloseApp = BackHandler.addEventListener('hardwareBackPress', closeAppAction);

        return () => handleCloseApp.remove()
    }, [])
  
  return (
    <>
      <NavigationContainer>
        <Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Screen name='Home' component={Home} />
          <Screen name='Detail' component={Detail} />
          <Screen name='Subgame' component={Subgame} />
        </Navigator>
      </NavigationContainer>
      <PopUpExitApp ref={popUpExitAppRef} />
    </>
  )
}

export default MainNavigator;