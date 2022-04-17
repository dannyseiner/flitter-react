import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated, TextInput, Alert } from 'react-native';
import { Icon } from "react-native-elements"
import SwipeCards from "react-native-swipe-cards-deck";
import AwesomeAlert from 'react-native-awesome-alerts';

const Marketplace = ({ navigation }) => {
    const [swipe, setSwipe] = useState(0)
    const [alert, setAlert] = useState(false)
    const [items] = useState([
        <Item data={{
            author: "Lukas Krill",
            name: "Macbook Ultra i3 1.9tdi",
            image: "https://i.pinimg.com/236x/7f/45/70/7f457078fdbfe0d7994dd5f67fd150d8--pink-pink-pink-pink-color.jpg",
            price: "999.99",
            description: "Lorem inpsun",
            verified: true,
            created: "10/2/2022",
            badges: ["Notebook", "Apple", "New"]
        }} navigation={navigation} />,
        <Item data={{
            author: "John Smith",
            name: "iPhone WishR",
            image: "https://icdn.digitaltrends.com/image/digitaltrends/fake-iphone-5-1.jpg",
            price: "499.99",
            description: "Lorem inpsun",
            verified: false,
            created: "10/2/2022",
            badges: ["Mobile", "Apple", "Stonks"]
        }} navigation={navigation} />,
        <Item data={{
            author: "Potter",
            name: "iPhone stonksR",
            image: "https://cdn.24net.cz/1/obrazek/samsung-galaxy-mini-88732",
            price: "15",
            description: "Lorem inpsun",
            verified: false,
            created: "10/2/2022",
            badges: ["Mobile", "Apple", "New"]
        }} navigation={navigation} />
    ])
    const [index, setIndex] = useState(0)

    const loadNewItem = () => {
        if (index !== items.length - 1) {
            setIndex(index + 1)
        }

    }
    const loadPreviousItem = () => {
        if (index !== 0) {
            setIndex(index - 1)
        }
    }

    function handleYup(card) {
        console.log(`Yup for ${card}`);
        return true; // return false if you wish to cancel the action
    }
    function handleNope(card) {
        console.log(`Nope for ${card}`);
        return true;
    }
    function handleMaybe(card) {
        console.log(`Maybe for ${card}`);
        return true;
    }

    return (
        <View style={{ marginTop: 35, height: "100%" }}>
            {/* ALERT */}
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="This product is verified!"
                message="We have revised this product and seller. Everything is correct!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={false}
                cancelText="No, cancel"
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setAlert(false)
                }}
                onConfirmPressed={() => {
                    setAlert(false)
                }}
            />
            {/* BACKGROUND */}
            <View style={{ position: "absolute", top: -600, left: 0, width: "100%", zIndex: 0, height: 1000, padding: 20, backgroundColor: "#5344db", borderRadius: 100, }}></View>
            {/* MENU */}
            <MenuBlock />
            <SwipeCards
                cards={items}
                renderCard={(cardData) => <Item data={cardData} fce={(e) => setAlert(e)} />}
                keyExtractor={(cardData) => String(cardData.text)}
                renderNoMoreCards={() => <View style={{ backgroundColor: "white", padding: 20, borderRadius: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>There's nothing more to show</Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>Click <Text style={{ color: "#5344db", fontWeight: "bold" }}>here</Text> to browse saved items</Text>
                </View>}
                actions={{
                    nope: { onAction: handleNope },
                    yup: { onAction: handleYup },
                    maybe: { onAction: handleMaybe },
                }}
                hasMaybeAction={true}
                style={{ marginTop: -80 }}
                stack={true}
                stackDepth={3}
            />
            {/* <Animated.View style={{ heihgt: "40%", marginTop: "20%", opacity: fadeValue }}
                onTouchStart={e => setSwipe(e.nativeEvent.pageY)}
                onTouchEnd={e => {
                    if (swipe - e.nativeEvent.pageY > 40) {
                        loadNewItem()//swipe up
                    }
                    else if (swipe - e.nativeEvent.pageY < 180) {
                        loadPreviousItem()
                    }
                }}>
                {items[index]}
            </Animated.View> */}
            {/* FOOTER  */}
            <FooterBlock navigation={navigation} />
        </View>
    );
}

