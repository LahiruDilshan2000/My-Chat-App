import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert} from "react-native";
import React, {useRef, useState} from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StatusBar} from "expo-status-bar";
import {Feather, Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/custom.keyboard.view";
import {useAuth} from "../constants/authContext";


export default function SignUp() {

    const router = useRouter();
    const {register} = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fil all the fields!");
            return;
        }

        setLoading(true);
        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
        setLoading(false);
       // console.log('got result', response);
        if (!response.success){
            Alert.alert("Sign Up", response.msg);
        }

    }
    return (
        <CustomKeyboardView>
            <View className={'flex-1'}>
                <StatusBar style="light"/>
                <View style={{paddingTop: hp(10)}} className={"flex gap-12 bg-[#193948]"}>
                    <View className={'px-8'}>
                        <Text style={{fontSize: hp(2.3), fontFamily: 'PaytoneOne_400Regular'}}
                              className={'text-white'}>Sign Up</Text>
                    </View>
                    <View className={'bg-white rounded-t-[30px]'}>
                        <View className={"items-center py-3"}>
                            <Image style={{height: hp(25)}} resizeMode={'contain'} source={require('../assets/images/11641790_4753177.jpg')}/>
                        </View>
                        <View>
                            <Text style={{fontSize: hp(4), fontFamily: 'PaytoneOne_400Regular'}}
                                  className={'pb-3 text-[#193948] tracking-wider text-center'}>Start a chat now.</Text>
                        </View>
                        <View className={"gap-4 px-10"}>
                            <View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-6 py-4 bg-neutral-100 items-center rounded-3xl"}>
                                <Feather name={"user"} size={hp(2.7)} color={"#b0b0b0"}/>
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 text-neutral-700"}
                                    placeholder={"User name"}
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-6 py-4 bg-neutral-100 items-center rounded-3xl"}>
                                <Octicons name={"mail"} size={hp(2.7)} color={"#b0b0b0"}/>
                                <TextInput
                                    onChangeText={value => emailRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 text-neutral-700"}
                                    placeholder={"Email Address"}
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-6 py-4 bg-neutral-100 items-center rounded-3xl"}>
                                <Octicons name={"lock"} size={hp(2.7)} color={"#b0b0b0"}/>
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 text-neutral-700"}
                                    placeholder={"Password"}
                                    secureTextEntry={true}
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-6 py-4 bg-neutral-100 items-center rounded-3xl"}>
                                <Feather name={"image"} size={hp(2.7)} color={"#b0b0b0"}/>
                                <TextInput
                                    onChangeText={value => profileRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 text-neutral-700"}
                                    placeholder={"Profile url"}
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <View>
                                {
                                    loading ? (
                                            <View className={'flex-row justify-center'}>
                                                <Loading size={hp(7)}/>
                                            </View>
                                        ) :
                                        (
                                            <TouchableOpacity
                                                onPress={handleRegister}
                                                style={{
                                                    height: hp(7),
                                                    backgroundColor: "#4FADC0",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderRadius: 25,
                                                }} className={"bg-blue-500 p-4 items-center justify-center rounded-xl"}>
                                                <Text style={{fontSize: hp(2.5), fontFamily: 'Poppins_500Medium'}}
                                                      className={"text-white font-bold tracking-wider"}>Sign
                                                    Up</Text>
                                            </TouchableOpacity>
                                        )
                                }
                            </View>

                            <View className={"flex-row justify-center"}>
                                <Text style={{fontSize: hp(1.8)}} className={"tracking-wide font-[400] text-neutral-500"}>Already have
                                    and
                                    account? </Text>
                                <Pressable onPress={() => router.push('signin')}>
                                    <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-[#4FADC0]"}>Sign
                                        In</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
