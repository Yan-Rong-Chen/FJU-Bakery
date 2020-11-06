import {StatusBar, StyleSheet} from 'react-native';

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
        justifyContent: 'flex-end',
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
    box:{
        flex: 0.6,
        margin: 2,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#F2B653',
    },
    text_btn: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default styles;