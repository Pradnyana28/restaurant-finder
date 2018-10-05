import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, Animated, StyleSheet, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

import { Constants } from 'expo';
import Indicator from './Indicator';
import { MainColor, FourthColor } from './index';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
   state = {
      scroll: new Animated.Value(0)
   };

   render() {
      const position = Animated.divide(this.state.scroll, SCREEN_WIDTH);
      const backgroundColor = position.interpolate({
         inputRange: this.props.data.map((_, i) => i),
         outputRange: this.props.data.map(p => p.color)
      });

      return(
         <View style={{ flex: 1 }}>
            <Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor, opacity: 0.8 } ]} />

            <Animated.ScrollView
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               scrollEventThrottle={16}
               onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.state.scroll } } }]
               )}
            >
               {this.props.data.map((slide, index) => {
                  return(
                     <View key={index} style={styles.page}>
                        <Animated.View
                           key={slide.text.title}
                           style={[ styles.frame, { transform: [{ translateX: Animated.multiply(Animated.add(position, - index), - 200) }] } ]}
                        >
                           <Animated.Image
                              source={slide.image}
                              style={styles.photo}
                           />
                        </Animated.View>

                        <View style={styles.card}>
                           <Text style={styles.slideTextTitle}>{slide.text.title}</Text>
                           <Text style={styles.slideTextDescription}>{slide.text.description}</Text>
                        </View>
                     </View>
                  );
               })}
            </Animated.ScrollView>

            <View style={styles.buttonWrapper}>
               <TouchableHighlight
                  onPress={this.props.onComplete}
                  style={{ width: SCREEN_WIDTH, backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 20 }}
               >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Telusuri Sekarang</Text>
               </TouchableHighlight>
            </View>

            <View style={{ alignItems: 'center' }}>
               <View
                  style={styles.indicator}
               >
                  {this.props.data.map((_, i) => {
                     let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                     });
                     return (
                        <Animated.View
                           key={i}
                           style={{ opacity, height: 5, width: (SCREEN_WIDTH / this.props.data.length) - 15, backgroundColor: 'rgba(255,255,255,0.6)', margin: 3, borderRadius: 5 }}
                        />
                     );
                  })}
               </View>
            </View>
         </View>
      );
   }
}

const styles = {
   slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: SCREEN_WIDTH
   },
   slideTextTitle: {
      fontSize: SCREEN_WIDTH / 12,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'transparent',
      color: '#ffffff'
   },
   slideTextDescription: {
      fontSize: SCREEN_WIDTH / 24,
      textAlign: 'center',
      fontWeight: '100',
      marginTop: 20,
      backgroundColor: 'transparent',
      color: '#ffffff'
   },
   page: {
      width: SCREEN_WIDTH,
      paddingTop: Constants.statusBarHeight + 48,
   },
   buttonWrapper: {
      position: 'absolute',
      margin: 0,
      width: SCREEN_WIDTH,
      left: 0,
      bottom: 0
   },
   frame: {
      position: 'absolute',
      left: (SCREEN_WIDTH / 2) - 150,
      bottom: 150,
      margin: 50,
      justifyContent: 'center',
      alignItems: 'center'
   },
   card: {
      position: 'absolute',
      margin: 12,
      marginTop: 40,
      left: 12,
      top: 0,
      right: 0,
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 140,
   },
   photo: {
      flex: 1
   },
   indicator: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 70
   }
}
