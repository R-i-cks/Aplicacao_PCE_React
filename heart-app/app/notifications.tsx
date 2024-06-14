import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, FlatList, TextInput, Pressable, Text, View } from 'react-native';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import './style.css';
import { format } from 'date-fns';
import { Divider } from '@rneui/themed';
import AwesomeAlert from 'react-native-awesome-alerts';

const Add_Notification_Input = () => {
  const [M_Date, setDate] = useState(new Date());
  const [info, setInfo] = useState('');
  const [notifications, setNotifications] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const resetFields = () => {
    setDate(new Date());
    setInfo('');
  };

  const validateForm = () => {
    if (!M_Date || !info.trim()) {
      setAlertTitle('Error');
      setAlertMessage('Please provide both date and description for the notification.');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const nova_notificacao = {
      data: M_Date,
      texto: info
    };

    try {
      const response = await axios.post('http://localhost:5001/api/notificacoes', nova_notificacao);
      console.log('Response:', response.data);
      // Atualiza os dados após a submissão bem-sucedida
      setAlertTitle('Sucess');
      setAlertMessage("Notification added with sucess!");
      setShowAlert(true);
      getData();
      resetFields()
    } catch (error) {
      setAlertTitle('Error');
      setAlertMessage(error.response ? error.response.data : error.message);
      setShowAlert(true);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/notificacoes');
      const sortedData = response.data.sort((a, b) => new Date(a.data) - new Date(b.data));
      setNotifications(sortedData);
    } catch (error) {
      setAlertTitle('Error');
      setAlertMessage('Error fetching data: ' + error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
      <View style={styles.safearea}>
        <Text style={styles.label}>Date:</Text>
        <Datetime
          className="react-datetime-picker"
          value={M_Date}
          onChange={(date) => setDate(date)}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInfo}
          value={info}
          placeholder="Don't forget to measure your blood pressure!"
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 95 }}>
        <Divider marginTop={80} width={3} />
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 4, marginTop: 20 }}>History:</Text>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.dataView}>
              <Text style={styles.titleData}>Date:</Text>
              <Text style={styles.text}>{format(new Date(item.data), 'yyyy-MM-dd')}</Text>
              <Text style={styles.titleData}>Description:</Text>
              <Text style={styles.text}>{item.texto}</Text>
            </View>
          )}
        />
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f97000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 60,
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
    marginTop: 20,
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
  dataView: {
    backgroundColor: 'white',
    borderColor: 'coral',
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
    margin: 4,
  },
  text: {
    padding: 3,
  },
  titleData: {
    fontWeight: 'bold',
  },
});

export default Add_Notification_Input;
