import React, { Component } from 'react';
import { View, Text, AsyncStorage, Dimensions, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { FirstColor } from '../components';
import Images from '@assets/images';

// display
import { MainColor, SecondColor, Blue } from '../components/Colors';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
   componentDidMount() {
      this.onAuthComplete(this.props);
   }

   componentWillReceiveProps(nextProps) {
      this.onAuthComplete(nextProps);
   }

   onAuthComplete(props) {
      if (props.token) {
         this.props.navigation.navigate('explore');
      }
   }

   render() {
      return(
         <View style={styles.container}>
            <View style={styles.logoWrapper}>
               <Image source={Images.welcome} />
            </View>

            <View style={styles.fbWrapper}>
               <Text style={styles.title}>Kuliner Nusantara</Text>
               <SocialIcon
                 title='Sign In With Facebook'
                 button
                 type='facebook'
                 style={{ width: (SCREEN_WIDTH / 2) + (SCREEN_WIDTH / 4) }}
                 onPress={() => this.props.facebookLogin()}
               />
            </View>

            <View style={styles.copyright}>
               <Text style={{ color: FirstColor, opacity: 0.3 }}>Made with love by @kadekpradnyana</Text>
            </View>
         </View>
      );
   }
}

const styles = {
   container: {
      marginTop: 25,
      backgroundColor: SecondColor,
      height: DEVICE_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center'
   },
   logoWrapper: {
      height: DEVICE_HEIGHT / 2,
      width: SCREEN_WIDTH,
      position: 'absolute',
      top: 80,
      alignItems: "center",
      marginBottom: 40
   },
   fbWrapper: {
      marginTop: 40,
      width: SCREEN_WIDTH,
      alignItems: "center"
   },
   title: {
      fontSize: SCREEN_WIDTH / 12,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 50
   },
   copyright: {
      position: 'absolute',
      bottom: 30,
      width: SCREEN_WIDTH,
      height: 30,
      alignItems: 'center'
   }
}

function mapStateToProps({ auth }) {
   return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
