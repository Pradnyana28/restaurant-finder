import React, { Component } from 'react';
import { View, Text } from 'react-native';

class FooterEnd extends Component {
    render() {
        return(
            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Kuliner Nusantara</Text>
            </View>
        );
    }
}

export default FooterEnd;