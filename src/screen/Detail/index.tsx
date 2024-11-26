import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import { COLORS, FONT, SHADOWS } from '../../constants/theme'
import { RootStackScreenProps } from '../../navigation/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useNavigation } from '@react-navigation/native';
import { getProductDetails } from '../../utils/api'
import { setBalance } from '../../redux/balanceReducer/balanceSlice'
import { useTheme } from '../../context/themeContext'
import { CoinHome } from '../../constants/icons'

import Modal from 'react-native-modal'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import InfoView from '../../components/InfoView'


const Detail = ({route}: RootStackScreenProps<'Detail'>) => {
  const [isModalVisible, setModalVisible] = useState(false)
  
  const { productId } = route.params
  const { balance } = useAppSelector(state => state.balanceReducer)
  const { isDark } = useTheme()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const {data, isLoading} = useQuery({
    queryKey: ['productDetails'], 
    queryFn: () => getProductDetails(productId)
  })

  const buyItem = (price: number) => {
    if (balance >= price)
    {
      dispatch(setBalance(Math.round((balance - price)* 100)/100))
      Alert.alert('Success!', `${data?.title} was bought successfully!\n\nYour Current balance is ${balance} Coins.`)
    }
    else
    {
      Alert.alert('Failed!', `Insufficient Balance!\nPlease Top Up ${Math.round((price - balance)* 100)/100} coins.`)
    }
  }

  const sellItem = (price: number) => {
    dispatch(setBalance(Math.round((balance + price)* 100)/100))
    Alert.alert('Success!', `${data?.title} was sold successfully!\n\nYour Current balance is ${balance} Coins.`)
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <SafeAreaView style={[styles.test, {backgroundColor: isDark? COLORS.darkBlue1 : COLORS.lightWhite}]}>
      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : data ? (
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.backIconBG} onPress={() => navigation.goBack()}>
              <AntDesign name='left' color={COLORS.tertiary} size={18} style={styles.backIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageBG} onPress={toggleModal} activeOpacity={0.8}>
              <Image source={{uri: data?.image}} style={styles.image} />
            </TouchableOpacity>

            <View style={{gap: 30}}>
              <View>
                <View style={styles.topDesc}>
                  <InfoView IconButton={() => <MaterialIcons name='category' color={COLORS.tertiary} size={20}/>} text={data.category.toString()} />
                  <InfoView IconButton={() => <MaterialIcons name='sell' color={COLORS.tertiary} size={20} />} text={data.rating.count.toString()} />
                  <InfoView IconButton={() => <AntDesign name='star' color={COLORS.tertiary} size={20} />} text={data.rating.rate.toString()} />
                </View>

                <View>
                  <Text style={[styles.title, {color: isDark ? COLORS.lightWhite : COLORS.black}]}>{data.title}</Text>
                  <Text style={[styles.description, {color: isDark ? COLORS.lightWhite : COLORS.black}]}>{data.description}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image 
                        source={CoinHome}
                        style={styles.bCImage}
                    />
                    <Text style={[styles.price, {color: isDark ? COLORS.lightWhite : COLORS.black}]}>{data.price}</Text>
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
          <Text style={{color: COLORS.black}}>'Unable to fetch data.. Please Check Your Internet Connection..'</Text>
        )
      }
      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={[styles.buyBtn]} onPress={() => buyItem(data?.price ?? 0)}>
          <Text style={[styles.buyTxt, {color: isDark ? COLORS.black : COLORS.lightWhite}]}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[
          styles.sellBtn, 
          isDark ? 
            {backgroundColor: COLORS.darkBlue2, ...SHADOWS.smallLight} 
            : 
            {backgroundColor: COLORS.lightWhite, ...SHADOWS.smallDark}
          ]} 
          onPress={() => sellItem(data?.price ?? 0)}
        >
          <Text style={styles.sellTxt}>Sell</Text>
        </TouchableOpacity>
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
    borderRadius: 5,
  },
  backIconBG: {
    position: 'absolute',
    top: 15,
    zIndex: 2,
    width: 38,
    height: 38,
  },
  imageBG: {
    width: '100%',
    height: '35%',
    marginBottom: 30,
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
  },
  sellBtn: {
    width: '45%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightWhite,
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
    borderRadius: 5,
  },
})


