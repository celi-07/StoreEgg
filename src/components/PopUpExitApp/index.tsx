import { BackHandler, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants/theme'
import { useTheme } from '../../context/themeContext'

const { width, height } = Dimensions.get('window')

const PopUpExitApp = React.forwardRef(({}, ref): JSX.Element => {
    const [isVisible, setIsVisible] = useState(false)
    const onHide = useRef(undefined)

    const { isDark } = useTheme()

    React.useImperativeHandle(ref, () => ({
        show: setIsVisible,
        onHide: (func: any) => (onHide.current = func),
    }))

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType='fade'
        >
            <View style={styles.overlay}>
                <View style={[styles.container, {backgroundColor: isDark ? COLORS.darkBlue1 : COLORS.white}]}>
                    <View>
                        <Text style={[styles.title, {color: isDark ? COLORS.white : COLORS.black}]}>
                            Close
                        </Text>
                        <Text style={[styles.text, {color: isDark ? COLORS.white : COLORS.black}]}>
                            Are you sure you want to close Storegg?
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={[
                                styles.cancelBtn, 
                                isDark ?
                                    {backgroundColor: COLORS.darkBlue2, ...SHADOWS.smallLight}
                                    :
                                    {backgroundColor: COLORS.lightWhite, ...SHADOWS.smallDark}
                            ]} 
                            onPress={() => setIsVisible(false)}
                        >
                            <Text style={[styles.cancelTxt, {color: isDark ? COLORS.lightWhite : COLORS.black}]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.closeBtn]} onPress={() => BackHandler.exitApp() }>
                            <Text style={[styles.closeTxt, {color: isDark ? COLORS.black : COLORS.lightWhite}]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default PopUpExitApp

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#000000CC', 
        justifyContent: 'center',
      },
    container: {
        width: width - 100,
        height: height / 3.5,
        alignSelf: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderRadius: 25,
        padding: 25,
    },
    title: {
        color: COLORS.black,
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        marginBottom: '6%',
    },
    text: {
        color: COLORS.black,
        fontFamily: FONT.light,
        fontSize: SIZES.semiSmall,
        textAlign: 'justify',
    },
    closeBtn: {
        width: '45%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.tertiary,
    },
    closeTxt: {
        fontFamily: FONT.bold,
        textAlign: 'center',
    },
    cancelBtn: {
        width: '45%',
        padding: 10,
        borderRadius: 20,
    },
    cancelTxt: {
        fontFamily: FONT.bold,
        textAlign: 'center',
    },
})