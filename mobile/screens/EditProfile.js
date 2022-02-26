import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from "axios"
import config from "../config"
import Footer from '../components/Footer';

const Editprofile = ({ navigation }) => {
    const [userData, setUsetData] = useState()

    const getProfile = () => {
    }
    return (
        <View style={{ height: "100%" }}>
            <ScrollView>
                <Text>Edit profile</Text>
            </ScrollView>
            <Footer active="Settings" navigation={navigation} />
        </View>

    );
}

const styles = StyleSheet.create({})

export default Editprofile;
