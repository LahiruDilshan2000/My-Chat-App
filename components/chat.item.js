import { Pressable, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image} from "expo-image";
import {blurhash, formatDate, getRoomId} from "../util/commen";
import {useEffect, useState} from "react";
import {collection, doc, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebaseConfig";

export default function ChatItem({item, index, router, noBorder, currentUser}){

    const [lastMessage, setLastMessage] = useState(undefined);

    useEffect(() => {

        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map( doc => {
                return doc.data();
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        });
        return unsub;
    }, []);

    const openChatRoom = () => {
        router.push({pathname: 'chatRoom', params: item});
    }

    // console.log('last messages', lastMessage);

    const renderTime = () => {
        if (lastMessage){
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000));
        }
    }

    const renderLastMessage = () => {
        if (typeof lastMessage === 'undefined') return 'Loading...';
        if (lastMessage){
            if (currentUser?.userId === lastMessage?.userId) return 'You: '+ lastMessage?.text;
            return lastMessage?.text;
        }else {
            return 'Say Hi 👋';
        }
    }
    return(
        <Pressable
            onPress={openChatRoom}
            className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-3 ${!noBorder && 'border-b-[1px] border-b-neutral-200'}`}>
            {/*<Image
                source={require('../assets/images/wadawdwd.jpg')}
                // source={{uri: item?.profileUrl}}
                style={{height: hp(6), width: hp(6)}}
                className={'rounded-full'}
            />*/}
            <Image
                source={item?.profileUrl}
                style={{height: hp(7), width: hp(7), borderRadius: 100}}
                placeholder={blurhash}
                transition={500}
            />
            <View className={'flex-1 gap-1'}>
                <View className={'flex-row justify-between'}>
                    <Text style={{fontSize: hp(2)}} className={'font-semibold text-neutral-600'}>{item?.username}</Text>
                    <Text style={{fontSize: hp(1.7)}} className={'font-medium text-neutral-400'}>
                        {renderTime()}
                    </Text>
                </View>
                <View>
                    <Text style={{fontSize: hp(1.6)}} className={'font-medium text-neutral-400'}>
                        {renderLastMessage()}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}
