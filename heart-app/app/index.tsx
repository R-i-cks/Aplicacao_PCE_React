import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Heart tracker</Text>
      </View>

      <View style={styles.buttonContainer}>

      <Link href="/add_measure" asChild>
        <Button
          title="Add measure"
        />
      </Link>

      <Link href="/history" asChild>
        <Button
          title="History"
        />
      </Link>

      <Link href="/notifications" asChild>
        <Button
          title="Notifications"
        />
      </Link>
      
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    padding: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  buttonContainer: {
    flex: 1,
  },
});

