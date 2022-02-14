import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Footer from '../components/Footer';

const Friends = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Friends</Text>
            <Footer navigation={navigation} active={"Friends"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default Friends;
