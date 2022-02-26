import React,{useState} from 'react';
import { View, Text, StyleSheet, StatusBar,TouchableOpacity } from 'react-native';
//import { CompositeNavigationProp } from '@react-navigation/native';
//import { StackNavigationProp } from '@react-navigation/stack';
//import { RootStackParamList } from '../RootStackParams';
//import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
//import { MainBottomTabParamList } from './MainBottomTabParams';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function AuthScreen() {
    const navigation = useNavigation();
    const [Amount, setAmount] = useState("");

    const setWeeklyLimit = async () => {
        try {
            AsyncStorage.setItem('WeeklyLimit', Amount);
            navigation.goBack();
        } catch (e) {
        }
    }

    return (
        <View style={styles.Top_container_view}>
            <StatusBar backgroundColor='#0c365a' barStyle='light-content' />
            <View style={styles.Top_background_view_container}>
                <View style={styles.Title_container_view}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Icon name="home" size={30} color="#01d167" />
                    </View>
                </View>
                <Text style={styles.Medium_text_style}>Spending limit</Text>
            </View>
            <View style={styles.Bottom_background_view_container}>

                <View style={styles.Inner_container_view}>


                <View style={styles.Title_container_view}>
                    <Ionicons name="speedometer-outline" size={15} color="#0c365a" />
                    <Text style={[styles.Small_text_black_style,{marginLeft:'3%'}]}>Set a weekly debit card spending limit</Text>
                    </View>
                    <View style={[styles.Title_container_view, { marginTop: '3%' }]}>
                        <Text style={styles.Dollar_text_style}>S$</Text>
                        <Text style={[styles.Medium_text_black_style, { marginTop: '0%' }]}>{Amount}</Text>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:'#eee',marginTop:'2%'}}></View>
                    <Text style={[styles.Small_text_grey_style]}>Here the weekly means the last 7 days - not the calendar week</Text>
                    
                    <View style={styles.Title_container_view}>
                        <Text style={styles.Small_text_green_style} onPress={() =>setAmount("5,000")}>S$ 5,000</Text>
                        <Text style={styles.Small_text_green_style} onPress={() =>setAmount("10,000")}>S$ 10,000</Text>
                        <Text style={styles.Small_text_green_style} onPress={() =>setAmount("20,000")}>S$ 20,000</Text>
                    </View>

                    <View style={styles.ButtonUIViewStyle}>

                    <View style={styles.btn_GO_ViewStyle}>
                        <TouchableOpacity style={styles.Btn_Go_TouchStyle}
                            //    onPress={() => this.props.navigation.navigate('HomeScreen')}
                            onPress={() => setWeeklyLimit()}

                        >


                            <Text style={styles.Btn_GO_TextStyle} >Save</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Medium_text_style: {
        textAlign: "left",
        color: "#fff",
        flex: 1,
        //width: "100%",
        marginTop: '4%',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
    },
    Medium_text_white_style: {
        textAlign: "left",
        color: "#fff",
        marginTop: '4%',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
    },
    Medium_text_black_style: {
        textAlign: "left",
        color: "#000",
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
    },
    Small_text_style: {
        textAlign: "left",
        color: "#fff",
        //width: "100%",
        marginTop: '8%',
        alignSelf: 'flex-start',
        fontSize: RFPercentage(1.7),
    },
    Small_text_black_style: {
        textAlign: "left",
        color: "#000",
        alignSelf: 'flex-start',
        fontSize: RFPercentage(1.7),
    },
    Small_text_white_style: {
        textAlign: "left",
        color: "#fff",
        //width: "100%",
        alignSelf: 'flex-start',
        fontSize: RFPercentage(2),
    },
    Small_text_grey_style: {
        textAlign: "left",
        color: "#d2d2d2",
        marginTop: '4%',
        alignSelf: 'flex-start',
        fontSize: RFPercentage(1.5),
        marginBottom:'10%'
    },
    Small_text_green_style: {
        textAlign: "center",
        color: "#01d167",
        alignSelf: 'flex-start',
        fontSize: RFPercentage(1.5),
        marginLeft: '2%',
        fontWeight: 'bold',
        backgroundColor:'#effcf4',
        borderRadius:2,
        padding:'3%',
        width:'30%'
    },
    Dollar_text_style: {
        textAlign: "center",
        color: "#fff",
        paddingRight: '4%',
        paddingLeft: '4%',
        paddingTop: '1%',
        paddingBottom: '1%',
        marginRight: '3%',
        backgroundColor: '#01d167',
        borderRadius: 5,
        alignSelf: 'center',
        fontSize: RFPercentage(1.5),
    },
    ButtonUIViewStyle: {
        width: '75%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01d167',
        borderRadius:20,
        position:'absolute',
        bottom:25,
        alignSelf:'center'

    },
    // GO Button View Style
    btn_GO_ViewStyle: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '70%'

    },

    // GO Button Touchable Style
    Btn_Go_TouchStyle: {

        width: '100%',
        //height: hp('7%'),
        //backgroundColor: '#FBBB2F',
        borderRadius: 8,
        justifyContent: 'center',



    },

    // GO Button Touchable Text Style
    Btn_GO_TextStyle: {

        textAlign: 'center',
        color: '#fff',
        //fontWeight: 'bold',
        //  fontSize: hp('3%'),
        fontSize: RFPercentage(2),
    },
    Top_container_view: { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#0c365a' },
    Top_background_view_container: { height: '20%', width: '100%', alignSelf: 'flex-end', alignItems: 'flex-end', backgroundColor: '#0c365a', padding: '5%' },
    Bottom_background_view_container: { height: '80%', width: '100%', alignSelf: 'flex-end', alignItems: 'flex-end', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    Inner_container_view: { position: 'absolute', height: '100%', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '5%' },
    Card_container_view: { alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' },
    Title_container_view: { alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' },
});
export default AuthScreen;