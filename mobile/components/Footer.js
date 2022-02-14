import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Footer = ({ navigation, active }) => {
    return (
        <View style={footer.footerContainer}>
            <Block navigation={navigation} active={active} options={{
                name: "search",
                type: "font-awesome",
                text: "Home"
            }} />
            <Block navigation={navigation} active={active} options={{
                name: "user",
                type: "font-awesome",
                text: "Profile"
            }} />
            <Block navigation={navigation} active={active} options={{
                name: "users",
                type: "font-awesome",
                text: "Friends"
            }} />
            <Block navigation={navigation} active={active} options={{
                name: "cog",
                type: "font-awesome",
                style: footer.footerText,
                text: "Settings"
            }} />
        </View>
    );
}

const Block = ({ navigation, active, options }) => {
    return (
        <>
            {active === options.text ? <View style={footer.active}>
                <Icon
                    name={options.name}
                    type={options.type}
                    onPress={() => navigation.navigate(options.text)}
                    color='white' />
                <Text style={footer.activeText}>{options.text}</Text>
            </View> :
                <View style={footer.footerBlock}>
                    <Icon
                        name={options.name}
                        type={options.type}
                        onPress={() => navigation.navigate(options.text)}
                        color='#00aced' />
                    <Text style={footer.footerText}>{options.text}</Text>
                </View>
            }
        </>
    )
}
const footer = StyleSheet.create({
    footerContainer: {
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
    },
    active: {
        width: "25%",
        height: 80,
        paddingTop: 15,
        color: "white",
        textAlign: "center",
        backgroundColor: "#00aced",
    },
    activeText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default Footer;
