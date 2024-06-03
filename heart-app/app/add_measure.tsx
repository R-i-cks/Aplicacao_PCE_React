import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button, Text, Alert} from 'react-native';
import { Link } from "expo-router";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";







const Add_Measure_Input = () => {
  const [n, nome] = React.useState('');
  const [bpm, heart_rate] = React.useState('');
  const [sp, syst_pressure] = React.useState('');
  const [dp, diast_pressure] = React.useState('');
  const [M_Date, setDate] = React.useState(new Date());

  const validateForm = () => {
    if (!n || !bpm || !sp || !dp || !Date ) {
      Alert.alert('Error', 'All fields are required!');
      return false;
    }
    // Falta adicionar validação de formato
    Alert.alert('Error', 'All fields are required!');
    return true;
  };

  const handleSubmit = async () => {
    const novo_registo = {
        nome:n , 
        data : M_Date, 
        pressao_sist : parseInt(sp, 10), 
        pressao_diast: parseInt(dp, 10), 
        bpm : parseInt(bpm, 10)
      }
};

  return (
    <SafeAreaView>
        <Text>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={nome}
        value={n}
        placeholder="JOHN DOE"
      />

<Text>Date</Text>
    <Datetime />

<Text> Heart Rate (bpm)</Text>
      <TextInput
        style={styles.input}
        onChangeText={heart_rate}
        value={bpm}
        placeholder="bpm"
        keyboardType="numeric"
      />
<Text>Systolic Pressure (mmHg)</Text>
      <TextInput
        style={styles.input}
        onChangeText={syst_pressure}
        value={sp}
        placeholder="mmHg"
        keyboardType="numeric"
      />
    <Text>Diastolic Pressure (mmHg) </Text>
    <TextInput
        style={styles.input}
        onChangeText={diast_pressure}
        value={dp}
        placeholder="mmHg"
        keyboardType="numeric"
      />

        <Button onPress={handleSubmit}
            title="Submit"
            />
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Add_Measure_Input;