import {ScrollView, Text, View} from "react-native";
import MessageItem from "./message.item";

export default function MessageList({messages, currentUser}){
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 10}}>
            {
                messages.map((message, index) => {
                   return <MessageItem
                       message={message}
                       currentUser={currentUser}
                       key={index}/>
                })
            }
        </ScrollView>
    )
}
