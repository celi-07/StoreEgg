import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MyProductsState = {
  MyProducts: number[]
}

const initialState: MyProductsState = {
  MyProducts: [],
}

export const MyProductsSlice = createSlice({
  initialState,
  name: 'MyProducts',
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.MyProducts.push(action.payload)
    },
  },
})

export const { add } = MyProductsSlice.actions

const MyProductsReducer = MyProductsSlice.reducer

export default MyProductsReducer
