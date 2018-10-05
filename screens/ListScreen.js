import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainColor } from '../components';

import { connect } from 'react-redux';
import KNCard from '../components/KNCard';

class ListScreen extends Component {
    state = {
        results: []
    }

    static navigationOptions = {
        title: 'Sekitar Anda',
        tabBarLabel: 'Map',
        headerStyle: {
            backgroundColor: MainColor
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: "white",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="place"
                type="material"
                color={tintColor}
            />
        )
    }

    renderMerchantList() {
        const { merchant } = this.props;
        if (merchant.data) {
            return(
                merchant.data.map(row => (
                    <KNCard 
                        key={row.id}
                        title={row.title}
                        image={row.image}
                        description={row.description}
                        address={row.address}
                        onPress={() => this.props.navigation.navigate('detail', { id: row.id, name: row.title })}
                    />
                ))
            );
        }
    }

    render() {
        return(
            <ScrollView style={styles.container} ref="scrollView">
                {this.renderMerchantList()}
            </ScrollView>
        );
    }
}

const styles = {
   container: {
      flex: 1
   }
}

function mapStateToProps({ merchant }) {
    return { merchant: merchant.result }
}

export default connect(mapStateToProps)(ListScreen);
