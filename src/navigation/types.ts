import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParams } from '../pages/Home'
import { DetailParams } from '../pages/Detail'
import { SubgameParams } from '../pages/Subgame';
import { MyProductsParams } from '../pages/MyProducts/MyProducts';

export type RootStackParamList = {
  Home: HomeParams
  Detail: DetailParams
  Subgame: SubgameParams
  MyProducts: MyProductsParams
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
