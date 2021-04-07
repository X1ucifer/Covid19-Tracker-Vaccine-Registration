import * as React from 'react';
import { useFonts } from 'expo-font';
import {
  Text,
  View,
  StyleSheet,

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CountryDetails({ navigation, route }) {
  const countryData = route.params.countryDataObj;
  const [addSave, setAddSave] = useState(false);

  function ResultCard({ resultType, stats }) {
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultType}>{resultType}</Text>
        <Text style={styles.stats}>{stats}</Text>
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Langar: require('./assets/fonts/Langar.ttf'),
  });

  let [googleFonts] = useFonts({
    GoogleFonts: require('./assets/fonts/GoogleSans.ttf'),
  });

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(value.country)
      await AsyncStorage.setItem(value.country, jsonValue);
      // console.log(jsonValue.country + " Stored!")
    } catch (e) {
      console.log(e)
    }
  }

  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem(value.country);
    } catch (e) {
      console.log(e)
    }
  }

  const addToSave = (value) => {
    if (!addSave) {
      storeData(value);
      setAddSave(!addSave);
    }
    else {
      removeData(value);
      setAddSave(!addSave);
    }
  }

  if (!fontsLoaded) {
    return <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text>Loading</Text></View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.countryNameView}>
        <Text style={styles.countryName}>{countryData.country}</Text>
        <TouchableOpacity onPress={() => addToSave(countryData)}>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Cases'}
          stats={formatResult(countryData.cases)}
        />
        <ResultCard
          resultType={'Today Cases'}
          stats={formatResult(countryData.todayCases)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Deaths'}
          stats={formatResult(countryData.deaths)}
        />
        <ResultCard
          resultType={'Today Deaths'}
          stats={formatResult(countryData.todayDeaths)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Recovered'}
          stats={formatResult(countryData.recovered)}
        />
        <ResultCard
          resultType={'Active Cases'}
          stats={formatResult(countryData.active)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Critical'}
          stats={formatResult(countryData.critical)}
        />
        <ResultCard
          resultType={'Total Tests'}
          stats={formatResult(countryData.totalTests)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white'
  },
  countryName: {
    fontSize: 32,
    fontFamily: 'Langar',
    color: 'black',
    letterSpacing: 3
  },
  countryNameView: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 60
  },
  resultCard: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 160,
    borderColor: '#f20505',
    borderWidth: 1
  },
  resultType: {
    fontFamily: 'GoogleFonts',
    fontSize: 16,
    color: 'black',
    fontWeight: '100'
  },
  stats: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
});
