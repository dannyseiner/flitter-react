import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Button } from 'react-native';
import Footer from '../components/Footer';
import axios from "axios"
import config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {
    const [data, setData] = useState({
        decoded_image: ""
    })

    const params = route.params
    console.log(params)
    useEffect(() => {
        if (params === undefined) {
            getLoggedUser(2)
        } else {
            getLoggedUser(params)
        }
    }, [id])
    const getLoggedUser = async (id) => {
        try {
            const getData = await AsyncStorage.getItem('user')
            axios.get(`${config.restapi}/user/${id}`)
                .then(response => setData(response.data[0]))
        } catch (e) {
            console.log(e)
        }
    }

    console.log(data.decoded_image)

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.decoded_image === undefined ? <></> : data.decoded_image === "" ? <></> :
                    <Image
                        style={styles.image}
                        source={{
                            uri: data.decoded_image.replace(/\s/g, ''),
                        }}
                    />}
                <Text style={styles.name}>{data.account_name}</Text>
                <Text>{JSON.stringify(data)}</Text>
            </ScrollView>
            <Footer navigation={navigation} active={"Profile"} />
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
