import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  findNodeHandle,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import { Actions } from 'react-native-router-flux';


export default class qrScene extends Component {
  constructor(props) {
   super(props);

   this.state = {
     torchMode: 'off',
     cameraType: 'back',
   };
 }

 barcodeReceived(e) {
  Actions.listParcoursPoi({poi : e.data.split('-')[2]});
  console.log('Type: ' + e.data);
  console.log('Type: ' + e.type);
 }

 render() {
   return (
     <BarcodeScanner
       onBarCodeRead={this.barcodeReceived}
       style={{ flex: 1 }}
       torchMode={this.state.torchMode}
       cameraType={this.state.cameraType}
     />
   );
 }
}
