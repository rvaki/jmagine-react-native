import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../styles/index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight*0.65;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;
const separator = 1.5;
export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
        borderWidth : 1,
        borderColor : colors.blue
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

    },
    imageContainerEven: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
    },
    image: {
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    buttonValidation :
    {
      flex : 1,
      backgroundColor : colors.blue,
      color : 'white',
      textAlign : 'center',
      padding : 12,
      width : itemWidth,
      marginHorizontal: itemHorizontalMargin*5+2,//*2 sur les côté + 1 margin entres les éléments +2 à cause des bordures

    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: separator,
        backgroundColor: colors.blue
    },
    radiusMaskEven: {
        backgroundColor:colors.blue
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
    },
    title: {
        color: colors.blue,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    titleEven: {
        color: colors.blue,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 6,
        color: colors.blue,
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    subtitleEven: {
        color: colors.blue,
        textAlign: 'center',
    }
});
