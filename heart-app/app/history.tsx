import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Dimensions, Pressable, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { LineChart } from "react-native-chart-kit";

const YourComponent = () => {
  const [dados, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Estado para controlar o ID do item em edição
  const [editedFields, setEditedFields] = useState({}); // Estado para armazenar os campos editados

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registos');
      const sortedData = response.data.sort((a, b) => new Date(a.date_t) - new Date(b.date_t));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/registos/${id}`);
      getData(); // Atualiza os dados após a remoção
    } catch (error) {
      console.error('Erro ao remover o registo:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(id)
    setEditingId(id); // Define o ID do item em edição
  };

  const handleSave = async (id) => {
    try {
      // Atualiza os campos editados no servidor
      console.log(editedFields)
      await axios.put(`http://localhost:5000/api/registos/${id}`, editedFields);
      console.log("fiz put")
      getData(); // Atualiza os dados após a edição
      setEditingId(null); // Volta para o modo de visualização padrão
      setEditedFields({}); // Limpa os campos editados
    } catch (error) {
      console.error('Erro ao editar o registo:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  let p_s = [];
  let p_d = [];
  let bpms = [];

  let datas = [];
  let arms = [];
  let entrada;

  for (entrada in dados){
      p_s.push(dados[entrada].data.at0004)
      p_d.push(dados[entrada].data.at0005)
      bpms.push(dados[entrada].data.bpm)
      datas.push(format(new Date(dados[entrada].date_t), 'yyyy-MM-dd'))
      if (dados[entrada].protocol.at0014 == 'at0025'){
        arms.push('Right arm')
      } else{
        arms.push('Left arm')
      }
      arms.push()
      }
    
      const screenWidth = Dimensions.get("window").width;

      const armCodes = {
        'at0026': 'Left Arm',
        'at0025': 'Right Arm',
        // Add more codes and their text representations as needed
      };
      const armCodesBack = {
        'Left Arm': 'at0026',
        'Right Arm': 'at0025' ,
        // Add more codes and their text representations as needed
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
          }}
          
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Generate PDF</Text>
        </Pressable>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, marginTop: 4 }}>Systolic Pressure:</Text>
          <View style={{ alignItems: 'center' }}>
            <LineChart
              data={{
                labels: datas,
                datasets: [{ data: p_s }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif' // Bold labels
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
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
                labels: datas,
                datasets: [{ data: p_d }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold', // Bold labels
                  fontFamily: 'sans-serif'
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
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
                labels: datas,
                datasets: [{ data: bpms }]
              }}
              width={screenWidth - 32} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff", // White background
                backgroundGradientFrom: "#ffffff", // White gradient start
                backgroundGradientTo: "#ffffff", // White gradient end
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(227, 115, 66, ${opacity})`, // Black text for better contrast on white background
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                propsForLabels: {
                  fontWeight: 'bold', // Bold labels
                  fontFamily: 'sans-serif'
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726" // Orange dots
                },
                propsForVerticalLabels: {
                  fontWeight: 'bold' // Bold vertical labels
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
            <Text style={text}>{format(new Date(item.date_t), 'yyyy-MM-dd')}</Text>
            <Text style={titleData}> Systolic Pressure:</Text>
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={editedFields.data.at0004 || item.data.at0004}
                onChangeText={(text) => setEditedFields({...editedFields, {data:at0004}: text})}
              />
            ) : (
              <Text style={text}>{item.data.at0004}</Text>
            )}
            <Text style={titleData}> Diastolic Pressure:</Text>
            {editingId === item._id ? (
              <TextInput
              style={input}
                value={editedFields.pressao_diast || item.data.at0005}
                onChangeText={(text) => setEditedFields({...editedFields, pressao_diast: text})}
              />
            ) : (
              <Text style={text}>{item.data.at0005}</Text>
            )}
            <Text style={titleData}> Heart Rate:</Text>
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={editedFields.bpm || item.data.bpm}
                onChangeText={(text) => setEditedFields({...editedFields, bpm: text})}
              />
            ) : (
              <Text style={text}>{item.data.bpm}</Text>
            )}
            <Text style={titleData}> Arm:</Text>
            
            {editingId === item._id ? (
              <TextInput
                style={input}
                value={editedFields.arm || armCodes[item.protocol.at0014]}
                onChangeText={(text) => {
                  // Find the code from the text if needed; if using text directly, adjust as required
                  setEditedFields({ ...editedFields, arm: armCodesBack[text] });
                }}
              />
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
      height: 30,
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


export default YourComponent;