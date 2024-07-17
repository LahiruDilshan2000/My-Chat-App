import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";

const android = Platform.OS === 'android';
export default function CustomKeyboardView({children}) {
    return (
        <KeyboardAvoidingView
            behavior={android ? 'height' : 'padding'}
            style={{flex: 1}}>
            <ScrollView
                style={{flex: 1}}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
