import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
    const singOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate("Login")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View>
            <ScrollView style={styles.container}>
                <Text>Settings</Text>
                <Button
                    title="Sign out"
                    onPress={() => singOut()}
                />
            </ScrollView>
            <Footer active="Settings" navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default Settings;
