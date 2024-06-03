import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

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

  return (
    <View>
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
    </View>
  );
};

export default YourComponent;