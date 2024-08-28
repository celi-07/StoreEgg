import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, FONT, icons, SHADOWS } from "../constants";
import { StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getProduct } from "../hooks/getProduct";
import { RootStackScreenProps } from "../navigation/types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BalanceContainer } from "../components/BalanceContainer";
import { getBalance } from "../hooks/balanceValue";
import images from "../constants/images";
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DarkMode } from "../hooks/darkMode";

export type HomeParams =
 {
    CurrentBalance?: number
 }

const Home = ({route, navigation}: RootStackScreenProps<'Home'>) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isList, setIsList] = useState(true)
    const queryClient = new QueryClient()
    
    const {data, isLoading} = useQuery({
        queryKey: ['product', {searchTerm}], 
        queryFn: () => getProduct(searchTerm)})

    const { mutateAsync } = useMutation({
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product'] })
    })

    const handleOnPress = (id: number) => {
        navigation.navigate('Detail', {
            productID: id,
            balanceValue: balance,
            isDark: isDark
        })
    }

    const {balance, setBalance} = getBalance(500)

    useEffect(() => {
        if(route.params?.CurrentBalance){
            setBalance(route.params?.CurrentBalance)
        }
    }, [route.params?.CurrentBalance])

    const {isDark, setIsDark} = DarkMode()

    const handleDarkMode = () => {
        if (isDark)
        {
            setIsDark(false)
        }
        else
        {
            setIsDark(true)
        }
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isDark ? 'black' : COLORS.lightWhite}]}>
            <StatusBar translucent={true}></StatusBar>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                style={{
                    flex: 1,
                    padding: SIZES.medium,
                }}
                >
                
                </View>
            
            <View style={styles.searchContainer}>
                <Image 
                  source={images.logo}
                  style={styles.logo}
                />
                <View style={[styles.searchWrapper, {backgroundColor: isDark ? 'black': COLORS.white}]}>
                  <TextInput
                      style={styles.searchInput}
                      value={searchTerm}
                      onChangeText={(text) => setSearchTerm(text)}
                      placeholder='Search Product..'
                      placeholderTextColor={isDark ? COLORS.lightWhite : 'gray'}
                  />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={async () => {
                    try {
                        await mutateAsync()
                        } 
                    catch (e) {
                        console.log(e);
                    }}}
                >
                <Image
                    source={icons.search}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                />
                </TouchableOpacity>
            </View>

            <BalanceContainer balance={balance} />
            
            {/* Product Content */}
            <View>
                <View style={styles.prodBtns}>
                    <TouchableOpacity style={styles.myProdBtn} onPress={() => navigation.push('MyProducts', {isDark: isDark})}>
                        <Text style={[styles.textStyle, {color: isDark ? COLORS.lightWhite : 'black'}]}>My Products</Text>
                        <MaterialIcons name='receipt-long' size={18} color={isDark ? COLORS.lightWhite : 'gray'} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', width: '20%', justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => handleDarkMode()}>
                            <FontAwesome5 name="yin-yang" size={18} color={isDark ? COLORS.lightWhite : 'gray'}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => isList ? setIsList(false) : setIsList(true)}
                        >
                            {isList? <Feather name='grid' size={18} color={isDark ? COLORS.lightWhite : 'gray'}/>: <Entypo name='list' size={18} color={isDark ? COLORS.lightWhite : 'gray'}/>}
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{
                    flexWrap: isList ? 'nowrap': 'wrap', 
                    flexDirection: isList ? 'column': 'row',
                    gap: isList ? 0 : 15
                }}>
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : data ? (
                        data.map((product: {
                            id: number,
                            title: string,
                            price: number,
                            description: string,
                            category: string,
                            image: string,
                            rating: {
                                rate: number,
                                count: number
                            }
                        }) => {
                            return (
                                <TouchableOpacity key={product.id} 
                                style={[
                                    styles.listContainer, 
                                    {width: isList ? 'auto': '47%',
                                    height: isList ? 'auto': '11%',
                                    marginVertical: isList ? SIZES.small: 0,
                                    backgroundColor: isDark ? 'black': COLORS.lightWhite,
                                    shadowColor: isDark ? COLORS.lightWhite : 'black'
                                }]}
                                onPress={() => handleOnPress(product.id)}
                                >
                                    <View style={{
                                        flexDirection: isList ? 'row': "column", 
                                        gap: 12, alignItems: 'center',
                                        backgroundColor: isDark ? 'black': COLORS.lightWhite
                                    }}>
                                        <Image source={{uri: product.image}} style={[
                                            styles.productImage,{
                                            width: isList ? 40: '80%',
                                            height: isList ? 40: 80,
                                            objectFit: "contain"
                                        }]}/>
                                        <View style={{
                                            gap: 5,
                                            flex: 1,
                                            height: isList ? 70: 100,
                                            backgroundColor: isDark ? 'black': COLORS.lightWhite
                                         }}>
                                            <Text style={{
                                                fontFamily: FONT.bold, textAlign: "justify", height: isList? '80%': '100%',
                                                color: isDark ? COLORS.lightWhite : 'black'
                                            }}>
                                                {product.title}
                                            </Text>
                                            <View style={{flexDirection: 'row', backgroundColor: isDark ? 'black': COLORS.lightWhite}}>
                                                <Image 
                                                    source={icons.coinHome}
                                                    style={styles.bCImage}
                                                />
                                                <Text style={{
                                                    alignSelf: isList ? 'flex-start': "flex-end", 
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
                            <Text>'Unable to fetch data.. Please Check
                                Your Internet Connection..'</Text>
                        ) 
                    }
                </View>
            </View>
        </ScrollView>
            <View style={[styles.eggContainerHome, {backgroundColor: isDark ? 'black' : COLORS.lightWhite, shadowColor: isDark ? COLORS.lightWhite : 'black'}]}>
                <TouchableOpacity onPress={() => navigation.navigate('Subgame', {balance: balance, isDark: isDark})}>
                        <Image source={images.egg} style={[styles.eggBtnHome, {backgroundColor: isDark ? 'black' : COLORS.lightWhite}]} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20
    },
    logo: {
        width: 20,
        height: 30,
        alignSelf: 'center',
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        // marginTop: SIZES.large,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
    },
    searchInput: {
        fontFamily: 'Urbanist-Regular',
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: COLORS.white,
    },
    listContainer: {
        width: 'auto',
        padding: SIZES.xLarge,
        backgroundColor: 'white',
        borderRadius: SIZES.medium,
        ...SHADOWS.medium,
        },
    productImage: {
        width: 40,
        height: 40,
        margin: 1,
    },
    textStyle: {
        fontFamily: FONT.regular,
        fontSize: 12,
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
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginTop: 10,
    },
    eggBtnHome: {
        width: 40,
        height: 40,
        objectFit: "contain",
    },
    eggContainerHome: {
        padding: 20,
        borderRadius: 60,
        position: 'absolute',
        right: 15,
        bottom: 30,
        backgroundColor: COLORS.lightWhite,
        ...SHADOWS.medium,
    },
    bCImage: {
        width: 15,
        height: 15,
        margin: 1,
        alignSelf: 'center',
    },
});


