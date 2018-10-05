import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MainColor, SecondColor, ThirdColor, FourthColor } from '../components';
import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

import KNCard from '../components/KNCard';
import Spinner from '../components/KNSpinner';
import FooterEnd from '../components/FooterEnd';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class CategoryScreen extends Component {
    state = {
        results: [],
        newResults: [],
        isReady: false,
        loading: false,
        loaded: 0,
        start: 0,
        Yoffset: 0
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
        headerStyle: {
            backgroundColor: MainColor
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: "white",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="settings"
                type="feather"
                color={MainColor}
            />
        )
    });

    async componentWillMount() {
        // new request to server
        await axios.get(SERVER_URL, {
            params: {
                p: 'restaurants',
                type: 'getByCategory',
                value: this.props.navigation.state.params.name
            }
        }).then((response) => {
            this.setState({ 
                results: response.data,
                isReady: true
            });
        });

        if (this.state.results) {
            this.setState({ loaded: this.state.results.result.data.length });
        }
    }

    renderCategoryList() {
        if (this.state.results) {
            return(
                <View>
                    {this.state.results.result.data.map((row) => {
                        return(
                            <KNCard 
                                key={row.id}
                                title={row.title}
                                image={row.image}
                                description={row.description}
                                address={row.address}
                                onPress={() => this.props.navigation.navigate('detail', { id: row.id, name: row.title })}
                            />
                        );
                    })}
                </View>
            );
        }
    }

    async loadMoreRequest() {
        const { loaded, start, results } = this.state;

        await axios.get(SERVER_URL, {
            params: {
                p: 'restaurants',
                type: 'getByCategory',
                value: this.props.navigation.state.params.name,
                start: loaded
            }
        }).then((response) => {
            this.setState({ 
                newResults: response.data,
                loading: !this.state.loading
            });
        });

        this.getAnAction();
    }

    getAnAction() {
        const { results } = this.state;

        if (this.state.newResults) {
            let oldData = results.result.data;
            let newData = this.state.newResults.result.data;

            // Push new array
            let newResults = oldData.concat(newData);

            this.setState({ 
                results: {
                    result: {
                        data: newResults
                    }
                },
                loaded: results.result.data.length 
            });
        }
    }

    loadMore() {
        const { results } = this.state;

        if (results) {
            this.setState({ loading: !this.state.loading });
            // Request new data
            this.loadMoreRequest();
        }
    }

    loadMoreButtonToggle() {
        const { results } = this.state;

        if (results) {
            if (this.state.loaded < results.result.total) {
                return(
                    <View
                        style={{ marginVertical: 20 }}
                    >
                        <Button 
                            raised
                            title="Muat Lagi"
                            loading={this.state.loading}
                            backgroundColor={SecondColor}
                            onPress={() => this.loadMore()}
                        />
                    </View>
                );
            }
        }

        return <FooterEnd />;
    }

    // scrollPageToBottom() {
    //     this.refs.scrollView.scrollTo({ y: this.state.Yoffset });
    // }

    render() {
        if (!this.state.isReady) {
            return <Spinner />;
        }

        return(
            <ScrollView style={styles.container} ref="scrollView">
                {this.renderCategoryList()}

                {/* Load more button */}
                {this.loadMoreButtonToggle()}
            </ScrollView>
        );
    }
}

const styles = {
   container: {
      flex: 1
   }
}

export default CategoryScreen;
