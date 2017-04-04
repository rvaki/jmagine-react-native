/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Image
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import listParcours from './app/scenes/listParcours';
import listPoi from './app/scenes/listPoi';
import scanScene from './app/scenes/scanScene';
import mapScene from './app/scenes/mapScene';
import qrScene from './app/scenes/qrscene';
import listParcoursPoi from './app/scenes/listParcoursPoi';
export default class Jmagine extends Component {
  render() {
    return (
      <Router>
      <Scene key="root">
      <Scene type="push" duration={100} key="listParcours" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}} component={listParcours} navigationBarTitleImage={require('./app/image/logo.png')} title="Jmagine" initial={true} />
      <Scene type="push" duration={100} key="listPoi" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}}  component={listPoi} title="Choisissez un point" />
      <Scene type="push" duration={100} key="scanScene" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}}  component={scanScene} title="Méthodes de scan" />
      <Scene type="push" duration={100} key="mapScene" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}}  component={mapScene} title="La carte" />
      <Scene type="push" duration={100} key="qrScene" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}}  component={qrScene} title="QR Scan" />
      <Scene type="push" duration={100} key="listParcoursPoi" navigationBarStyle={{backgroundColor: '#FFF',borderBottomWidth:0,elevation :5}}  titleStyle={{color : "#333"}}  component={listParcoursPoi} title="QR Scan" />
      </Scene>
      </Router>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Jmagine', () => Jmagine);
