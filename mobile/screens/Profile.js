import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const Profile = ({ route, navigation }) => {
    const params = route.params
    return (
        <View>
            <Text>Profile</Text>
            <Text>{JSON.stringify(params)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: "cyan",
        flexDirection: "row"

    },
    footerBlock: {
        width: "25%",
        height: 80,
        paddingTop: 15,
        backgroundColor: "black",
        color: "white",
        textAlign: "center"
    },
    footerText: {
        color: "cyan",
        textAlign: "center",
        fontWeight: "bold"
    }

})

export default Profile;