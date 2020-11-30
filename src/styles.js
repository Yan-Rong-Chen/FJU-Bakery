import {StatusBar, StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full screen  width
var height = Dimensions.get('window').height; //full screen height

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#00bfff',
        flex: 1,
        flexDirection: 'column',
        marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F2B653',
    },
    title: {
        flex: 2,
        color: '#262C49',
        fontFamily: "Mansalva_400Regular",
        fontSize:24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {//color:#F2B653
        width: 200,
        height: 150,
        resizeMode: 'stretch',
        borderWidth: 2,
        borderColor: '#F2B653',
    },
    // box:{
    //     flex: 0.6,
    //     margin: 2,
    //     alignItems:'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#F2B653',
    // },
    text_btn: {
        color: '#FFF',
        fontSize: 16,
    },
    textInput: {
        height: 40,
        padding: 10,
        borderColor: '#F2B653',
        borderWidth: 2,
        borderRadius: 2,
    },
    items: {
        height: height * 0.2,
        width: width * 0.98,
        // alignSelf: 'stretch',
        backgroundColor:'#FFF',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
        // marginHorizontal: 5,
        borderRadius: 5,
    },
    itemsText: {
        flex: 3,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    itemTitle: {
        fontSize: 18,
        color: '#000'
    },
    itemContent: {
        fontSize: 16,
        color: '#F2B653',
    }
});

export default styles;