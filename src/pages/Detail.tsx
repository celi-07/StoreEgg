import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image } from 'react-native-elements'
import { COLORS, FONT, SHADOWS, icons } from '../constants'
import { RootStackScreenProps } from '../navigation/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDetails, productUrl } from '../hooks/getProduct'
import { useQuery } from '@tanstack/react-query'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getBalance } from '../hooks/balanceValue';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { add } from './MyProducts/redux/MyProductsSlice';
import Modal from 'react-native-modal'

export type DetailParams = 
{
    productID: number
    balanceValue: number
    isDark: boolean
}


const Detail = ({route, navigation}: RootStackScreenProps<'Detail'>) => {
  const {productID, balanceValue} = route.params
  const [isSell, setIsSell] = useState(false)
  const url = productUrl+'/'+productID

  const isDark = route.params.isDark

  const {data, isLoading} = useQuery({
    queryKey: ['productDetails'], 
    queryFn: () => getDetails(url)
  })
  
  const {balance, setBalance} = getBalance(balanceValue)

  const isMounted = React.useRef(true);

  useEffect(() => {
    if (isMounted.current)
    {
      isMounted.current = false
      return
        
    }
    if (!isSell)
    {
      Alert.alert('Success!', `${data.title} was bought successfully!\nYour Current balance is ${balance} Coins.`)
    }
    else
    {
      Alert.alert('Success!', `${data.title} was sold successfully!\nYour Current balance is ${balance} Coins.`)
    }

    const backToHomeAction = () => {
      navigation.navigate('Home', {CurrentBalance: balance})
      return true
    };

    const handleBackToHome = BackHandler.addEventListener('hardwareBackPress', backToHomeAction)

    return () => handleBackToHome.remove()

  }, [balance]);

  const dispatch = useAppDispatch()
 
  const buyItem = (price: number) => {
    if (balance >= price)
    {
      setBalance(Math.round((balance - price)* 100)/100)
      setIsSell(false)
      dispatch(add(productID))
    }
    else
    {
      Alert.alert('Failed!', `Insufficient Balance!\nPlease Top Up ${Math.round((price - balance)* 100)/100} coins.`)
    }
  }

  const sellItem = (price: number) => {
    setBalance(Math.round((balance + price)* 100)/100)
    setIsSell(true)
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <SafeAreaView style={[styles.test, {backgroundColor: isDark? 'black': COLORS.lightWhite}]}>
      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : data ? (
            <View style={{flex: 1, backgroundColor: isDark ? 'black' : COLORS.lightWhite}}>
              <View style={styles.backIconBG}>
                <AntDesign name='left' color={COLORS.tertiary} size={18} style={styles.backIcon} onPress={() => navigation.navigate('Home', {CurrentBalance: balance})}/>
              </View>
              <View style={{gap: 30, backgroundColor: isDark ? 'black' : COLORS.lightWhite, zIndex: -2}}>
                <TouchableOpacity style={[styles.imageBG, {backgroundColor: isDark ? 'black' : COLORS.lightWhite}]} onPress={toggleModal} activeOpacity={0.8}>
                  <Image source={{uri: data.image}} style={styles.image} />
                </TouchableOpacity>
                <View>
                  <View style={styles.topDesc}>
                    <View style={styles.eachTopDesc}>
                      <MaterialIcons name='category' color={COLORS.tertiary} size={20}/>
                      <Text style={[styles.category, {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.category}</Text>
                    </View>
                    <View style={styles.eachTopDesc}>
                      <MaterialIcons name='sell' color={COLORS.tertiary} size={20} />
                      <Text style={[styles.count, , {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.rating.count}</Text>
                    </View>
                    <View style={styles.eachTopDesc}>
                      <AntDesign name='star' color={COLORS.tertiary} size={20} />
                      <Text style={[styles.rate, {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.rating.rate}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.title, {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.title}</Text>
                    <Text style={[styles.description, {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.description}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image 
                          source={icons.coinHome}
                          style={styles.bCImage}
                      />
                      <Text style={[styles.price, {color: isDark ? COLORS.lightWhite : 'black'}]}>{data.price}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <Modal isVisible={isModalVisible}>
                  <TouchableOpacity onPress={() => toggleModal()}>
                    <Image source={{ uri: data.image }} style={[styles.modalImage]} />
                  </TouchableOpacity>
              </Modal>
            </View>
        )
        : (
          <Text style={{color: 'black'}}>'Unable to fetch data.. Please Check
          Your Internet Connection..'</Text>
        )}
        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-evenly',}}>
          <TouchableOpacity style={[styles.buyBtn]} onPress={() => buyItem(data.price)}><Text style={[styles.buyTxt, {color: isDark ? 'black' : COLORS.lightWhite}]}>Buy</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.sellBtn, , {backgroundColor: isDark ? 'black' : COLORS.lightWhite, shadowColor: isDark ? COLORS.lightWhite : 'black'}]} onPress={() => sellItem(data.price)}><Text style={styles.sellTxt}>Sell</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Detail

const styles = StyleSheet.create ({
  test: {
    width: "100%",
    height: '100%',
    backgroundColor: COLORS.lightWhite,
    padding: 20
  },
  backIcon: {
    alignSelf: 'center',
  },
  image: {
    width: '100%', 
    height: '100%', 
    objectFit: 'contain',
    zIndex: -1,
  },
  backIconBG: {
    width: 38, 
    height: 38, 
    borderRadius: 10, 
    justifyContent: 'center'
  },
  imageBG: {
    width: '100%',
    height: '35%',
    backgroundColor: COLORS.lightWhite,
    marginTop: -38,
    zIndex: -2,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 15,
    textAlign: 'justify',
  },
  count: {
    fontFamily: FONT.regular,
  },
  rate: {
    fontFamily: FONT.regular,
  },
  description: {
    fontFamily: FONT.regular,
    paddingBottom: 15,
    textAlign: 'justify',
  },
  category: {
    fontFamily: FONT.regular,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  price: {
    fontFamily: FONT.bold,
    fontSize: 15,
  },
  topDesc: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
  },
  eachTopDesc: {
    flexDirection: 'column',
    width: 80,
    alignItems: 'center',
    gap: 5,
  },
  buyBtn: {
    width: '45%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.tertiary,
    ...SHADOWS.small,
  },
  sellBtn: {
    width: '45%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightWhite,
    ...SHADOWS.small,
  },
  buyTxt: {
    fontFamily: FONT.bold,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
  sellTxt: {
    fontFamily: FONT.bold,
    color: COLORS.tertiary,
    textAlign: 'center',
  },
  bCImage: {
    width: 15,
    height: 15,
    margin: 1,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
 },

})


