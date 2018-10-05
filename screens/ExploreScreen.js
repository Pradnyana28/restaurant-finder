import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableHighlight, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainColor, SecondColor } from '../components';
import axios from 'axios';

import Carousel from '../components/Carousel';
import Spinner from '../components/KNSpinner';

import Image from 'react-native-image-progress';
import { SERVER_URL, PROJECT_NAME } from 'react-native-dotenv';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class ExploreScreen extends Component {
    state = { featured: [], seafood: [], local: [], isReady: false };

    static navigationOptions = ({ navigation }) => ({
        title: PROJECT_NAME,
        tabBarLabel: 'Explore',
        headerStyle: {
            // marginTop: (Platform.OS === 'android') ? 24 : 0,
            backgroundColor: MainColor
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerRight: (
            <View style={{ marginHorizontal: 10 }}>
                <Icon
                name="search"
                color='#FFF'
                onPress={() => navigation.navigate('search')}
                />
            </View>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="explore"
                type="material"
                color={tintColor}
            />
        )
    });

    async componentWillMount() {
        /**
         * Get all List
         * @param response to get a http response
         */
        await axios.all([this.streamFeaturedData(), this.streamCategoryData("Seafood"), this.streamCategoryData("Local Restaurants")])
            .then(axios.spread((featured, seafood, local) => {
                this.setState({
                    featured: featured.data,
                    seafood: seafood.data,
                    local: local.data
                });
            }));

        this.setState({ isReady: true });
    }

    // HTTP request from server
    streamFeaturedData() {
        return axios.get(SERVER_URL, {
            params: { p: "restaurants", type: "featured" }
        });
    }

    streamCategoryData(type) {
        return axios.get(SERVER_URL, {
            params: { p: "restaurants", type: "getByCategory", value: type }
        });
    }

    // Get Featured data
    getFeaturedData() {
        if (this.state.featured.result) {
            return <Carousel data={this.state.featured.result} navigation={this.props.navigation} />;
        }
    };

    getContentView(name, data) {
        const title_detail = SCREEN_WIDTH / 2;

        return(
            <View style={styles.categoryWrapperView}>
                <View style={{ width: SCREEN_WIDTH }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={[styles.categoryNameView, { width: title_detail }]}>{name.toUpperCase()}</Text>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('category', { name: name })}
                        underlayColor='transparent'
                        activeOpacity={6}
                    >
                        <Text style={{ width: title_detail, textAlign: 'right', paddingRight: 20, color: SecondColor }}>Lihat Semua</Text>
                    </TouchableHighlight>
                </View>
                </View>

                <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                >
                {data.map((row, index) => {
                    return(
                        <TouchableHighlight
                            key={row.id}
                            onPress={() => this.props.navigation.navigate('detail', { id: row.id, name: row.title })}
                            underlayColor='rgba(255,255,255,0.6)'
                        >
                            <View
                            style={styles.categoryView}
                            >
                            <Image
                                source={{ uri: row.image }}
                                style={[styles.categoryImageView, { borderRadius: 8 }]}
                            />
                            <Text style={[styles.categoryTitleView, { color: SecondColor }]}>{row.title}</Text>
                            <Text style={styles.categoryDescriptionView}>{row.description}</Text>
                                <View
                                    style={{ flex: 1, position: 'absolute', left: 0, top: 0, width: SCREEN_WIDTH - 90, height: SCREEN_WIDTH / 2, alignItems: 'flex-end' }}                                
                                >
                                    <Icon 
                                        raised
                                        name="heart-o"
                                        type="font-awesome"
                                        color="#000"
                                        onPress={() => alert('Favorite me!')}
                                        underlayColor={SecondColor}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                })}
                </ScrollView>
            </View>
        );
    }

    // Get seafood data
    getSeafoodData() {
        if (this.state.seafood.result) {
            return this.getContentView('Seafood', this.state.seafood.result.data);
        }
    }

    getLocalRestaurantData() {
        if (this.state.local.result) {
            return this.getContentView('Local Restaurants', this.state.local.result.data);
        }
    }

    render() {
        const getStatusBar = Platform.OS === 'android' ? (
            <StatusBar translucent={false} barStyle="default" />
        ) : (
            <StatusBar translucent={false} barStyle="light-content" />
        );

        if (!this.state.isReady) {
            return <Spinner />;
        }

        return(
            <View>
                {getStatusBar}
                <View style={styles.container}>
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.featured}>
                        {this.getFeaturedData()}
                    </View>

                    {/* Show Seafood Category */}
                    <View>{this.getSeafoodData()}</View>
                    {/* Show Local Restaurants Category */}
                    <View>{this.getLocalRestaurantData()}</View>
                </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: "#FFF",
        width: SCREEN_WIDTH,
        height: DEVICE_HEIGHT
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: DEVICE_HEIGHT - 130
    },
    featured: {
        position: 'relative',
        width: SCREEN_WIDTH,
        height: (DEVICE_HEIGHT / 2) - 50,
        top: 0,
        left: 0,
        backgroundColor: "#000"
    },
    categoryWrapperView: {
        paddingTop: 20,
        paddingBottom: 20
    },
    categoryNameView: {
        fontSize: 250 / 24,
        fontWeight: 'bold',
        color: 'grey',
        paddingBottom: 15,
        paddingLeft: 20
    },
    categoryView: {
        flex: 1,
        width: 250,
        paddingRight: 10,
        marginRight: 20
    },
    categoryImageView: {
        width: 250,
        height: 350 / 2
    },
    categoryTitleView: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5
    },
    categoryDescriptionView: {
        fontSize: 17,
        width: 240
    }
}

export default ExploreScreen;
