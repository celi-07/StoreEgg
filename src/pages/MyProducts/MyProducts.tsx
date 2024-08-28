import { ActivityIndicator, BackHandler, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hook'
import { RootStackScreenProps } from '../../navigation/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDetails, productUrl } from '../../hooks/getProduct'
import { useQuery } from '@tanstack/react-query'
import { COLORS, FONT, SHADOWS, SIZES, icons } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export type MyProductsParams =
{
  isDark: boolean
}

const MyProducts = ({route, navigation}: RootStackScreenProps<'MyProducts'>) => {

  const MyProducts = useAppSelector(state => state.MyProducts)

  useEffect(() => {
    const backToHomeAction = () => {
      navigation.goBack();
      return true;
    };

    const handleBackToHome = BackHandler.addEventListener('hardwareBackPress', backToHomeAction);

    return () => handleBackToHome.remove();
  }, []);

  const isDark = route.params.isDark

  return (
    <SafeAreaView style={[styles.test, {backgroundColor: isDark ? 'black': COLORS.lightWhite}]}>
      <ScrollView>
        <View style={styles.backIconBG}>
          <AntDesign name='left' color={COLORS.tertiary} size={18} style={styles.backIcon} onPress={() => navigation.goBack()}/>
        </View>

        <View style={styles.myProdBtn}>
            <Text style={[styles.textStyle, {color: isDark ? COLORS.lightWhite: 'black'}]}>My Products</Text>
            <MaterialIcons name='receipt-long' size={25} color={isDark ? COLORS.lightWhite: 'gray'} />
        </View>

        {MyProducts.map((index: number) => {
          const url = productUrl+'/'+MyProducts[index]
          console.log(url)
          const {data, isLoading} = useQuery({
            queryKey: ['productDetails'], 
            queryFn: () => getDetails(url)
          })
          isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) 
          : (
            <Text>'Unable to fetch data.. Please Check
            Your Internet Connection..'</Text>
          )
          if (data) {
          return (
            <View key={data.id} 
              style={[
                  styles.listContainer, 
                  {width: 'auto',
                  height: 'auto',
                  marginVertical:  SIZES.small,
                  backgroundColor: isDark ? 'black': COLORS.lightWhite
              }]}
              >
                  <View style={{
                      flexDirection: 'row', 
                      gap: 12, alignItems: 'center'
                  }}>
                      <Image source={{uri: data.image}} style={[
                          styles.productImage,{
                          width: 40,
                          height: 40,
                          objectFit: "contain"
                      }]}/>
                      <View style={{
                          gap: 5,
                          flex: 1,
                          height: 70,
                        }}>
                          <Text style={{
                              fontFamily: FONT.bold, textAlign: "justify", height: '80%', color: isDark? COLORS.lightWhite: 'black'
                          }}>
                              {data.title}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                              <Image 
                                  source={icons.coinHome}
                                  style={styles.bCImage}
                              />
                              <Text style={{
                                  alignSelf: 'flex-start', 
                                  color: isDark? COLORS.lightWhite: 'black'
                              }}>
                                  {data.price}
                              </Text>
                          </View>
                      </View>
                  </View>
              </View>
          )
        }})}
      </ScrollView>
    </SafeAreaView>
  ) 
}

export default MyProducts

const styles = StyleSheet.create({
  test: {
    width: "100%",
    height: '100%',
    backgroundColor: COLORS.lightWhite,
    padding: 20
  },
  listContainer: {
    width: 'auto',
    padding: SIZES.xLarge,
    backgroundColor: 'white',
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    },
  productImage: {
      width: 40,
      height: 40,
      margin: 1,
  },
  bCImage: {
    width: 15,
    height: 15,
    margin: 1,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'black',
    fontFamily: FONT.regular,
    fontSize: 19,
  },
  myProdBtn: {
      flexDirection: 'row',
      gap: 7,
      borderRadius: 4,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingVertical: 25,
  },
  backIcon: {
    alignSelf: 'center',
  },
  backIconBG: {
    width: 38, 
    height: 38, 
    borderRadius: 10, 
    justifyContent: 'center'
  },
})

