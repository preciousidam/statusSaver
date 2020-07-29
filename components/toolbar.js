import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ToolbarComponent = props => {
    return (
        <View style={styles.toolbar}>
            <Ionicons name='md-save' size={30} color='#fff' style={styles.icons} onPress={props.save} />
            <Ionicons name='md-share' size={30} color='#fff' style={styles.icons} onPress={props.share} />
            <Ionicons name='md-trash' size={30} color='#fff' style={styles.icons} onPress={props.delete} />
        </View>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    icons: {
        marginHorizontal: 10,
    }
})