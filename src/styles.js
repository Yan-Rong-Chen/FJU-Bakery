import {StatusBar, StyleSheet, Dimensions} from 'react-native';
import { color } from 'react-native-reanimated';

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
        width: 150,
        height: 112,
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
    itemGroup: {
        height: height * 0.25,
        width: width * 0.98,
        borderRadius: 5,
        marginTop: 5,
        flexDirection: 'column',
        backgroundColor: '#FFF',
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
    itemImage: {
        height: '100%',
        flex: 2,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
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
    },
    detailContainer: {
        flexGrow: 1,
    },
    detailImage: {
        width: '100%',
        height: height * 0.45
    },
    detailText: {
        marginHorizontal: 15,
        marginVertical: 5,
    },
    detailPrice: {
        fontSize: 18,
        color: '#F2B653',
        marginVertical: 15,
    },
    detailDesc: {
        fontSize: 16,
        color: '#696969',
        marginVertical: 1,
    },
    btn: {
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 2,
        width: (width - 40)/2,
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
    },
    cartPrice: {
        flexDirection: 'row', 
        marginVertical: 20,
        alignItems: 'center',
    },
    cartPriceLeft: {
        width: 30, 
        height: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DCDCDC',
        borderWidth: 1, 
        borderRightWidth:0, 
        borderTopLeftRadius: 2, 
        borderBottomLeftRadius: 2,
    },
    cartTextInput: {
        width:50, 
        height: 30, 
        color: '#F2B653',
        borderWidth: 1,
        borderColor: '#DCDCDC', 
        fontSize: 16,
        fontWeight: 'bold'
    },
    cartPriceRight: {
        width: 30, 
        height: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DCDCDC',
        borderWidth: 1, 
        borderLeftWidth:0, 
        borderTopRightRadius: 2, 
        borderBottomRightRadius: 2
    },
    cartPriceLeftRightText: {
        color: '#696969', 
        fontWeight: 'bold'
    },
    placeOrder: {
        width: width - 10,
        marginHorizontal: 5,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    placeOrderBtn: {
        flex: 2,
        // position: 'absolute',
        height: height * 0.05, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#FFF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#F2B653'
    },
    cartTotal: {
        flex:3,
        textAlign: 'right',
        marginHorizontal: 5,
        color: '#F2B653',
    },
    formGroup: {
        marginBottom: 5
    },
    formView: {
        width: width,
        height: 40,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    formLabel: {
        color: '#F2B653',
    },
    formValue: {
        color: '#696969',
    },
    modalView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0
    },
    modal: {
        width: width-2*20,
        // height: 300,
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 2,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalBtnView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        width:'100%', 
        justifyContent: 'flex-end'
    },
    modalBtnText: {
        padding: 10,
        margin: 3,
        color: '#F2B653',
    },
    textInput: {
        width: '100%',
        marginVertical: 20, 
        height: 30, 
        color: '#696969',
        borderColor: '#F2B653',
        borderWidth: 0,
        borderBottomWidth: 2,
        fontWeight: 'normal',
    },
    radioBtn: {
        width: width - 60,
        height: 40, 
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default styles;