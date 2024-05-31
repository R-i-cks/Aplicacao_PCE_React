import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Flex = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Heart tracker</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add measure"
        />
        <Button
          title="History"
        />
        <Button
          title="Notifications"
        />
      </View>
    </View>
  );
};

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

export default Flex;
