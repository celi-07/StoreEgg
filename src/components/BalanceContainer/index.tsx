import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { COLORS, FONT } from '../../constants/theme'
import { CoinHome } from '../../constants/icons'

import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useTheme } from '../../context/themeContext'

interface BalanceContainerProps {
    balance: number
}

const BalanceContainer = ({balance}: BalanceContainerProps): JSX.Element => {
    const { isDark } = useTheme()

    return (
        <View style={[styles.money, {backgroundColor: isDark ? COLORS.darkOrange: COLORS.lightOrange}]}>
            <View style={styles.balanceDisplay}>
                <Image 
                    source={CoinHome}
                    style={styles.bCImage}
                />
                <Text style={[styles.balance, isDark ? {color: COLORS.white} : {color: COLORS.black}]}>{balance.toString()}</Text>
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
  )
}

export default BalanceContainer

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
    },
    balanceBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 3,
        backgroundColor: COLORS.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
    },
    textStyle: {
        color: COLORS.lightWhite,
        fontFamily: FONT.regular,
        fontSize: 12,
    },
    moneyBtn: {
        flexDirection: 'row',
        gap: 5,
    }

})