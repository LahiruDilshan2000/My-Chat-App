import {FlatList, Text, View} from "react-native";
import ChatItem from "./chat.item";
import {useRouter} from "expo-router";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {AntDesign} from "@expo/vector-icons";

export default function ChatList({users, currentUser}) {

    const router = useRouter();

    return (
        <View className={'flex-1 bg-white rounded-t-[30px]'}>
            <View className={'flex items-center flex-row justify-between px-6 pt-6'}>
                <Text style={{fontSize: hp(2.2)}} className={'text-neutral-600'}>Recent Chats</Text>
                <AntDesign name={'search1'} size={hp(2.8)} color={'#b0b0b0'}/>
            </View>
            <FlatList className={'px-5'}
                data={users}
                contentContainerStyle={{flex: 1, paddingVertical: 25}}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                    <ChatItem
                        noBorder={index + 1 === users.length}
                        item={item}
                        index={index}
                        router={router}
                        currentUser={currentUser}
                    />}
            />
        </View>
    )
}
