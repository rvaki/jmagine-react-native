import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Tabs from 'react-native-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,Image,StatusBar,
  View,ListView,Alert,ActivityIndicator
} from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
ds.enableEmptySections={true};
window.DOMParser = require('xmldom').DOMParser;

export default class listPoi extends Component {
	constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      pois : [],
      page:'Parcours',
			 isLoading: false,
			parcours : props.parcours,
			poi : props.poi,
			nextPoiId : -1,
      searchinFirstPoi : true,
      region: {
      latitude: 43.8,
      longitude: 7.2,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    };
  };
  onRegionChange = (r) => {
    this.setState({ region :  r});
  };

	componentWillMount()
  {
    Actions.refresh({title: this.props.title})
    this.getPoi(this.state.parcours,this.state.poi);
  };
	getPoi = (idparcours,idpoi) =>
	{
		var XMLParser = require('react-xml-parser');
		var i = 0 ;

		class poiC{
			constructor(id,title,img,address,lat,lng,nextPoi) {
				this.id = id;
				this.title = title;
				this.img = img;
				this.address = address;
				this.lat = lat;
				this.lng = lng;
				this.nextPoi = nextPoi;
			}
		}
		if(this.state.isLoading == false)
		{
			this.setState({isLoading : true});
		}

		fetch("http://jmagine.tokidev.fr/api/parcours/"+idparcours+"/pois/"+idpoi)
		.then((response) => response.text())
		.then((responseData) => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(responseData);

			this.setState({
				pois: this.state.pois.concat([new poiC(
					idpoi,
					xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue,
					xmlDoc.getElementsByTagName("backgroundPic")[0].childNodes[0].nodeValue,
					xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue,
					xmlDoc.getElementsByTagName("lat")[0].childNodes[0].nodeValue,
					xmlDoc.getElementsByTagName("lng")[0].childNodes[0].nodeValue,
					xmlDoc.getElementsByTagName("next_poi")[0].childNodes[0].nodeValue,
				)]),
			});
			this.setState({nextPoiId : xmlDoc.getElementsByTagName("next_poi")[0].childNodes[0].nodeValue});
			console.log("le next : "+this.state.nextPoiId);
      if(this.state.searchinFirstPoi == true)
      {
        this.setState({searchinFirstPoi : false});
      }
			if(xmlDoc.getElementsByTagName("next_poi")[0].childNodes[0].nodeValue != this.state.poi )
			{
				this.getPoi(idparcours,xmlDoc.getElementsByTagName("next_poi")[0].childNodes[0].nodeValue)
			}
			else {
				this.setState({isLoading : false});
			}
		})
		.done();
	};
	render() {
		const content = this.state.isLoading?
			<Image
				source={require('../image/background.jpg')}
				style={styles.containerWaitingView}>
				<Image source={require('../image/logoJmagine.png')} style={{alignItems: 'center', marginTop :0}}/>
				<ActivityIndicator color={'#FFF'}size={75} style={{alignItems: 'center',marginTop:50}}/>
			</Image>
			:
		<View style={styles.container}>
    <MapView style={styles.map}
      region={this.state.region}
      onRegionChange={this.onRegionChange}
      showsUserLocation={true}
    >
    {this.state.pois.map(marker => (
    <MapView.Marker
      coordinate={{latitude : parseFloat(marker.lat),longitude : parseFloat(marker.lng)}}
      title={marker.title}
      description={marker.address}
    />
  ))}
    </MapView>

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
    map:
    {
      marginTop : 20,
      flex : 1,
      marginBottom : 50,
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
