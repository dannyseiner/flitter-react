import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import Footer from '../components/Footer'
const Chat = ({ navigation }) => {
    return (
        <View>
            <View style={styles.container}>
                <Text>Chat</Text>
                <ScrollView>
                    <Text>Message1</Text>
                    <Text>Message2</Text>
                    <Text>Message3</Text>

                </ScrollView>
                <TextInput placeholer="message" />
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
