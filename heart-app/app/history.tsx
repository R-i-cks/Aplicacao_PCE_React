import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns'


import {
  LineChart,
} from "react-native-chart-kit";

const YourComponent = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/registos');
      const sortedData = response.data.sort((a, b) => new Date(a.data) - new Date(b.data))
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error
    }
  };


  useEffect(() => {
    getData();
  }, []);



  let p_s = [];
  let p_d = [];
  let bpms = [];
  let datas = [];
  let arms = [];
  let entrada;
  for (entrada in data){
    console.log("Entrada: " + data[entrada])
      p_s.push(data[entrada].pressao_sist)
      p_d.push(data[entrada].pressao_diast)
      bpms.push(data[entrada].bpm)
      datas.push(format(new Date(data[entrada].data), 'yyyy-MM-dd'))
      arms.push(data[entrada].arm)
      }
    
      const screenWidth = Dimensions.get("window").width;

      return (
        <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Pressão Sistólica:</Text>
          <View style={{ alignItems: 'center' }}>
            <LineChart
              data={{
                labels: datas,
                datasets: [{ data: p_s }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif' // Bold labels
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
                }
              }}
              bezier
              style={chartStyle}
            />
          </View>
    
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Pressão Diastólica:</Text>
          <View style={{ alignItems: 'center' }}>
            <LineChart
              data={{
                labels: datas,
                datasets: [{ data: p_d }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold', // Bold labels
                  fontFamily: 'sans-serif'
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
                }
              }}
              bezier
              style={chartStyle}
            />
          </View>
    
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Bpms:</Text>
          <View style={{ alignItems: 'center' }}>
            <LineChart
              data={{
                labels: datas,
                datasets: [{ data: bpms }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold', // Bold labels
                  fontFamily: 'sans-serif'
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
                }
              }}
              bezier
              style={chartStyle}
            />
          </View>
    
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Data:</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={dataView}>
                <Text style={titleData}> Date:</Text> 
                <Text style={text}>{format(new Date(item.data), 'yyyy-MM-dd')}</Text>
                <Text style={titleData}> Systolic Pressure:</Text>
                <Text style={text}>{item.pressao_sist}</Text>
                <Text style={titleData}> Diastolic Pressure:</Text>
                <Text style={text}>{item.pressao_diast}</Text>
                <Text style={titleData}> Heart Rate:</Text>
                <Text style={text}>{item.bpm}</Text>
                <Text style={titleData}> Arm:</Text>
                <Text style={text}>{item.arm}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    };
    
    const chartStyle = {
      margin: 8,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: 'coral',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    };
    
    const dataView = {
      backgroundColor: 'white',
      borderColor: 'coral',
      borderWidth: 2,
      borderRadius: 8,
      padding: 6,
      margin: 4,
    };
    
    const text = {
      padding: 3,
    };
    
    const titleData = {
      fontWeight: 'bold',
    };

export default YourComponent;