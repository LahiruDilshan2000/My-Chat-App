import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, Platform, Button} from "react-native";
import React, {useRef, useState} from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StatusBar} from "expo-status-bar";
import {Feather, Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/custom.keyboard.view";
import {useAuth} from "../constants/authContext";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";


export default function SignUp() {


    const router = useRouter();
    const {register} = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [uploadUrl, setUploadUrl] = useState(null);

    const pickImage = async () => {
        // Ask for permission to access camera roll
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        // Pick an image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            let uri = result.assets[0].uri;
            let split = uri.split(".");
            let newFile = {
                uri: uri,
                type: `image/${split[split.length - 1]}`,
                name: `test.${split[split.length - 1]}`
            }
            setImage(uri);
            uploadImage(newFile);
        }
    };

    const uploadImage = async (newFile) => {
        const data = new FormData();
        data.append('file', newFile);
        data.append('upload_preset', 'my_images');
        data.append('cloud_name', 'doqqaxepo');

        try {

            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/doqqaxepo/image/upload',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            profileRef.current = response.data.secure_url;
            //setUploadUrl(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
            if (error.response) {
                console.log('Server responded with status code:', error.response.status);
                console.log('Response data:', error.response.data);
            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error setting up request:', error.message);
            }
        }
    };

    const handleRegister = async () => {

        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fil all the fields!");
            return;
        }

        setLoading(true);
        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
        setLoading(false);
        // console.log('got result', response);
        if (!response.success) {
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
                        <View>
                            <Text style={{fontSize: hp(4), fontFamily: 'PaytoneOne_400Regular'}}
                                  className={'pb-3 py-6 text-[#193948] tracking-wider text-center'}>Start a chat now.</Text>
                        </View>
                        <View className={"gap-4 px-10"}>
                            <View className={"items-center py-3"}>
                                    <Pressable className={'w-[130] overflow-hidden flex-1 items-center justify-center aspect-square bg-neutral-100 rounded-full'}
                                               onPress={pickImage}>
                                        {image ? <Image source={{uri: image}}
                                                        resizeMode={'contain'}
                                                        style={{width: 130, height: 130}}/> :
                                            <View className={"py-4 px-4 bg-white justify-center items-center rounded-3xl"}>
                                                <Feather name={"image"} size={hp(2.9)} color={"#b0b0b0"}/>
                                            </View>
                                        }
                                    </Pressable>
                                {/*<Image style={{height: hp(25)}} resizeMode={'contain'} source={require('../assets/images/11641790_4753177.jpg')}/>*/}
                            </View>

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
                            {/*<View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-6 py-4 bg-neutral-100 items-center rounded-3xl"}>
                                <Feather name={"image"} size={hp(2.7)} color={"#b0b0b0"}/>
                                <TextInput
                                    onChangeText={value => profileRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 text-neutral-700"}
                                    placeholder={"Profile url"}
                                    placeholderTextColor={"gray"}
                                />
                            </View>*/}
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
                                <Text style={{fontSize: hp(1.8)}}
                                      className={"tracking-wide font-[400] text-neutral-500"}>Already have
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
