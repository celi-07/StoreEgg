import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../constants/images';
import { COLORS, FONT, icons } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackScreenProps } from '../navigation/types';
import { getBalance } from '../hooks/balanceValue';

export type SubgameParams = 
{
    balance: number,
    isDark: boolean
}

export default function Subgame({route, navigation}: RootStackScreenProps<'Subgame'>) {
    const [isBroken, setBroken] = useState(false);
    const [displayText, setDisplayText] = useState('Click on the egg to get your prize!');
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [coinImage, setCoinImage] = useState(images.empty);
    const [coinType, setCoinType] = useState('');
    const [congragulations, setCongragulations] = useState('');
    const {balance, setBalance} = getBalance(route.params.balance)
    const isDark = route.params.isDark

    const handlePress = () => {
      setBroken(true);
    
      if (!isButtonClicked) {
        const randomNumbers = [100, 50, 10];
        const randomIndex = Math.floor(Math.random() * randomNumbers.length);
        const randomNumber = randomNumbers[randomIndex];

        switch (randomNumber) {
          case 100:
            setCoinImage(images.goldCoin)
            setCongragulations('Congragulations!')
            setCoinType('You got a Gold Coin');
            setBalance(balance + 100)
            break;
          case 50:
            setCoinImage(images.silverCoin);
            setCongragulations('Congragulations!')
            setCoinType('You got a Silver Coin')
            setBalance(balance + 50)
            break;
          case 10:
            setCoinImage(images.bronzeCoin);
            setCongragulations('Congragulations!')
            setCoinType('You got a Bronze Coin')
            setBalance(balance + 10)
            break;
          default:
            setCoinImage(images.empty);
            setCongragulations('')
            setCoinType('');
        }

        setDisplayText(`${randomNumber} coins have been added to your balance`)
        setButtonClicked(true);
      }
    }

    useEffect(() => {
        const backToHomeAction = () => {
          navigation.navigate('Home', {CurrentBalance: balance});
          return true;
        };
    
        const handleBackToHome = BackHandler.addEventListener('hardwareBackPress', backToHomeAction);
    
        return () => handleBackToHome.remove();
      }, [balance]);

    if (isDark)
    {
        Alert.alert('This page does not support Dark Mode.')
    }
      
    return (
        <SafeAreaView style={{backgroundColor: '#ffffff', paddingTop: 30, height: '100%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.content]}>
                <View style={styles.nav}>
                    <View style={styles.backIconBG}>
                        <AntDesign name='left' color={COLORS.tertiary} size={18} style={styles.backIcon} onPress={() => navigation.navigate('Home', {CurrentBalance: balance})}/>
                    </View>
                    <Text style={styles.boldFont}>Minigame</Text>
                </View>

                <View style={styles.category}>
                <View style={styles.categories}>
                    <Image source={images.goldCoin} style={styles.coinImageSmall} />
                    <Text style={styles.Smalltext}>100</Text>
                </View>
                <View style={styles.categories}>
                    <Image source={images.silverCoin} style={styles.coinImageSmall} />
                    <Text style={styles.Smalltext}>50</Text>
                </View>
                <View style={styles.categories}>
                    <Image source={images.bronzeCoin} style={styles.coinImageSmall} />
                    <Text style={styles.Smalltext}>10</Text>
                </View>
                </View>

                <View style={styles.eggContainer}>
                <Text style={styles.boldFont}>{congragulations}</Text>
                <Text style={styles.descriptionEgg}>{coinType}</Text>
                <Image source={coinImage} style={styles.coinImage} />
                <TouchableOpacity onPress={handlePress}>
                    <Image
                            source={isBroken ? images.eggBroken : images.eggFull}
                            resizeMode='contain'
                            style={styles.eggBtnImage}
                    />
                </TouchableOpacity>
                <Text style={styles.descriptionEgg}>{displayText}</Text>
                </View>
            </View>
        </ScrollView>
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
    backIconBG: {
        width: 38, 
        height: 38, 
        borderRadius: 10, 
        justifyContent: 'center'
    },
  });
  