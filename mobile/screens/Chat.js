import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../components/Footer'
const Chat = ({ navigation }) => {
    return (
        <View>
            <View style={styles.container}>
                <Text>Chat</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default Chat;
