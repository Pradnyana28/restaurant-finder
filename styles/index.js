import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export const TabStyles = {
   tabContainer: {
      flex: 1,
      paddingBottom: 30
   },
   tabView: {
      backgroundColor: '#ededed'
   }
}
