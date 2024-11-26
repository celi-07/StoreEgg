import AsyncStorage from '@react-native-async-storage/async-storage'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import MyProductsReducer from './myProductsReducer/MyProductsSlice'
import balanceReducer from './balanceReducer/balanceSlice'

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  whitelist: ['balanceReducer'],
}

const rootReducer = combineReducers({
  myProductsReducer: MyProductsReducer,
  balanceReducer: balanceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

