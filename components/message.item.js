import {Text, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {formatDate} from "../util/commen";

export default function MessageItem({message, currentUser}){

    if (currentUser?.userId===message?.userId){
        // my message
        return (
            <View className={'flex-row mb-3 mr-3 justify-end'}>
                <View style={{width: wp(80)}}>
                    <View className={'flex self-end py-3 px-4 rounded-3xl bg-neutral-100 border border-neutral-200'}>
                        <Text style={{fontSize: hp(2)}} className={'text-neutral-700'}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }else {
        return (
            <View style={{width: wp(80)}} className={'ml-3 mb-3'}>
                <View className={'flex self-start p-3 px-4 rounded-3xl bg-[#daf0f3]'}>
                    <Text style={{fontSize: hp(2)}} className={'text-neutral-700'}>
                        {
                            message?.text
                        }
                    </Text>
                </View>
            </View>
        )
    }
}
