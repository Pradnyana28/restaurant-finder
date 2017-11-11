import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar, Dimensions, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../views/Carousel/styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from '../views/Carousel/styles/index.style';

const SLIDER_FIRST_ITEM = 1;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class ImageCarousel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_FIRST_ITEM,
            slider1Ref: null,
            entries: this.props.data
        };
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
      return(
         <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            parallax={true}
            parallaxProps={parallaxProps}
            navigation={false}
         />
      );
    }

    render () {
      const { slider1ActiveSlide, slider1Ref } = this.state;
      const getIndicator = this.props.showIndicator ? (
         <Pagination
           dotsLength={this.state.entries.length}
           activeDotIndex={slider1ActiveSlide}
           containerStyle={styles.paginationContainer}
           dotColor={'rgba(255, 255, 255, 0.92)'}
           dotStyle={styles.paginationDot}
           inactiveDotColor={colors.black}
           inactiveDotOpacity={0.4}
           inactiveDotScale={0.6}
           carouselRef={slider1Ref}
           tappableDots={!!slider1Ref}
         />
      ) : null;

        return (
            <View style={styles.container}>
                <Carousel
                  ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                  data={this.state.entries}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={SCREEN_WIDTH}
                  itemWidth={SCREEN_WIDTH}
                  slideStyle={{ width: SCREEN_WIDTH }}
                  hasParallaxImages={true}
                  firstItem={SLIDER_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  enableMomentum={false}
                  autoPlay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                {getIndicator}
            </View>
        );
    }
}
