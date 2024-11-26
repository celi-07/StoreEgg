import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { SIZES } from '../../constants/theme'

const { width } = Dimensions.get('window')

const SkeletonList = ():JSX.Element => {
  return (
    <SkeletonPlaceholder speed={800}>
        <SkeletonPlaceholder.Item {...styles.wrapper}>
            <SkeletonPlaceholder.Item {...styles.skeleton} />
            <SkeletonPlaceholder.Item {...styles.skeleton} />
            <SkeletonPlaceholder.Item {...styles.skeleton} />
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export default SkeletonList

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
    },
    skeleton: {
        width: width - SIZES.medium * 2,
        height: 125,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.small,
    }
})