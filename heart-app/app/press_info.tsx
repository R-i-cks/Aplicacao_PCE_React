import { View, Text, StyleSheet } from 'react-native';

export default function Notifications_Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Preassure</Text>
      <Text style={styles.description}>Blood pressure is the amount of force your blood uses to get through your arteries. When your heart pumps, it uses force to push oxygen-rich blood out to your arteries. They bring it to your body’s cells and tissues. If your blood pressure is too high, it can cause health issues.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'orangered',
    },

    description: {
      fontSize: 20,
      margin: 20,
      
      textAlign: 'center',
    },
  });