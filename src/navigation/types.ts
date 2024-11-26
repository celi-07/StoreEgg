import { NativeStackScreenProps } from '@react-navigation/native-stack'

type DetailParams = {
  productId: number
}

export type RootStackParamList = {
  Home: undefined
  Detail: DetailParams
  Subgame: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
