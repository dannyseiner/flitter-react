import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import config from '../config'
const PostScreen = ({ route, navigation }) => {
    const post = route.params
    console.log(post.render_user_image)
    post.render_user_image = post.render_user_image.replace(/\s/g, '');

    return (
        <View>
            <Text style={styles.postTitle}>{post.post_title}</Text>
            <Text style={styles.postCreated}>{new Date(post.post_created).toLocaleDateString("en-US", config.date_format)}</Text>
            <View style={styles.postHeader}>
                <Image
                    style={styles.profileImagse}
                    source={{
                        uri: post.render_user_image,
                    }}
                />

                <Text
                    title={post.account_name}
                    style={styles.postHeaderName}
                    onPress={() => navigation.navigate('Profile', post)}>
                    {post.account_name}
                </Text>
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postContentText}>{post.post_content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postTitle: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold"
    },
    profileImagse: {
        width: 60,
        height: 60,
        borderRadius: 100,
        left: 80
    },
    postHeaderName: {
        textAlign: "center",
        right: -30,
        top: -50,
        fontSize: 30
    },
    postCreated: {
        textAlign: "center"
    },
    postHeader: {
        marginTop: 30
    },
    postContent: {
        padding: 15,
    },
    postContentText: {
        fontSize: 20
    }

})

export default PostScreen;