import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import Spinner from '../components/KNSpinner';

import Images from '@assets/images';

const SLIDE_DATA = [
   { text: { title: 'Selamat Datang', description: 'Sebuah wadah bagi pecinta kuliner Nusantara untuk menemukan rekomendasi makanan terbaik Tanah Air' }, color: '#00796B', image: Images.welcome },
   { text: { title: 'Cari Sesuai Mood', description: 'Sesuaikan pencarian makanan sesuai dengan Mood mu saat ini, jangan kecewakan perut mu' }, color: '#0097A7', image: Images.welcome },
   { text: { title: 'Pilih Tepat', description: 'Pilih pemandangan restaurant yang kamu inginkan. Relax sambil kumpul bersama teman atau keluarga tercinta' }, color: '#0288D1', image: Images.welcome },
   { text: { title: 'Simpan', description: 'Tidak mau kelewatan dengan menu yang menarik ? Simpan saja dan cari ketika mood mu sesuai' }, color: '#F57C00', image: Images.welcome },
   { text: { title: 'Temukan Sekarang', description: 'Temukan pengalaman baru dalam mencari tempat kuliner di Nusantara sekarang' }, color: '#FFA000', image: Images.welcome }
];

class WelcomeScreen extends Component {
   state = { token: null, visible: false }

   async componentWillMount() {
      let token = await AsyncStorage.getItem('fb_token');
      if (token) {
         this.props.navigation.navigate('explore');
         this.setState({ token });
      } else {
         this.setState({ token: false });
      }
   }

   onSlidesComplete = () => {
      this.props.navigation.navigate('auth');
   }

   render() {
      if (this.state.token === null) {
         return <Spinner />;
      }

      return(
         <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      );
   }
}

const styles = {
   container: {
      paddingTop: 25
   }
}

export default WelcomeScreen;
