import React, { useState, useEffect } from 'react';
import { View, Button, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
                <Text style={{ marginBottom: 20 }}></Text>

                <SetingsBlock data={{ name: "Private Profile" }} checked />
                <SetingsBlock data={{ name: "Flitter Maps" }} />


                <Button
                    title="Sign out"
                    onPress={() => singOut()}
                />
            </ScrollView>
            <Footer active="Settings" navigation={navigation} />
        </View>
    );
}

const SetingsBlock = ({ data, checked = false }) => {
    const [state, setState] = useState(checked)

    const updateStatus = () => {

    }

    return (
        <View style={styles.containerBlock}>
            <Text style={styles.textBlock}>{data.name}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#00aced" }}
                style={{ alignSelf: 'flex-end', top: -10 }}
                onValueChange={e => setState(e)}
                value={state}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    containerBlock: {
        width: "90%",
        left: "5%",
        padding: 10,
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 9
    },
    textBlock: {
        color: "black",
        left: 10,
        fontSize: 17,
        top: 14,
        fontWeight: "600"
    }
})

export default Settings;
