import { combineReducers } from 'redux';
import auth from './auth_reducer';
import merchant from './merchant_reducer';
import likedMerchant from './likes_reducer';

export default combineReducers({
   auth, merchant, likedMerchant
});
