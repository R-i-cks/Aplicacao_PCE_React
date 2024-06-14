import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import './style.css';
import { LineChart } from "react-native-chart-kit";
const fetchAndFilterOldEntries = require('../scripts/filter_dates');

const YourComponent = () => {
  const [dados, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/registos');
      const sortedData = response.data.sort((a, b) => new Date(a.date_t) - new Date(b.date_t));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/registos/${id}`);
      getData();
    } catch (error) {
      console.error('Erro ao remover o registo:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const itemToEdit = dados.find(item => item._id === id);
    setEditedFields(itemToEdit || {});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/registos/${id}`, editedFields);
      getData();
      setEditingId(null);
      setEditedFields({});
    } catch (error) {
      console.error('Erro ao editar o registo:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const armCodes = {
    'at0026': 'Left Arm',
    'at0025': 'Right Arm',
  };

  const getArmCode = (arm) => {
    return Object.keys(armCodes).find(key => armCodes[key] === arm);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
      <Pressable
        style={{
          backgroundColor: '#f97000',
          padding: 12,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 16,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Generate PDF</Text>
      </Pressable>


// codigo para escolher a filtragem





      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Systolic Pressure:</Text>
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: dados.map(item => format(new Date(item.date_t), 'yyyy-MM-dd')),
            datasets: [{ data: dados.map(item => item.data.at0004) }]
          }}
          width={screenWidth - 32}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontWeight: 'bold',
              fontFamily: 'sans-serif'
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            propsForVerticalLabels: {
              fontWeight: 'bold'
            }
          }}
          bezier
          style={chartStyle}
        />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Diastolic Pressure:</Text>
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: dados.map(item => format(new Date(item.date_t), 'yyyy-MM-dd')),
            datasets: [{ data: dados.map(item => item.data.at0005) }]
          }}
          width={screenWidth - 32}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontWeight: 'bold',
              fontFamily: 'sans-serif'
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            propsForVerticalLabels: {
              fontWeight: 'bold'
            }
          }}
          bezier
          style={chartStyle}
        />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Bpms:</Text>
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: dados.map(item => format(new Date(item.date_t), 'yyyy-MM-dd')),
            datasets: [{ data: dados.map(item => item.data.bpm) }]
          }}
          width={screenWidth - 32}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontWeight: 'bold',
              fontFamily: 'sans-serif'
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            propsForVerticalLabels: {
              fontWeight: 'bold'
            }
          }}
          bezier
          style={chartStyle}
        />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Data:</Text>
      <FlatList
        data={dados}
        renderItem={({ item }) => (
          <View style={dataView}>
            <Text style={titleData}> Date:</Text>
            {editingId === item._id ? (
              <Datetime
                value={new Date(editedFields.date_t)}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                className="react-datetime-picker"
                onChange={(date) => {
                  setEditedFields({ ...editedFields, date_t: date });
                }}
              />
            ) : (
              <Text style={text}>{format(new Date(item.date_t), 'yyyy-MM-dd')}</Text>
            )}



            <Text style={titleData}> Systolic Pressure:</Text>
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={String(editedFields.data?.at0004 || item.data.at0004)}
                onChangeText={(text) => setEditedFields({ ...editedFields, data: { ...editedFields.data, at0004: text } })}
              />
            ) : (
              <Text style={text}>{item.data.at0004}</Text>
            )}

            <Text style={titleData}> Diastolic Pressure:</Text>
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={String(editedFields.data?.at0005 || item.data.at0005)}
                onChangeText={(text) => setEditedFields({ ...editedFields, data: { ...editedFields.data, at0005: text } })}
              />
            ) : (
              <Text style={text}>{item.data.at0005}</Text>
            )}

            <Text style={titleData}> Heart Rate:</Text>
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={String(editedFields.data?.bpm || item.data.bpm)}
                onChangeText={(text) => setEditedFields({ ...editedFields, data: { ...editedFields.data, bpm: text } })}
              />
            ) : (
              <Text style={text}>{item.data.bpm}</Text>
            )}

            <Text style={titleData}> Arm:</Text>
            {editingId === item._id ? (
              <View style={radioGroup}>
                {Object.values(armCodes).map((arm, index) => (
                  <TouchableOpacity
                    key={index}
                    style={radioOption}
                    onPress={() => setEditedFields({
                      ...editedFields,
                      protocol: { ...editedFields.protocol, at0014: getArmCode(arm) }
                    })}
                  >
                    <View style={[radioButton, {
                      borderColor: editedFields.protocol?.at0014 === getArmCode(arm) ? '#f97000' : '#000',
                    }]}>
                      {editedFields.protocol?.at0014 === getArmCode(arm) && <View style={radioSelected} />}
                    </View>
                    <Text style={radioLabel}>{arm}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={text}>{armCodes[item.protocol.at0014]}</Text>
            )}

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Pressable
                style={editButton}
                onPress={() => {
                  if (editingId === item._id) {
                    handleSave(item._id);
                  } else {
                    handleEdit(item._id);
                  }
                }}
              >
                <Text style={buttonText}>{editingId === item._id ? 'Save' : 'Edit'}</Text>
              </Pressable>
              {editingId === item._id ? null : (
                <Pressable
                  style={removeButton}
                  onPress={() => handleRemove(item._id)}
                >
                  <Text style={buttonText}>Remove</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
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

const editButton = {
  backgroundColor: '#f97000',
  padding: 8,
  borderRadius: 5,
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
};

const removeButton = {
  backgroundColor: '#f97000',
  padding: 8,
  borderRadius: 5,
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginLeft: 8,
};

const buttonText = {
  color: 'white',
  fontWeight: 'bold',
};

const input = {
  height: 40,
  margin: 8,
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
};

const radioGroup = {
  flexDirection: 'row',
  marginVertical: 10,

};

const radioOption = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
};

const radioButton = {
  height: 20,
  width: 20,
  borderRadius: 10,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
};

const radioSelected = {
  height: 12,
  width: 12,
  borderRadius: 6,
  backgroundColor: '#f97000',
};

const radioLabel = {
  marginLeft: 8,
};

export default YourComponent;
