import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)',
    blue :'#3289c7',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop : 20,
        backgroundColor: 'white'
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    title: {
        marginTop: 15,
        backgroundColor: 'transparent',
        color: colors.blue,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tabs :
		{
			backgroundColor:'#F6F6F8',
			elevation: 5,
			borderTopWidth : 1,
			borderTopColor : '#C1C0C6',
		},
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: colors.blue,
        fontSize: 16,
        textAlign: 'center'
    },
    slider: {
        marginBottom: 20
    },
    sliderContainer: {
    }
});
