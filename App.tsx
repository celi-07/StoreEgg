import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from "react";
import Home from "./src/pages/Home";
import { Alert, BackHandler, SafeAreaView, StyleSheet, View } from "react-native";
import Detail from "./src/pages/Detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootStackParamList } from "./src/navigation/types";
import Subgame from "./src/pages/Subgame";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import MyProducts from "./src/pages/MyProducts/MyProducts";
import { PersistGate } from "redux-persist/integration/react";


const Stack = createNativeStackNavigator<RootStackParamList>();


const MyNavigation = () => {

  useEffect(() => {
    const closeAppAction = () => {
      Alert.alert('Close', 'Are you sure you want to close Storegg?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const handleCloseApp = BackHandler.addEventListener('hardwareBackPress', closeAppAction);

    return () => handleCloseApp.remove();
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Subgame" component={Subgame} />
        <Stack.Screen name="MyProducts" component={MyProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App(): JSX.Element {
  return (
    <View style={styles.background}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <MyNavigation />
          </QueryClientProvider> 
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
})


export default App;
