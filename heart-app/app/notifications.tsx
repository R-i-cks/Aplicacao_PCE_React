import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView , StyleSheet, FlatList , TextInput, Pressable, Text, Alert, View, Dimensions} from 'react-native';
import { Link } from "expo-router";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import './style.css';
import { format } from 'date-fns'






const Add_Notification_Input = () => {
  const [M_Date, setDate] = React.useState(new Date());
  const [info, setInfo] = React.useState('');

  const validateForm = () => {
    if (!M_Date) {
      Alert.alert('Error', 'You must in introduce the date for your notification!');
      return false;
    }
    // Falta adicionar validação de formato
    Alert.alert('Error', 'All good');
    return true;
  };

  const handleSubmit = async () => {
    const nova_notificacao = { 
        data : M_Date, 
        texto: info
      }
    axios.post('http://localhost:5000/api/notificacoes', nova_notificacao)
    .then(response => {
      console.log('Resposta:', response.data);
    })
    .catch(error => {
      console.error('Erro:', error.response.data);
    });
    



const getData = async () => {
  const [not, setNot] = useState([]);
  try {
    const response = await axios.get('http://localhost:5000/api/notificacoes');
    const sortedData = response.data.sort((a, b) => new Date(a.data) - new Date(b.data))
    setNot(sortedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error
  }
};

useEffect(() => {
  getData();
}, []);

};
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
          <SafeAreaView style={styles.safearea}>
            <Text style={styles.label}>Date:</Text>
            <Datetime className="react-datetime-picker" 
            value={M_Date}
            onChange={(date) => setDate(date)}
            />
      
        

            <Text style={styles.label}>Descrição evento</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInfo}
              value={info}
              placeholder="Don´t forget to measure your blood pressure!"
            />
      
            
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Data:</Text>
                    <FlatList
                      data={info}
                      renderItem={({ item }) => (
                        <View style={dataView}>
                          <Text style={titleData}> Date:</Text> 
                          <Text style={text}>{format(new Date(item.data), 'yyyy-MM-dd')}</Text>
                          <Text style={titleData}> Texto:</Text>
                          <Text style={text}>{item.texto}</Text>
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
        </ScrollView>
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


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    color: '#33333',
    backgroundColor: 'white',
  },
  safearea: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#f97000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#f97000',
    color: 'white',
  },

  
});

export default Add_Notification_Input;


