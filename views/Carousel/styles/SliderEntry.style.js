import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: viewportWidth,
        height: (viewportHeight / 2) - 50
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainerEven: {
        backgroundColor: colors.gray
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        width: viewportWidth
    },
    textContainer: {
      position: 'absolute',
      bottom: 0,
      width: viewportWidth,
        justifyContent: 'center',
        paddingTop: 20 - viewportWidth,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textContainerEven: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        color: 'white',
        fontSize: viewportWidth / 24,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        paddingTop: 5
    },
    titleEven: {
        color: 'white',
        paddingTop: 5
    },
    subtitle: {
        marginTop: 6,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontStyle: 'normal'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});
