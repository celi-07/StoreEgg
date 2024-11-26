import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { useTheme } from '../../context/themeContext'
import { useNavigation } from '@react-navigation/native'
import { setBalance } from '../../redux/balanceReducer/balanceSlice'
import { BronzeCoin, EggBroken, EggFull, Empty, GoldCoin, SilverCoin } from '../../constants/images'
import { COLORS, FONT } from '../../constants/theme'


export default function Subgame() {
    const [isBroken, setBroken] = useState(false)
    const [displayText, setDisplayText] = useState('Click on the egg to get your prize!')
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [coinImage, setCoinImage] = useState(Empty)
    const [coinType, setCoinType] = useState('')
    const [congratulations, setCongratulations] = useState('')

    const { balance } = useAppSelector(state => state.balanceReducer)
    const { isDark } = useTheme()
    const navigation = useNavigation()
    const dispatch = useAppDispatch()

    const handlePress = () => {
      setBroken(true);
    
      if (!isButtonClicked) {
        const randomNumbers = [100, 50, 10];
        const randomIndex = Math.floor(Math.random() * randomNumbers.length);
        const randomNumber = randomNumbers[randomIndex]

        switch (randomNumber) {
          case 100:
            setCoinImage(GoldCoin)
            setCongratulations('Congragulations!')
            setCoinType('You got a Gold Coin')
            dispatch(setBalance(balance + 100))
            break;
          case 50:
            setCoinImage(SilverCoin)
            setCongratulations('Congragulations!')
            setCoinType('You got a Silver Coin')
            dispatch(setBalance(balance + 50))
            break;
          case 10:
            setCoinImage(BronzeCoin)
            setCongratulations('Congragulations!')
            setCoinType('You got a Bronze Coin')
            dispatch(setBalance(balance + 10))
            break;
          default:
            setCoinImage(Empty);
            setCongratulations('')
            setCoinType('');
        }

        setDisplayText(`${randomNumber} coins have been added to your balance`)
        setButtonClicked(true);
      }
    }
      
    return (
        <SafeAreaView style={{backgroundColor: isDark ? COLORS.darkBlue1 : COLORS.white, paddingTop: 30, height: '100%'}}>
            <View style={[styles.content]}>
                <View style={styles.nav}>
                    <TouchableOpacity style={{width: 38, height: 38, justifyContent: 'center'}} onPress={() => navigation.goBack()}>
                        <AntDesign name='left' color={COLORS.tertiary} size={18} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={[styles.boldFont, {color: isDark ? COLORS.white: COLORS.black}]}>Minigame</Text>
                </View>

                <View style={styles.category}>
                    <View style={styles.categories}>
                        <Image source={GoldCoin} style={styles.coinImageSmall} />
                        <Text style={[styles.Smalltext, {color: isDark ? COLORS.white: COLORS.black}]}>100</Text>
                    </View>
                    <View style={styles.categories}>
                        <Image source={SilverCoin} style={styles.coinImageSmall} />
                        <Text style={[styles.Smalltext, {color: isDark ? COLORS.white: COLORS.black}]}>50</Text>
                    </View>
                    <View style={styles.categories}>
                        <Image source={BronzeCoin} style={styles.coinImageSmall} />
                        <Text style={[styles.Smalltext, {color: isDark ? COLORS.white: COLORS.black}]}>10</Text>
                    </View>
                </View>

                <View style={styles.eggContainer}>
                    <Text style={styles.boldFont}>{congratulations}</Text>
                    <Text style={styles.descriptionEgg}>{coinType}</Text>
                    <Image source={coinImage} style={[styles.coinImage, isBroken ? {display: 'flex'} : {display: 'none'}]} />
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            source={isBroken ? EggBroken : EggFull}
                            resizeMode='contain'
                            style={styles.eggBtnImage}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.descriptionEgg, {color: isDark ? COLORS.white: COLORS.black}]}>{displayText}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    content: {
        margin: 10,
    },
    nav : {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
        marginTop: 16,
    },
    backBtnImage: {
        width: 25,
        height: 25,
        tintColor: "#000",
        margin: 12,
        marginRight: 0
    },
    eggContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30
    },
    coinImage: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    eggBtnImage: {
        width: 250,
        height: 250,
        marginBottom: 16
    },
    boldFont: {
        fontSize: 24,
        fontFamily: FONT.bold,
        color: "black",
        marginHorizontal: 20,
        textAlign: "center"
    },
    descriptionEgg: {
        fontFamily: FONT.regular,
        fontSize: 20,
        color: "black",
        marginHorizontal: 20,
        textAlign: "center",
        marginBottom: 16
    },
    category: {
        flexDirection: "row",
        justifyContent: "center",
    },
    categories: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20
    },
    coinImageSmall: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    Smalltext: {
        fontSize: 16,
        fontFamily: FONT.light,
        color: "black",
        marginLeft: 5
        },
    backIcon: {
        alignSelf: 'center',
    },
  });
  