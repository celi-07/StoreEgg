// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyProductsReducer from '../pages/MyProducts/redux/MyProductsSlice';
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   storage: AsyncStorage,
//   key: 'root',
// };

// const persistedReducer = persistReducer(persistConfig, MyProductsReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       immutableCheck: false,
//       serializableCheck: false,
//     })
// })

// export const persistor = persistStore(store)

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import AsyncStorage from '@react-native-async-storage/async-storage';
import MyProductsReducer from '../pages/MyProducts/redux/MyProductsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, MyProductsReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

