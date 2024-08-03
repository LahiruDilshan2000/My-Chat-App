import {Pressable, Text, View} from "react-native";
import {Stack} from "expo-router";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image} from "expo-image";
import {blurhash} from "../util/commen";


export default function ChatRoomHeader({user, router}) {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#4FADC0',
                },
                headerLeft: () => {
                    return (
                        <View className={'flex-col items-start gap-2 pt-4 pb-7 pl-4'}>
                            <Pressable onPress={() => router.back()} className={'pb-4'}>
                                <Entypo name="chevron-left" size={hp(3.5)} color="#88ccd8"/>
                            </Pressable>
                            <View className={'flex-row items-center gap-3'}>
                                <Image
                                    source={{uri: user?.profileUrl}}
                                    style={{height: hp(4.7), aspectRatio: 1, borderRadius: 100, }}
                                    transition={500}
                                    placeholder={blurhash}
                                />
                                <Text style={{fontSize: hp(2.5)}} className={'text-white font-medium'}>
                                    {user?.username}
                                </Text>
                            </View>
                        </View>
                    );
                },
                headerRight: () => {
                    return (
                        <View className={'flex-col items-end gap-2 pt-4 pb-8 pr-3'}>
                            <View className={'pb-4'}>
                                <AntDesign name={'search1'} size={hp(2.5)} color={'#88ccd8'}/>
                            </View>
                            <View className={'flex-row items-center gap-3'}>
                                <View className={'bg-[#88ccd8] rounded-full w-12 aspect-square justify-center items-center'}>
                                    <Ionicons name={"call"} size={hp(2.5)} color={"white"}/>
                                </View>

                                <View className={'bg-[#88ccd8] rounded-full w-12 aspect-square justify-center items-center'}>
                                    <Ionicons name={"videocam"} size={hp(2.5)} color={"white"}/>
                                </View>
                            </View>
                        </View>
                    );
                },
            }}
        />
    )
}
