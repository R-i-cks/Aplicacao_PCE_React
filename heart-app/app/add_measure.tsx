import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Pressable, Text, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import './style.css';
import axios from 'axios';
import { Link } from "expo-router";


const Add_Measure_Input = () => {
  const [bpm, heart_rate] = React.useState('');
  const [sp, syst_pressure] = React.useState('');
  const [dp, diast_pressure] = React.useState('');
  const [M_Date, setDate] = React.useState(new Date());
  const [selectedArm, setSelectedArm] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [redirectPath, setRedirectPath] = React.useState('');


  const isValidInteger = (value) => {
    // Check if the value is a valid integer string
    return /^-?\d+$/.test(value);
  };

  const validateForm = () => {
    if (!isValidInteger(bpm) || !isValidInteger(sp) || !isValidInteger(dp) || !M_Date || !selectedArm) {
      setAlertTitle('Error');
      setAlertMessage('All fields are required! Some fields may not be the correct type!');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const systolicValue = parseInt(sp, 10);
    const diastolicValue = parseInt(dp, 10);
    const heart_rate = parseInt(bpm, 10);
    let arm_loc='';
    if (selectedArm == 'Right arm'){
      arm_loc = 'at0025';
    } else{
      arm_loc = 'at0026';
    }
    let aviso = '';
    if (systolicValue > 140 && diastolicValue > 90) {
      aviso = 'High values for both pressures! Seek medical help!';
    } else if (systolicValue > 140) {
      aviso = 'High systolic blood pressure! Seek medical help!';
    } else if (diastolicValue > 90) {
      aviso = 'High diastolic blood pressure! Seek medical help!';
    }
    
    if (heart_rate < 60 || heart_rate > 100) {
      aviso = 'Heart rate is out of normal range! Seek medical help!';
    }
    
    if (systolicValue < 90 || diastolicValue < 60) {
      aviso = 'Blood pressure is too low! Seek medical help!';
    }
    

    const novo_registo = {
      date_t: M_Date,
      at0004: parseInt(sp, 10),
      at0005: parseInt(dp, 10),
      bpm: parseInt(bpm, 10),
      at0014: arm_loc,
    };

    axios.post('https://node-back-heartapp-5ce41f94a227.herokuapp.com/api/registos', novo_registo)
      .then(response => {
        console.log('Resposta:', response.data);
        setAlertTitle('Sucess');
        setAlertMessage(aviso + '\nNew measure entered sucessufully');
        setRedirectPath('/history');
        setShowAlert(true);
        

      })
      .catch(error => {
        console.error('Erro:', error.response.data);
        setAlertTitle('Failure');
        setAlertMessage('Insert failed, please try again later');
        setShowAlert(true);
      });
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    // Example redirection logic: use a router or navigation library
    window.location.href = redirectPath; // For browser apps
    // Alternatively, use React Router's history.push or similar for SPA routing
};

  return (
    <SafeAreaView style={styles.safearea}>
      <Text style={styles.label}>Date:</Text>
      <Datetime
        className="react-datetime-picker"
        value={M_Date}
        onChange={(date_t) => setDate(date_t)}
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
          <Text style={[styles.radioText, selectedArm === 'Right arm' && { color: 'white' }]}>Right Arm</Text>
        </Pressable>
        <Pressable
          style={[styles.radioButton, selectedArm === 'Left arm' && styles.selected]}
          onPress={() => setSelectedArm('Left arm')}
        >
          <Text style={[styles.radioText, selectedArm === 'Left arm' && { color: 'white' }]}>Left Arm</Text>
        </Pressable>
      </View>

      
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      
      
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
        onConfirmPressed={handleAlertConfirm}
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
