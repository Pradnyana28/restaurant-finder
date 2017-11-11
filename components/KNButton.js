import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { MainColor } from './Colors';

export default class KNButton extends Component {
   render() {
      return(
         <Button
            large
            raised
            backgroundColor={MainColor}
            color="#FFF"
            icon={{ name: this.props.iconName, type: 'ionicon' }}
            onPress={this.props.onPressed}
         />
      );
   }
}
