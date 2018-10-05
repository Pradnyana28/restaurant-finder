import React from 'react';
import { ScrollView, View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import { Icon } from 'react-native-elements';
import { MainColor, SecondColor, ThirdColor, FourthColor } from '../components';

import KNCard from '../components/KNCard';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window'); 

const SearchList = ({ results, navigation }) => {
    if (results.length != 0) {
        const { result, success } = results;
        
        if (success == true) {
            const searchItem = result.data.map(row => (
                <KNCard 
                    key={row.id}
                    title={row.title}
                    image={row.image}
                    description={row.description}
                    address={row.address}
                    onPress={() => navigation.navigate('detail', { id: row.id, name: row.title })}
                />
            ));
    
            return(
                <ScrollView style={{ marginBottom: 55 }} >
                    <View>
                        {searchItem}
                    </View>
                </ScrollView>
            );
        }

        // Handling error from server
        return(
            <View style={{ marginTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: SCREEN_WIDTH / 12, fontWeight: 'bold', textAlign: 'center' }}>Tidak ada rstaurant yang ditemukan.</Text>
            </View>
        );
    }

    // Return null if data is blank
    // Or we can make a search visualisation
    return null;
}

const styles = {
    listWrapper: {
        width: SCREEN_WIDTH - 16,
        marginHorizontal: 8,
        marginVertical: 8
    }
}

export default SearchList;