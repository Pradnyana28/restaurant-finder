import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import { Icon } from 'react-native-elements';
import { MainColor, SecondColor, ThirdColor, FourthColor } from './Colors';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window'); 

class KNCard extends Component {
    handleFavorite (event, topicId) {
        console.log(topicId)
    }

    render() {
        const { onPress, image, title, description, address, checked, id } = this.props;
        const favorites = checked === true ? 
            <Icon 
                raised
                name="heart"
                type="font-awesome"
                color={FourthColor}
                onPress={(event) => this.handleFavorite(event, id)}
                underlayColor={SecondColor}
            /> : 
            <Icon 
                raised
                name="heart-o"
                type="font-awesome"
                color="#000"
                onPress={(event) => this.handleFavorite(event, id)}
                underlayColor={SecondColor}
            />;

        return(
            <TouchableHighlight 
                onPress={onPress}
                underlayColor='rgba(255,255,255,0.6)'
            >
                <View
                    style={[styles.listWrapper, { 
                            backgroundColor: 'white',
                            borderRadius: 2,
                            shadowOpacity: 0.8,
                            shadowRadius: 8,
                            shadowColor: 'black',
                            shadowOffset: {
                                height: 0,
                                width: 0
                            },
                            elevation: 2
                        }]}
                >
                    <Image 
                        source={{ uri: image }}
                        style={{ width: SCREEN_WIDTH - 16, height: SCREEN_WIDTH / 2 }}
                    />
                    <View
                        style={{ padding: 10 }}
                    >
                        <Text style={{ fontSize: SCREEN_WIDTH / 14, color: SecondColor, fontWeight: 'bold' }}>{title}</Text>
                        <Text style={{ fontSize: SCREEN_WIDTH / 24 }}>{description}</Text>
                        <View style={{ width: SCREEN_WIDTH - 16, paddingTop: 10, flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: SCREEN_WIDTH / 12 }}><Icon name="map-o" type="font-awesome" size={12} /></View>
                            <View style={{ width: SCREEN_WIDTH - ( SCREEN_WIDTH / 12 ), marginTop: -2 }}><Text style={{ fontSize: 12 }}>{address}</Text></View>
                        </View>
                    </View>

                    <View
                        style={{ flex: 1, position: 'absolute', left: 0, top: 0, width: SCREEN_WIDTH - 16, height: SCREEN_WIDTH / 2, alignItems: 'flex-end' }}                                
                    >
                        {favorites}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    listWrapper: {
        width: SCREEN_WIDTH - 16,
        marginHorizontal: 8,
        marginVertical: 8
    }
}

export default KNCard;