import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const KNSpinner = () => (
      <Spinner
            visible={true}
            textStyle={{ color: '#000' }}
            color='black'
            cancellable={false}
            animation={'fade'}
            overlayColor={"rgba(255,255,255,1)"}
      />
)     

export default KNSpinner;