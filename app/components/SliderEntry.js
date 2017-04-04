import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import { Actions } from 'react-native-router-flux';
export default class SliderEntry extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        even: PropTypes.bool
    };

    render () {
        const { title, subtitle, illustration, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ title.toUpperCase() }</Text>
        ) : false;
        var icon;
        var f ;
        switch(illustration)
        {
            case 'qr.png' :
            icon = require('../image/qr.png');
            f = Actions.qrScene
            break;
            case 'sns.png' :
            icon = require('../image/sns.png');
            f = () =>{alert(`You've clicked '${title}'`);}
            break;
            case 'lifi.png' :
            icon = require('../image/lifi.png');
            f = () =>{alert(`You've clicked '${title}'`);}
            break;
            case 'nfc.png' :
            icon = require('../image/nfc.png');
            break;
        }
        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={f}
              >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <Image
                      source={icon}
                      style={styles.image}
                    />
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>{ subtitle }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
