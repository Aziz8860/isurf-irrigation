import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import PercentageBar from './PercentageBar';
import { fonts, colors } from './utils';

const baseUrl = "https://api.thingspeak.com";

const App = () => {
  let intervalId

  const percentage = 60

  const [humidity1, setHumidity1] = useState(0);
  const [humidity2, setHumidity2] = useState(0);
  const [humidity3, setHumidity3] = useState(0);
  const [humidity4, setHumidity4] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  useEffect(() => {
    // Fetch Data
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/channels/2188426/feeds.json?api_key=70GX3Q7IIG5U6GX2&results=2`;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setHumidity1(response.data.feeds[0].field1 || "(null)");
          setHumidity2(response.data.feeds[0].field2 || "(null)");
          setHumidity3(response.data.feeds[0].field3 || "(null)");
          setHumidity4(response.data.feeds[0].field4 || "(null)");
          setWaterLevel(response.data.feeds[0].field5 || "(null)");
          console.log("Data Fetched");
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setErrorFlag(true);
      }
    };

    const startFetchingData = () => {
      fetchData(); // Fetch data immediately

      intervalId = setInterval(fetchData, 5000); // Fetch data every 4 seconds
    };

    startFetchingData();

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.iconTitle}>I-Surf Irrigation</Text>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.text}>Kelembapan 1: {humidity1}</Text>
            <PercentageBar percentage={percentage} />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Kelembapan 2: {humidity2}</Text>
            <PercentageBar percentage={percentage} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.text}>Kelembapan 3: {humidity3}</Text>
            <PercentageBar percentage={percentage} />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Kelembapan 4: {humidity4}</Text>
            <PercentageBar percentage={percentage} />
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>Ketinggian Air: {waterLevel} cm</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  iconTitle: {
    marginBottom: 12,
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: 'black',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    color: 'white'
  },
  item: {
    margin: 2,
    width: 180,
    backgroundColor: colors.grayBold,
    borderRadius: 8,
    padding: 8
  },
})