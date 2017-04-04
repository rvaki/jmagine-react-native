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

export default class listParcours extends Component {
  constructor() {
    super();
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
      var npoi =0;
      /*
      fetch("http://jmagine.tokidev.fr/api/parcours/"+this.state.parcours[i]+"/get_all_pois")
      .then((response) => response.text())
      .then((responseData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseData);

          npoi = xmlDoc.getElementsByTagName("title");
          npoi = npoi.length;
      }).done();*/

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
    this.getParcours();
  }
  render() {
    const content = this.state.isLoading
      ?
      <Image
        source={require('../image/background.jpg')}
        style={styles.containerWaitingView}>
        <Image source={require('../image/logoJmagine.png')} style={{alignItems: 'center', marginTop :0}}/>
        <ActivityIndicator color={'#FFF'}size={75} style={{alignItems: 'center',marginTop:50}}/>
      </Image>
      // si requête en cours, on affiche un spinner
      :
      <View style={styles.container}>
        <ListView style={styles.listParcours}
        dataSource={ds.cloneWithRows(this.state.listParcours)}
        renderRow={(rowData) =>
          <View style={styles.rowParcours}>
            <Image  style={styles.imgStretch}  source={{uri: rowData.img}}/>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
              <Text onPress={() => _onItemSelect(rowData.id,rowData.firstPoi,rowData.title)} style={styles.rowTextTitle}>{rowData.title} </Text>

            </LinearGradient>
          </View>
        }/>

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
    function   _onItemSelect(parcours,poi,title) {
        Actions.listPoi({parcours: parcours+"",poi : ""+poi,title : title});
    };
    function   _onTabSelect() {
        Actions.scanScene();
    };
    return (
      <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#2A77E3'} barStyle={'light-content'} />
      {content}
      </View>
      )
    }
  }

  const styles = StyleSheet.create({
		mainContainer :
		{
			flex : 1,
		},
		container: {
			flex: 1,
			marginTop : 34,

		},
		containerWaitingView: {
			flex: 1,
			width: undefined,
			height: undefined,
			backgroundColor:'transparent',
			justifyContent: 'center',
			alignItems: 'center',
		},
    rowParcours :
    {
      flex : 1,
      flexDirection : 'column',
      //paddingRight : 10,
      //paddingLeft : 10,
      overflow : 'hidden',
      //paddingBottom :10,
    },
		tabsButton :
		{
			backgroundColor : 'red',
		},
		tabsButtonText :
		{
			color : '#0192FF',
		},
		tabs :
		{
			backgroundColor:'#F6F6F8',
			elevation: 5,
			borderTopWidth : 1,
			borderTopColor : '#C1C0C6',
		},
		listParcours :
		{
			marginBottom  :50
		},
		rowTextTitle : {
			marginBottom  :1,
			fontSize: 16,
			fontFamily: 'Gill Sans',
			color: '#ffffff',
			padding : 15,
			backgroundColor: 'transparent',

		},
		imgStretch: {
			height: 250,
			alignSelf: 'stretch',
      //borderRadius : 5,
		},
		linearGradient: {
			marginTop : -50,
			height : 50,
      //borderRadius : 5,
		},
	});
