import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView,TouchableOpacity } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainBottomTabParamList } from './MainBottomTabParams';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Switch } from 'react-native-switch';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();
  const [SwitchWeekly, setSwitchWeekly] = useState(false);
  const [HideCardNumber, setHideCardNumber] = useState(false);
  const [WeeklyLimit, setWeeklyLimit] = useState<string | null>('0');
  const [SwitchFreeze, setSwitchFreeze] = useState(false);

  useEffect(() => {

    readData()

  }, [])

  const readData = async () => {
    try {
      const WeeklyLimit = await AsyncStorage.getItem('WeeklyLimit')
      setWeeklyLimit(WeeklyLimit)

      console.log("WeeklyLimit : "+ WeeklyLimit);

      if (WeeklyLimit == "0" || WeeklyLimit == null) {
        setSwitchWeekly(false);
      }else{
        setSwitchWeekly(true);
      }

    } catch (e) {

    }

    const willFocusSubscription = navigation.addListener('focus', async () => {
      try {
        const WeeklyLimit = await AsyncStorage.getItem('WeeklyLimit')
        setWeeklyLimit(WeeklyLimit)

        if (WeeklyLimit == "0" || WeeklyLimit == null) {
          setSwitchWeekly(false);
        }else{
          setSwitchWeekly(true);
        }

      } catch (e) {

      }
    });

    return willFocusSubscription;
  }

  return (
    <View style={styles.Top_container_view}>
      <StatusBar backgroundColor='#0c365a' barStyle='light-content' />
      <View style={styles.Top_background_view_container}>
      </View>
      <View style={styles.Bottom_background_view_container}>
      </View>
      <View style={styles.Inner_container_view}>
        <View style={styles.Title_container_view}>
          <Text style={styles.Medium_text_style}>Debit Card</Text>
          <Icon name="home" size={30} color="#01d167" />
        </View>
        <Text style={styles.Small_text_style}>Available balance</Text>
        <View style={[styles.Title_container_view, { marginTop: '3%' }]}>
          <Text style={styles.Dollar_text_style}>S$</Text>
          <Text style={[styles.Medium_text_style, { marginTop: '0%' }]}>3,000</Text>
        </View>
        <View style={styles.Card_container_view}>
        <TouchableOpacity style={styles.Hide_number_container_view} onPress={() => setHideCardNumber(!HideCardNumber)}>
            <View style={{flexDirection:'row'}}>

            {HideCardNumber == true ? <Ionicons  size={15} name="eye-off" color="#01d167" /> : <Ionicons  size={15} name="eye" color="#01d167" />}
              
              <Text style={styles.Small_text_green_style}>Hide card number</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.Debit_card_container_main_view}>
            <View style={styles.Debit_card_container_view}>
              <View style={styles.Aspire_logo_container_view}>
                <Ionicons name="home" size={15} color="#fff" />
                <Text style={[styles.Small_text_white_style]}>aspire</Text>
              </View>
              <Text style={styles.Medium_text_white_style}>Mark Henry</Text>
              {HideCardNumber ? <Text style={styles.Small_text_style}>* * * *       * * * *       * * * *       * * * *</Text> : <Text style={styles.Small_text_style}>5 6 4 7       3 4 1 1       2 4 1 3       2 0 2 0</Text>}
              
              <View style={[styles.Title_container_view, { marginTop: '4%' }]}>
                <Text style={[styles.Small_text_style, { marginRight: '10%', marginTop: 0 }]}>Thru: 12/20</Text>
                <Text style={[styles.Small_text_style, { marginTop: 0 }]}>CVV: 456</Text>
              </View>
              <View style={styles.Aspire_logo_container_view}>
                <Icon name="cc-visa" size={40} color="#fff" />
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={{ width: '100%' }}>
          <View>
            {WeeklyLimit == null ?
              <View></View>
              :
              <View>
                <View style={[styles.Title_container_view, { alignContent: 'center', marginTop: '4%', marginBottom: '2%' }]}>
                  <Text style={styles.Small_text_black_style}>Debit Card spending limit</Text>
                  <View style={styles.Amount_container_view}>
                    <Text style={styles.Small_text_green_style}>$345</Text>
                    <Text style={[styles.Small_text_grey_style, { marginTop: 0 }]}> | </Text>
                    <Text style={[styles.Small_text_grey_style, { marginTop: 0 }]}>${WeeklyLimit}</Text>
                  </View>
                </View>
                <Progress.Bar progress={0.1} color='#01d167' unfilledColor='#eee' borderWidth={0} width={null} height={15} borderRadius={50} />
              </View>
            }

            <View style={styles.Options_container_view}>
              <Ionicons name="arrow-up-circle" size={35} color="#325baf" />
              <View style={{ marginLeft: '2%' }}>
                <Text style={[styles.Medium_text_black_style]}>Top-up account</Text>
                <Text style={[styles.Small_text_grey_style]}>Deposit money to your account to use with card</Text>
              </View>
            </View>
            <View style={styles.Options_container_view}>
              <Ionicons name="speedometer" size={30} color="#325baf" />
              <View style={{ flex: 0.8, marginLeft: '2%' }}>
                <Text style={[styles.Medium_text_black_style]}>Weekly spending limit</Text>
                {WeeklyLimit == "0" ?
                  <Text style={[styles.Small_text_grey_style]}>You haven't set any spending limit on card</Text>
                  :
                  <Text style={[styles.Small_text_grey_style]}>Your weekly spending limit is S$ {WeeklyLimit}</Text>
                }

              </View>

              <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                <Switch
                  containerStyle={{ alignSelf: 'flex-end', marginRight: 1 }}
                  value={SwitchWeekly}
                  onValueChange={(val) => { navigation.navigate('Auth'), setSwitchWeekly(val) }}
                  disabled={false}
                  circleSize={20}
                  circleBorderWidth={2}
                  circleBorderActiveColor='#30a566'
                  circleBorderInactiveColor='#d2d2d2'
                  backgroundActive={'#30a566'}
                  backgroundInactive={'#d2d2d2'}
                  circleActiveColor={'#fff'}
                  circleInActiveColor={'#eee'}
                  changeValueImmediately={true}
                  innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2}
                  switchRightPx={2}
                  switchWidthMultiplier={2}

                />
              </View>

            </View>
            <View style={styles.Options_container_view}>
              <MaterialCommunityIcons name="card-bulleted-off" size={30} color="#325baf" />
              <View style={{ flex: 0.8, marginLeft: '2%' }}>
                <Text style={[styles.Medium_text_black_style]}>Freeze card</Text>
                <Text style={[styles.Small_text_grey_style]}>Your debit card is currently active</Text>
              </View>

              <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                <Switch
                  containerStyle={{ alignSelf: 'flex-end', marginRight: 1 }}
                  value={SwitchFreeze}
                  onValueChange={(val) => setSwitchFreeze(val)}
                  disabled={false}
                  circleSize={20}
                  circleBorderWidth={2}
                  circleBorderActiveColor='#30a566'
                  circleBorderInactiveColor='#d2d2d2'
                  backgroundActive={'#30a566'}
                  backgroundInactive={'#d2d2d2'}
                  circleActiveColor={'#fff'}
                  circleInActiveColor={'#eee'}
                  changeValueImmediately={true}
                  innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2}
                  switchRightPx={2}
                  switchWidthMultiplier={2}
                />
              </View>

            </View>

          </View>

        </ScrollView>
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
    //fontWeight: 'bold',
    fontSize: RFPercentage(1.8),
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
    marginTop: '2%',
    alignSelf: 'flex-start',
    fontSize: RFPercentage(1.5),
  },
  Small_text_green_style: {
    textAlign: "left",
    color: "#01d167",
    alignSelf: 'flex-start',
    fontSize: RFPercentage(1.5),
    marginLeft: '5%',
    fontWeight: 'bold'
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
  Top_container_view: { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#0c365a' },
  Top_background_view_container: { height: '35%', width: '100%', alignSelf: 'flex-end', alignItems: 'flex-end', backgroundColor: '#0c365a' },
  Bottom_background_view_container: { height: '65%', width: '100%', alignSelf: 'flex-end', alignItems: 'flex-end', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  Inner_container_view: { position: 'absolute', height: '100%', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '5%' },
  Card_container_view: { alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' },
  Title_container_view: { alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' },
  Hide_number_container_view: { alignSelf: 'flex-end', justifyContent: 'center', flexDirection: 'row', width: '40%', backgroundColor: '#fff', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: '2%' },
  Aspire_logo_container_view: { alignSelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '30%' },
  Debit_card_container_main_view: { justifyContent: 'center', width: '100%', backgroundColor: '#fff', borderRadius: 10, borderTopRightRadius: 0 },
  Debit_card_container_view: { justifyContent: 'center', width: '100%', backgroundColor: '#01d167', borderRadius: 10, padding: '7%' },
  Options_container_view: { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row', marginTop: '7%' },
  Amount_container_view: { flex: 1, justifyContent: 'flex-end', alignSelf: 'center', flexDirection: 'row' },
});

export default HomeScreen;