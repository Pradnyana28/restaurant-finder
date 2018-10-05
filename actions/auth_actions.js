import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import {
   FACEBOOK_LOGIN_SUCCESS,
   FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async dispatch => {
   let token = await AsyncStorage.getItem('fb_token');

   if (token) {
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
   } else {
      // start up facebook login process
      doFacebookLogin(dispatch);
   }
}

const doFacebookLogin = async dispatch => {
   let { type, token } = await Facebook.logInWithReadPermissionsAsync('139877303297940', {
      permissions: ['public_profile', 'email']
   });

   if (type == 'cancel') {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
   }

   // Make a new request to get user public profile
   axios.get('https://graph.facebook.com/me', {
       params: {
            fields: 'id,name,email,picture.width(960).height(960)',
            access_token: token
       }
   }).then((response) => {
       const fbData = JSON.stringify(response.data);
       AsyncStorage.setItem('fb_data', fbData);
   });

   await AsyncStorage.setItem('fb_token', token);
   dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
