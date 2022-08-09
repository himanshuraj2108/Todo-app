import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
const Header = () => {
    return (
        <View >
            <Text style={styles.text}> My Todos </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 30,

    },
})
export default Header;