import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../views/Carousel/styles/SliderEntry.style';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration, url }, parallax, parallaxProps, even, navigation } = this.props;
        const getURI = illustration ? illustration : url;

        return parallax ? (
            <ParallaxImage
              source={{ uri: getURI }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={[styles.image, { position: 'relative' }]}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: getURI }}
              style={styles.image}
            />
        );
    }

    onSlideTouched = () => {
      if (this.props.navigation) {
         const { data: { title, id }, even } = this.props;
         this.props.navigation.navigate('detail', { id: id, name: title });
      }
    }

    render () {
        const { data: { title, subtitle, caption, id, category }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        const uppercaseCategory = category ? (
           <Text
             style={{
                fontSize: SCREEN_WIDTH / 28,
                color: 'rgba(255,255,255,0.6)' ,
                marginTop: 10,
                fontWeight: 'bold'
             }}
           >
             {category.toUpperCase()}
           </Text>
        ) : false;

        const getCaption = subtitle ? (
           <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
           >
               { subtitle }
           </Text>
        ) : (
           <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
           >
               { caption }
           </Text>
        );

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={this.onSlideTouched}
              >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseCategory }
                    { uppercaseTitle }
                    { getCaption }
                </View>
            </TouchableOpacity>
        );
    }
}
