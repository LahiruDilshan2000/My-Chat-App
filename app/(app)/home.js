import {View, Text, Button, ActivityIndicator} from "react-native";
import {useAuth} from "../../constants/authContext";
import {useState} from "react";
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Home() {

    const {logout, user} = useAuth();
    const [users, setUsers] = useState([1, 2, 3])

    const handleLogout = async () => {
        await logout();
    }

    console.log("loginin uer", user)
    return (
        <View className={'flex-1 bg-white'}>
            <StatusBar style={'light'}/>
            {
                users.length > 0 ? (
                    <ChatList users={users}/>
                    ) :
                    (
                        <View style={{paddingTop: hp(30)}} className={'flex items-center'}>
                            <ActivityIndicator size={'large'}/>
                        </View>
                    )
            }
        </View>
    )
}
