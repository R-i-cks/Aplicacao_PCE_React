import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Dimensions } from 'react-native';
import axios from 'axios';


import {
  LineChart,
} from "react-native-chart-kit";

const YourComponent = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registos');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error
    }
  };


  useEffect(() => {
    getData();
  }, []);



let p_s = []
let p_d = []
let bpms = []
let datas =[]
let entrada
for (entrada in data){
  console.log("Entrada: " + data[entrada])
    p_s.push(data[entrada].pressao_sist)
    p_d.push(data[entrada].pressao_diast)
    bpms.push(data[entrada].bpm)
    datas.push(data[entrada].data)
    }
    
console.log(p_s)
  return (
    <ScrollView>
  <Text>Pressão Sistólica</Text>
  <LineChart
    data={{
      labels: datas,
      datasets: [
        {
          data: p_s
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

<Text>Pressão Diastólica</Text>
<LineChart
    data={{
      labels: datas,
      datasets: [
        {
          data: p_d
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />


<Text>Bpms</Text>
<LineChart
    data={{
      labels: datas,
      datasets: [
        {
          data: bpms
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />


      <Text>Data:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.data}</Text>
            <Text>{item.pressao_sist}</Text>
            <Text>{item.pressao_diast}</Text>
            <Text>{item.bpm}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default YourComponent;