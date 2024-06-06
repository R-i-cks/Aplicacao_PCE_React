import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Pressable, Text, Alert, View} from 'react-native';
import { Link } from "expo-router";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import './style.css';



const Add_Measure_Input = () => {
  const [n, nome] = React.useState('user');
  const [bpm, heart_rate] = React.useState('');
  const [sp, syst_pressure] = React.useState('');
  const [dp, diast_pressure] = React.useState('');
  const [M_Date, setDate] = React.useState(new Date());
  const [selectedArm, setSelectedArm] = React.useState(null);

  const validateForm = () => {
    if (!bpm || !sp || !dp || !M_Date || !selectedArm) {
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
        bpm : parseInt(bpm, 10),
        arm: selectedArm 
      }
    axios.post('http://localhost:5001/api/registos', novo_registo)
    .then(response => {
      console.log('Resposta:', response.data);
    })
    .catch(error => {
      console.error('Erro:', error.response.data);
    });
    
};

    return (
      <SafeAreaView style={styles.safearea}>
        <Text style={styles.label}>Date:</Text>
        <Datetime className="react-datetime-picker" 
        value={M_Date}
        onChange={(date) => setDate(date)}
        />
  
        <Text style={styles.label}>Heart Rate (bpm):</Text>
        <TextInput
          style={styles.input}
          onChangeText={heart_rate}
          value={bpm}
          placeholder="bpm"
          keyboardType="numeric"
        />
  
        <Text style={styles.label}>Systolic Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={syst_pressure}
          value={sp}
          placeholder="mmHg"
          keyboardType="numeric"
        />
  
        <Text style={styles.label}>Diastolic Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={diast_pressure}
          value={dp}
          placeholder="mmHg"
          keyboardType="numeric"
        />
  
        
          <Text style={styles.label}>Arm:</Text>
          <View style={styles.radioContainer}>
            <Pressable
              style={[styles.radioButton, selectedArm === 'Right arm' && styles.selected]}
              onPress={() => setSelectedArm('Right arm')}
            >
              <Text style={[styles.radioText, selectedArm === 'Right arm' && { color: 'white'}]}>Right Arm</Text>
            </Pressable>
            <Pressable
              style={[styles.radioButton, selectedArm === 'Left arm' && styles.selected]}
              onPress={() => setSelectedArm('Left arm')}
            >
              <Text style={[styles.radioText, selectedArm === 'Left arm' && { color: 'white'}]}>Left Arm</Text>
            </Pressable>
          </View>
  
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </SafeAreaView>
  );
  
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

export default Add_Measure_Input;