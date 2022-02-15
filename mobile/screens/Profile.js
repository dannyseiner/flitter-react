import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Button } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {
    const params = route.params
    const [data, setData] = useState({
        decoded_image: ""
    })
    useEffect(() => {
        if (params === undefined) {
            getLoggedUser(null)
        } else {
            getLoggedUser(params)
        }
    }, [])
    const getLoggedUser = async (id) => {
        try {
            const getData = await AsyncStorage.getItem('user')
            axios.get(`${config.restapi}/user/${id === null ? getData : id}`)
                .then(response => setData(response.data[0]))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.decoded_image === undefined ? <></> : data.decoded_image === "" ? <></> :
                    <Image
                        style={styles.image}
                        source={
                            {
                                uri: data.decoded_image.replace(/\s/g, ''),
                            }}
                    />}
                <Text style={styles.name}>{data.account_name}</Text>
                <Text>{JSON.stringify(data)}</Text>
            </ScrollView>
            {params === undefined ? <Footer navigation={navigation} active={"Profile"} /> : <Footer navigation={navigation} active={"Friends"} />}
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 20,
    },
    image: {
        marginTop: 40,
        width: 100,
        height: 100,
        borderRadius: 100,
        left: "39%"
    },
    container: {
        height: "100%"
    }

})

export default Profile;
