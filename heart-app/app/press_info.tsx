import { color } from '@rneui/themed/dist/config';
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FAQDropdown = () => {
  const [showAnswers, setShowAnswers] = useState({
    whatIsBloodPressure: false,
    howToPrepare: false,
    whyMatters: false,
    whoIsAtRisk: false,
    howToDecrease: false,
  });

  const toggleAnswer = (section) => {
    setShowAnswers(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.container}>
      <Text style={styles.title_page}>Frequent Questions</Text>
        <TouchableOpacity onPress={() => toggleAnswer('whatIsBloodPressure')}>
          <Text style={styles.title}>- What is Blood Pressure</Text>
        </TouchableOpacity>
        {showAnswers.whatIsBloodPressure && (
          <Text style={styles.description}>
            Blood pressure is the amount of force your blood uses to get through your arteries. When your heart pumps, it uses force to push oxygen-rich blood out to your arteries. They bring it to your body’s cells and tissues. If your blood pressure is too high, it can cause health issues.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('howToPrepare')}>
          <Text style={styles.title}>- How to Prepare for a Blood Pressure Measurement</Text>
        </TouchableOpacity>
        {showAnswers.howToPrepare && (
          <Text style={styles.description}>
            - Wait 30 minutes to measure your blood pressure if you just smoked, exercised or had a cup of coffee.
            {'\n\n'}
            - Go to the bathroom and pee until your bladder is empty.
            {'\n\n'}
            - Roll up your sleeve so you don’t put the cuff over your shirt sleeve.
            {'\n\n'}
            - Sit for at least five minutes without talking.
            {'\n\n'}
            - Sit up straight with your feet flat on the floor. Don’t cross your legs.
            {'\n\n'}
            - Rest your arm on a table in front of you so your arm is at heart level.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('whyMatters')}>
          <Text style={styles.title}>- Why Blood Pressure Matters</Text>
        </TouchableOpacity>
        {showAnswers.whyMatters && (
          <Text style={styles.description}>
            High blood pressure — the “silent killer” — usually has no symptoms. It can damage your heart, kidneys and brain before you know anything is wrong.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('whoIsAtRisk')}>
          <Text style={styles.title}>- Who is at Risk of Getting High Blood Pressure</Text>
        </TouchableOpacity>
        {showAnswers.whoIsAtRisk && (
          <Text style={styles.description}>
            Your risk of high blood pressure is higher if you:
            {'\n\n'}
            - Have a family history of high blood pressure, cardiovascular disease or diabetes.
            {'\n\n'}
            - Are Black.
            {'\n\n'}
            - Are age 60 or older.
            {'\n\n'}
            - Have high cholesterol.
            {'\n\n'}
            - Use oral contraceptives (birth control pills).
            {'\n\n'}
            - Have obesity.
            {'\n\n'}
            - Have diabetes.
            {'\n\n'}
            - Use tobacco products.
            {'\n\n'}
            - Don’t exercise.
            {'\n\n'}
            - Eat a high salt diet.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('howToDecrease')}>
          <Text style={styles.title}>- How to Decrease High Blood Pressure</Text>
        </TouchableOpacity>
        {showAnswers.howToDecrease && (
          <Text style={styles.description}>
            Diet and lifestyle changes:
            {'\n\n'}
            - Reach and stay at your ideal body weight;
            {'\n\n'}
            - Get regular exercise;
            {'\n\n'}
            - Eat a well-balanced, heart-healthy diet that is low in salt, fat and cholesterol, and contains lots of fresh fruits and vegetables. Your diet is an important part of managing your blood pressure. 
            {'\n\n'}
            - Having no more than two drinks containing alcohol per day (for most men) and no more than one drink per day for women and lighter-weight men. One drink is considered to be 12 ounces of beer or wine cooler, 5 ounces of wine or 1.5 ounces of 80-proof liquor.
            {'\n\n'}
            - Manage stress and anger.
            {'\n\n'}
            - Avoid all tobacco and nicotine products.
            {'\n\n'}
            - Other lifestyle changes, such as managing lipid levels (LDL, cholesterol, triglycerides) and managing other health conditions, such as diabetes.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'orangered',
  },title_page: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default FAQDropdown;
