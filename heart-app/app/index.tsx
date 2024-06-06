import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';



export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#ff8a00', '#da1b60']}
      style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HEART</Text>
          <Text style={styles.title}>TRACKER</Text>
        </View>

        <View style={styles.buttonContainer}>

          <Link href="/add_measure" asChild>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add measure</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/history" asChild>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/notifications" asChild>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>
          </Link>


          <Link href="/press_info" asChild>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>About blood pressure</Text>
            </TouchableOpacity>
          </Link>

        </View>
      </View>
    </LinearGradient>
  );
}





const styles = StyleSheet.create({

  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 45,
    marginTop: 60,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  
  },
  buttonContainer: {
    flex: 1,
    marginTop: 60,
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