const Item = ({ navigation, data, fce }) => {
    return (
        <View
            style={{ width: "95%", marginTop: 10, marginBottom: 20, backgroundColor: "white", borderRadius: 30 }}>
            {data.props.data.verified ?
                <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: "#5344db", borderRadius: 100, zIndex: 50, position: "absolute", left: 20, top: 370 }}
                    onPress={() => fce(true)}
                >
                    <Icon type="font-awesome" name="star" color={"white"} style={{ marginTop: 13 }} />
                </TouchableOpacity> : <></>}


            <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: "#ff7575", borderRadius: 100, zIndex: 50, position: "absolute", right: 20, top: 370 }}>
                <Icon type="font-awesome" name="heart" color={"white"} style={{ marginTop: 13 }} />
            </TouchableOpacity>
            <Image
                source={{ uri: data.props.data.image }}
                style={{ width: 400, height: 400, zIndex: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}
            />
            <View style={{ padding: 20 }}>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ color: "#242445", fontSize: 23, fontWeight: "bold", width: "50%" }}>{data.props.data.name}</Text>
                    <Text style={{ width: "50%", textAlign: "right", fontSize: 23, fontWeight: "500", color: "#242445" }}>${data.props.data.price}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#cfd4dd", fontSize: 13, fontWeight: "bold", width: "50%" }}>{data.props.data.author}</Text>
                    <Text style={{ width: "50%", textAlign: "right", fontSize: 13, fontWeight: "500", color: "#cfd4dd" }}>{data.props.data.created}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, width: "100%", maxWidth: "100%" }}>
                    {data.props.data.badges.map((i, badge) => (
                        <SectionGoupItem key={i} data={{ name: data.props.data.badges[badge] }} />
                    ))}
                </View>
            </View>
        </View>

    )
}

const SectionGoupItem = ({ navigation, data }) => {
    return (
        <TouchableOpacity style={{ backgroundColor: "#ebf0f8", width: "30%", borderRadius: 60, height: 40, marginLeft: "2.4%" }}>
            <Text style={{ color: "#a9aebd", textAlign: "center", padding: 10, fontSize: 15, }}>{data.name}</Text>
        </TouchableOpacity>
    )
}

const MenuBlock = () => {
    return (
        <View style={{ width: "95%", left: "2.5%", marginTop: 15, flexDirection: "row" }}>
            <TouchableOpacity style={{ width: "5%", marginTop: 14, }}>
                <Icon type="font-awesome" name="bars" color="white" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "75%", marginLeft: "5%" }}>
                <TextInput placeholder="Search" placeholderTextColor={"white"} style={{ padding: 14, textAlign: "center", fontSize: 20, color: "white", borderRadius: 40, }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: "4%", width: "5%", marginTop: 14, }}>
                <Icon type="font-awesome" name="home" color="white" size={25} />
            </TouchableOpacity>
        </View >
    )
}

const FooterBlock = ({ navigation }) => {
    return (
        <View style={{ position: "absolute", bottom: 35, left: 0, width: "100%", height: 80, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, flexDirection: "row" }}>
            <TouchableOpacity style={{ width: "30%", marginLeft: "3.33%", backgroundColor: "#ffebea", height: 40, marginTop: 15, flexDirection: "row", borderRadius: 40 }}>
                <Icon type="font-awesome" name="list" color="#ff8888" style={{ marginLeft: 15, marginTop: 12, }} size={20} />
                <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "500", color: "#ff8888", marginTop: 13, marginLeft: 10, }}>Browse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "30%", marginLeft: "3.33%", height: 40, marginTop: 15, borderRadius: 40 }} onPress={() => navigation.navigate("Home")}>
                <Icon type="font-awesome" name="home" color="#cfd4dd" style={{ marginTop: 10 }} size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "30%", marginLeft: "3.33%", height: 40, marginTop: 15, borderRadius: 40 }}>
                <Icon type="font-awesome" name="user-circle" color="#cfd4dd" style={{ marginTop: 10 }} size={25} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({})

export default Marketplace;
