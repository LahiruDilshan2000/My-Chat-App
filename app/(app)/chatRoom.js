import {Text, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import ChatRoomHeader from "../../components/chat.room.header";

export default function ChatRoom() {

    const item = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className={'flex-1 bg-white'}>
            <StatusBar style={'dark'}/>
            <ChatRoomHeader user={item} router={router}/>
            <View className={'h-3 border-b border-b-neutral-300'}></View>
            <View className={'flex-1 justify-between bg-neutral-100 overflow-visible'}>
                <View className={'flex-1'}>
                    <MessageList/>
                </View>
            </View>
        </View>
    )
}