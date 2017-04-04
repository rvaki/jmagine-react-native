import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,Image,
	View,ListView,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Tabbar extends React.Component {
	constructor()
	{
		super();
	}
	render() {

		return (
			<View style={styles.tabbar}>
      <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
        Login with Facebook
      </Icon.Button>
			</View>
			)

		}
	}

  const styles = StyleSheet.create({
    tabbar :
    {
      flex : 1,
      flexDirection: 'column',
    },
    container: {
      flex: 1,
    },
  });
