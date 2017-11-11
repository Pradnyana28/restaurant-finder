import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class Indicator extends Component {
   state = {
      scroll: new Animated.Value(0)
   };

   render() {
      const position = Animated.divide(this.state.scroll, SCREEN_WIDTH);

      return(
         <View style={{ alignItems: 'center' }}>
            <View
               style={styles.indicator} // this will layout our dots horizontally (row) instead of vertically (column)
            >
               {this.props.data.map((_, i) => { // the _ just means we won't use that parameter
                  let opacity = position.interpolate({
                     inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                     outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                     // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                     // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                     extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                  });
                  return (
                     <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                        key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                        style={{ opacity, height: 5, width: (SCREEN_WIDTH / this.props.data.length) - 15, backgroundColor: 'rgba(255,255,255,0.6)', margin: 3, borderRadius: 5 }}
                     />
                  );
               })}
            </View>
         </View>
      );
   }
}

const styles = {
   indicator: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10
   }
}
