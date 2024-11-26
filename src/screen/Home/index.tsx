import React, { useCallback, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native'
import { COLORS, SIZES, FONT, SHADOWS } from '../../constants/theme'
import { StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../../utils/api'
import { useAppSelector } from '../../redux/hook'
import { useTheme } from '../../context/themeContext'
import { CoinHome, Search } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { Egg, Logo } from '../../constants/images'

import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BalanceContainer from '../../components/BalanceContainer'
import SkeletonList from '../../components/SkeletonList'
import { productType } from '../../utils/api/types'

const { width } = Dimensions.get('window')

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isList, setIsList] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const { balance } = useAppSelector(state => state.balanceReducer)
    const { isDark, toggleTheme } = useTheme()

    const navigation = useNavigation()

    const {data, isLoading, refetch, isFetching} = useQuery({
        queryKey: ['product', searchQuery], 
        queryFn: () => getProduct(searchQuery)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch().finally(() => setRefreshing(false));
    }, [refetch]);

    const handleOnPress = (id: number) => {
        navigation.navigate('Detail', {
            productId: id
        })
    }

    return (
        <View style={[styles.container, {backgroundColor: isDark ? COLORS.darkBlue1 : COLORS.lightWhite}]}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            >
                <View style={{flex: 1, padding: SIZES.medium}} /> 
            
                <View style={styles.searchContainer}>
                    <Image 
                        source={Logo}
                        style={styles.logo}
                    />
                    <View style={[styles.searchWrapper, {backgroundColor: isDark ? COLORS.darkBlue2: COLORS.gray3}]}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        placeholder='Search Product..'
                        placeholderTextColor={isDark ? COLORS.lightWhite : COLORS.black}
                    />
                    </View>

                    <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
                    <Image
                        source={Search}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    />
                    </TouchableOpacity>
                </View>

                <BalanceContainer balance={balance} />
                
                <View>
                    <View style={styles.prodBtns}>
                        <View style={styles.myProdBtn}>
                            <Text style={[styles.textStyle, {color: isDark ? COLORS.lightWhite : COLORS.secondary}]}>My Products</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '20%', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={() => toggleTheme()}>
                                <FontAwesome5 name='yin-yang' size={18} color={isDark ? COLORS.lightWhite : COLORS.secondary}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsList(!isList)}
                            >
                                {isList ? 
                                    <Feather name='grid' size={18} color={isDark ? COLORS.lightWhite : COLORS.secondary}/>
                                    : 
                                    <Entypo name='list' size={18} color={isDark ? COLORS.lightWhite : COLORS.secondary}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={
                        isList ?
                            {flexWrap: 'nowrap', flexDirection: 'column', gap: 0}
                            :
                            {flexWrap: 'wrap', flexDirection: 'row', gap: 15}
                        }
                    >
                        {isLoading || isFetching ? (
                            <SkeletonList />
                        ) : data ? (
                            data.map((product: productType) => {
                                return (
                                    <TouchableOpacity key={product.id} 
                                        style={[
                                            styles.listContainer, 
                                            isDark ? 
                                                {...SHADOWS.mediumLight, backgroundColor: COLORS.darkBlue2} 
                                                : 
                                                {...SHADOWS.mediumDark, backgroundColor: COLORS.lightWhite},
                                            isList ?
                                                {marginVertical: SIZES.small, paddingHorizontal: SIZES.large, width: 'auto'}
                                                :
                                                {marginVertical: 0, paddingHorizontal: 0, width: width/2 - 32},
                                        ]}
                                        onPress={() => handleOnPress(product.id)}
                                    >
                                        <View style={{flexDirection: isList ? 'row': 'column', alignItems: 'center', flex: 1}}>
                                            <Image 
                                                source={{uri: product.image}} 
                                                resizeMode='contain'
                                                style={[
                                                    isList ?
                                                        {width: 60, height: 80, marginBottom: 0, marginEnd: 16}
                                                        :
                                                        {width: '80%', height: 80, marginBottom: 16, marginEnd: 0},
                                                    {borderRadius: 5}
                                                ]}
                                            />
                                            <View style={{flex: 1, justifyContent: isList ? 'center' : 'space-between'}}>
                                                {isList ? 
                                                    <Text style={{
                                                            fontFamily: FONT.bold, 
                                                            textAlign: 'justify', 
                                                            marginBottom: 8,
                                                            color: isDark ? COLORS.lightWhite : 'black'
                                                        }}
                                                    >
                                                        {product.title}
                                                    </Text>
                                                    :
                                                    <Text style={{
                                                        fontFamily: FONT.bold, 
                                                        textAlign: 'justify', 
                                                        marginBottom: 8,
                                                        color: isDark ? COLORS.lightWhite : 'black'
                                                        }}
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                    >
                                                        {product.title}
                                                    </Text>
                                                }
                                                <View style={{flexDirection: 'row'}}>
                                                    <Image 
                                                        source={CoinHome}
                                                        style={styles.bCImage}
                                                    />
                                                    <Text style={{
                                                        alignSelf: isList ? 'flex-start': 'flex-end', 
                                                        color: isDark ? COLORS.lightWhite : 'black'
                                                    }}>
                                                        {product.price}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            ) : (
                                <Text>Unable to fetch data.. Please Check Your Internet Connection..</Text>
                            ) 
                        }
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={{position: 'absolute', right: 15, bottom: 30,}} onPress={() => navigation.navigate('Subgame')}>
                <View style={[
                    styles.eggContainerHome, 
                    isDark ? 
                        {...SHADOWS.mediumLight, backgroundColor: COLORS.darkBlue2, shadowColor: COLORS.lightWhite} 
                        : 
                        {...SHADOWS.mediumDark, backgroundColor: COLORS.lightWhite, shadowColor: COLORS.black}
                    ]}
                >
                    <Image source={Egg} style={[styles.eggBtnHome, {backgroundColor: isDark ? COLORS.darkBlue2 : COLORS.lightWhite}]} />
                </View> 
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20
    },
    logo: {
        width: 36,
        height: 36,
        alignSelf: 'center',
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.medium,
        height: '100%',
    },
    searchInput: {
        fontFamily: 'Urbanist-Regular',
        width: '100%',
        height: '100%',
        paddingHorizontal: SIZES.medium,
    },
    searchBtn: {
        width: 50,
        height: '100%',
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtnImage: {
        width: '50%',
        height: '50%',
        tintColor: COLORS.white,
    },
    listContainer: {
        margin: 2,
        borderRadius: SIZES.medium,
        paddingVertical: SIZES.xLarge,
    },
    textStyle: {
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    myProdBtn: {
        flexDirection: 'row',
        gap: 7,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prodBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 8,
    },
    eggBtnHome: {
        width: 40,
        height: 40,
        objectFit: 'contain',
    },
    eggContainerHome: {
        padding: 20,
        borderRadius: 60,
        backgroundColor: COLORS.lightWhite,
    },
    bCImage: {
        width: 15,
        height: 15,
        margin: 1,
        alignSelf: 'center',
    },
})


