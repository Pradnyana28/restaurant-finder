import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { Font } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class CategoryList extends Component {
   state = { data: [] };

   componentWillMount() {
      axios.get('http://kuliner.nusapenidaislands.com/request', {
         params: {
            p: "restaurants",
            type: this.props.catType,
            value: this.props.typeValue
         }
      })
         .then(response => this.setState({ data: response }));
   }

   componentDidMount() {
      Font.loadAsync('Roboto', require('../assets/fonts/Roboto-Medium.ttf'));
   }

   // Get seafood data
   getCategoryData(name) {
      if (this.state.data.result) {
         return(
            <View style={styles.categoryWrapperView}>
               <Text style={styles.categoryNameView}>{name}</Text>
               <ScrollView
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
               >
                  {this.state.data.result.map((row, index) => {
                     return(
                        <View
                           key={row.id}
                           style={styles.categoryView}
                        >
                           <Image
                              source={{ uri: row.image }}
                              style={styles.categoryImageView}
                           />
                           <Text style={styles.categoryTitleView}>{row.title}</Text>
                           <Text style={styles.categoryDescriptionView}>{row.description}</Text>
                        </View>
                     );
                  })}
               </ScrollView>
            </View>
         );
      }
   }

   render() {
      return(
         <View>{this.getCategoryData(this.props.name)}</View>
      );
   }
}

const styles = {
   categoryWrapperView: {
      paddingTop: 20
   },
   categoryNameView: {
      fontSize: SCREEN_WIDTH / 12,
      paddingBottom: 15,
      paddingLeft: 20
   },
   categoryView: {
      flex: 1,
      width: SCREEN_WIDTH,
      paddingLeft: 20,
      paddingRight: 20
   },
   categoryImageView: {
      width: SCREEN_WIDTH - 40,
      height: SCREEN_WIDTH / 2,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 6
   },
   categoryTitleView: {
      fontSize: (SCREEN_WIDTH / 12) - 5,
      fontWeight: 'bold',
      paddingTop: 5,
      paddingBottom: 5,
      fontFamily: 'Roboto'
   },
   categoryDescriptionView: {
      fontFamily: 'Roboto'
   }
}

export default CategoryList;
