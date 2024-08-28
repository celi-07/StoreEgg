import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { COLORS, FONT, icons } from '../constants'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { getBalance } from '../hooks/balanceValue'
import { DarkMode } from '../hooks/darkMode'

export const BalanceContainer = ({balance}: any) => {

    return (
    <View>
        <View style={styles.money}>
            <View style={styles.balanceDisplay}>
                <Image 
                    source={icons.coinHome}
                    style={styles.bCImage}
                />
                <Text style={styles.balance}>{balance.toString()}</Text>
            </View>
            <View style={styles.moneyBtn}>
                <View style={styles.balanceBtn}>
                    <Text style={styles.textStyle}>Top Up</Text>
                    <Text style={styles.textStyle}>+</Text>
                </View>
                <View style={styles.balanceBtn}>
                    <Text style={styles.textStyle}>Send</Text>
                    <AntdesignIcon style={{alignSelf: 'center'}} name='caretright' size={5} color={COLORS.lightWhite} />
                </View>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    bCImage: {
        width: 15,
        height: 15,
        margin: 1,
        alignSelf: 'center',
    },
    money: {
        padding: '5%',
        marginVertical: '5%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 119, 84, 0.2)',
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    balanceDisplay: {
        flexDirection: 'row',
    },
    balance: {
        alignSelf: 'center',
        paddingLeft: '5%',
        fontFamily: FONT.bold,
        fontSize: 20,
        color: 'black',
    },
    balanceBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 3,
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
    },
    textStyle: {
        color: COLORS.lightWhite,
        fontFamily: FONT.regular,
        fontSize: 9,
    },
    moneyBtn: {
        flexDirection: 'row',
        gap: 5,
    }

})