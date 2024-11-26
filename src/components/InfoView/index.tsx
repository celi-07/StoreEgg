import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/themeContext'
import { COLORS, FONT } from '../../constants/theme'

interface InfoViewProps {
  IconButton: React.ComponentType
  text: string
}

const InfoView = ({IconButton, text}: InfoViewProps): JSX.Element => {
  const { isDark } = useTheme()

  return (
    <View style={styles.eachTopDesc}>
      <IconButton />
      <Text style={[styles.category, {color: isDark ? COLORS.lightWhite : COLORS.black}]}>{text}</Text>
    </View>
  )
}

export default InfoView

const styles = StyleSheet.create({
  eachTopDesc: {
    flexDirection: 'column',
    width: 80,
    alignItems: 'center',
    gap: 5,
  },
  category: {
    fontFamily: FONT.regular,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
})