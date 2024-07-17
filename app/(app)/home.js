import {View, Text, Button} from "react-native";
import {useAuth} from "../../constants/authContext";

export default function Home() {

    const {logout, user} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    console.log("loginin uer", user)
    return (
        <View>
            <Text>Home</Text>
            <Button onPress={handleLogout} title={"Sign out"}/>
        </View>
    )
}
