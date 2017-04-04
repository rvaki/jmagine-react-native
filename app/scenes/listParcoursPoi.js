import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Tabs from 'react-native-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabbar from '../components/tabbar';
import {
  AppRegistry,
  StyleSheet,
  Text,Image,
  View,ListView,Alert,
  ActivityIndicator,StatusBar
} from 'react-native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
ds.enableEmptySections={true};
window.DOMParser = require('xmldom').DOMParser;

export default class listParcoursPoi extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      title:[],
      isLoading: false,
      img:[],
      page:'Parcours',
      parcours : [9,4,6], /** rentré en dur**/
      listParcours : [],
      numberPoi : 0,
      poi : this.props.poi
    };
  }

  getParcours =()=>
  {
    class parcours {
      constructor(id,title,img,desc,firstPoi,numberPoi) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.desc =desc;
        this.firstPoi=firstPoi;
        this.numberPoi=numberPoi;
      }
    }
    var XMLParser = require('react-xml-parser');
    this.setState({isLoading : true});

    for(var i=0; i < this.state.parcours.length; i++)
    {
      var npoi;
      fetch("http://jmagine.tokidev.fr/api/parcours/"+this.state.parcours[i]+"/get_all_pois")
      .then((response) => response.text())
      .then((responseData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseData);

          npoi = xmlDoc.getElementsByTagName("title");
          npoi = npoi.length;
      }).done();

      fetch("http://jmagine.tokidev.fr/api/parcours/"+this.state.parcours[i])
      .then((response) => response.text())
      .then((responseData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseData);
        this.setState({isLoading : false});
        this.setState({
          listParcours: this.state.listParcours.concat([new parcours(xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue,
                                                                      xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue,
                                                                      xmlDoc.getElementsByTagName("backgroundPic")[0].childNodes[0].nodeValue,
                                                                      "undefined",
                                                                      xmlDoc.getElementsByTagName("first_poi")[0].childNodes[0].nodeValue,
                                                                      npoi
                                                                    )]),
        });
      })
      .done();

    }
  }
  componentWillMount()
  {
    //this.getParcours();
  }
  render() {
    return (
      <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#2A77E3'} barStyle={'light-content'} />
      <Text style={styles.textPoi}>C'est le Poi : {this.state.poi}</Text>
      </View>
      )
    }
  }

  const styles = StyleSheet.create({
		mainContainer :
		{
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
		},
    textPoi :
    {
      marginTop :0,

    }
	});
