import {Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ChatItem({item, index, router, noBorder}){
    return(
        <Pressable
            className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${!noBorder && 'border-b border-b-neutral-200'}`}>
            <Image
                source={require('../assets/images/wadawdwd.jpg')}
                // source={{uri: item?.profileUrl}}
                style={{height: hp(6), width: hp(6)}}
                className={'rounded-full'}
            />
            <View className={'flex-1 gap-1'}>
                <View className={'flex-row justify-between'}>
                    <Text style={{fontSize: hp(1.8)}} className={'font-semibold text-neutral-800'}>Nomi</Text>
                    <Text style={{fontSize: hp(1.6)}} className={'font-medium text-neutral-500'}>Time</Text>
                </View>
                <View>
                    <Text style={{fontSize: hp(1.6)}} className={'font-medium text-neutral-500'}>Last message</Text>
                </View>
            </View>
        </Pressable>
    )
}
