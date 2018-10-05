import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import { SERVER_URL } from 'react-native-dotenv';

import {
    FETCH_MERCHANT
} from './types';

export const fetchMerchant = (region, callback) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        // Request to server
        let { data } = await axios.get(SERVER_URL, {
            params: { 
                p: "restaurants", 
                type: "search", 
                by: "area", 
                value: zip 
            }
        });
        dispatch({ type: FETCH_MERCHANT, payload: data });
        callback();
        // console.log(data);
    } catch (e) {
        console.log(e);
    }
};