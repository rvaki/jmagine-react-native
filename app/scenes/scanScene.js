import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Tabs from 'react-native-tabs';
import { Actions } from 'react-native-router-flux';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../components/SliderEntry';
import styles from '../styles/index.style';
import sliderStyles from '../styles/SliderEntry.style';
import { scanMethod } from '../static/entries';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class scanScene extends Component {
    constructor()
    {
      super();
      this.state = {
        page:'Scan',
      };
    };
    getSlides (entries) {
        if (!entries) {
            return false;
        }

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  even={(index + 1) % 2 === 0}
                  {...entry}
                />
            );
        });
    }

    get mScan () {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            >
                { this.getSlides(scanMethod) }
            </Carousel>
        );
    }


    render () {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#2A77E3'} barStyle={'light-content'} />
                <View style={styles.colorsContainer}>
                    <View style={styles.color1} />
                    <View style={styles.color2} />
                </View>
                <ScrollView
                  style={styles.scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    <Text style={styles.subtitle}>Sélectionnez une méthode de scan</Text>
                    { this.mScan }

                </ScrollView>
                <Tabs selected={this.state.page} style={styles.tabs}
                selectedStyle={{}} onSelect={el=>this.setState({page:el.props.name})}>
                <Icon.Button name="map-marker" color="#2A77E3" backgroundColor="#F6F6F8" selectedStyle={{color:'#007AFF',borderTopColor : '#C1C0C6',borderTopWidth:2}}  onPress={Actions.listParcours}>
                Parcours
                </Icon.Button>
                <Icon.Button name="qrcode" color="#2A77E3" backgroundColor="#F6F6F8" selectedStyle={{color:'#007AFF',borderTopColor : '#C1C0C6',borderTopWidth:2}} onPress={Actions.scanScene}>
                Scan
                </Icon.Button>
                <Icon.Button name="map" color="#2A77E3" backgroundColor="#F6F6F8" selectedStyle={{color:'#007AFF',borderTopColor : '#C1C0C6',borderTopWidth:2}} onPress={Actions.mapScene}>
                Carte
                </Icon.Button>
                </Tabs>
            </View>
        );
    }
}
