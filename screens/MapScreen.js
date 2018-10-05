import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MainColor } from '../components';

import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
    state = {
        region: {
            longitude: 114.790,
            latitude: -8.455,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        },
        results: []
    }

    static navigationOptions = {
        title: 'Map',
        tabBarLabel: 'Map',
        headerStyle: {
            backgroundColor: MainColor
        },
        headerTitleStyle: {
            color: 'white'
        },
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="place"
                type="material"
                color={tintColor}
            />
        )
    }

    renderMarker() {
        if (this.state.results.length > 0) {
            return (
                this.state.results.map(marker => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={{ latitude: Number(marker.location.latitude), longitude: Number(marker.location.longitude) }}
                        title={marker.title}
                        description={marker.description}
                    >
                        <MapView.Callout onPress={() => this.props.navigation.navigate('detail', { id: marker.id, name: marker.title })} />
                    </MapView.Marker>
                ))
            );
        }
    }

    onRegionChangeComplete = (region) => {
        console.log(region);
        this.setState({ region });
        this.props.fetchMerchant(region, () => {});
        if (this.props.merchant.data) {
            this.setState({ results: this.props.merchant.data });
        }
    }

    onButtonPress = () => {
        this.props.fetchMerchant(this.state.region, () => {
            // Redirect to list view screen
            this.props.navigation.navigate('list');
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <MapView 
                    style={{ flex: 1 }} 
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    customMapStyle={mapStyle}
                >
                    {this.renderMarker()}
                </MapView>
                <View style={styles.buttonStyle}>
                    <Button 
                        title="List View"
                        icon={{ name: 'filter-list' }}
                        textStyle={{ fontWeight: "700" }}
                        onPress={this.onButtonPress}
                        buttonStyle={{
                            backgroundColor: MainColor,
                            width: 150,
                            borderRadius: 25,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 1,
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
   container: {
       flex: 1
   },
   buttonStyle: {
       position: 'absolute',
       bottom: 20,
       right: 0,
       left: 0,
       alignItems: 'center'
   }
}

const mapStyle = mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#ebe3cd"
        }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#523735"
        }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
        {
            "color": "#f5f1e6"
        }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#c9b2a6"
        }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#dcd2be"
        }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#ae9e90"
        }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#dfd2ae"
        }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#dfd2ae"
        }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#93817c"
        }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
        {
            "color": "#a5b076"
        }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#447530"
        }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#f5f1e6"
        }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#fdfcf8"
        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#f8c967"
        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#e9bc62"
        }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#e98d58"
        }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#db8555"
        }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#806b63"
        }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#dfd2ae"
        }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#8f7d77"
        }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
        {
            "color": "#ebe3cd"
        }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#dfd2ae"
        }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
        {
            "color": "#b9d3c2"
        }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#92998d"
        }
        ]
    }
    ];

function mapStateToProps({ merchant }) {
    return { merchant: merchant.result }
}

export default connect(mapStateToProps, actions)(MapScreen);
