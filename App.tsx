import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './src/context/themeContext'

import MainNavigator from './src/navigation'
import { Platform, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = (): JSX.Element => {
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <ThemeProvider>
                <MainNavigator />
              </ThemeProvider>
            </SafeAreaProvider>
          </QueryClientProvider> 
        </PersistGate>
      </Provider>
    </>
  )
}

export default App;
