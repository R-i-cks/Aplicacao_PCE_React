import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, FlatList, Dimensions, Pressable, TextInput, TouchableOpacity, Picker } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import './style.css';
import { LineChart } from "react-native-chart-kit";
const fetchAndFilterOldEntries = require('../scripts/filter_dates');
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { captureRef } from 'react-native-view-shot';

const YourComponent = () => {
  const [dados, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [selectedOption, setSelectedOption] = useState('all')

  const getData = async () => {
    try {
      const response = await axios.get('https://node-back-heartapp-5ce41f94a227.herokuapp.com/api/registos');
      const sortedData = response.data.sort((a, b) => new Date(a.date_t) - new Date(b.date_t));
      let filteredData = [];
      if (selectedOption === 'all') {
        filteredData = sortedData;
      } else { 
        const days = parseInt(selectedOption);
        filteredData = await fetchAndFilterOldEntries(days);
        filteredData = filteredData.sort((a, b) => new Date(a.date_t) - new Date(b.date_t));
      }

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://node-back-heartapp-5ce41f94a227.herokuapp.com/api/registos/${id}`);
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
      await axios.put(`https://node-back-heartapp-5ce41f94a227.herokuapp.com/api/registos/${id}`, editedFields);
      getData();
      setEditingId(null);
      setEditedFields({});
    } catch (error) {
      console.error('Erro ao editar o registo:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedOption]);

  const screenWidth = Dimensions.get("window").width;

  const armCodes = {
    'at0026': 'Left Arm',
    'at0025': 'Right Arm',
  };

  const getArmCode = (arm) => {
    return Object.keys(armCodes).find(key => armCodes[key] === arm);
  };

  const chartRef1 = useRef(null);  
  const chartRef2 = useRef(null); 
  const chartRef3 = useRef(null); 

  const captureChartAsImage = async (chartRef) => {
    const base64Image = await captureRef(chartRef.current, {
      format: 'png',
      quality: 1,
    });
    return base64Image;
  };

  const urlToBase64 = (url) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  };

  const captureAndEmbedChart = async (chartRef, pdfDoc, page, yOffset) => {
    if (chartRef.current) {
      try {
        if (chartRef == chartRef1) {
          const chartImageBase64 = await captureChartAsImage(chartRef);
          const pngImage = await pdfDoc.embedPng(chartImageBase64);
          const imageSize = pngImage.scale(0.37);

          const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

          page.drawText("Pressão Sistólica", {
            x: 20,
            y: yOffset + 210,  
            size: 16,
            font: font,
            color: rgb(0, 0, 0), 
          });

          page.drawImage(pngImage, {
            x: (page.getWidth() - imageSize.width) / 2,
            y: yOffset,
            width: imageSize.width,
            height: imageSize.height,
          });
          yOffset += imageSize.height; 
        }

        else if (chartRef == chartRef2) {
          const chartImageBase64 = await captureChartAsImage(chartRef);
          const pngImage = await pdfDoc.embedPng(chartImageBase64);
          const imageSize = pngImage.scale(0.37);

          const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

          page.drawText("Pressão Diastólica", {
            x: 20,
            y: yOffset + 210, 
            size: 16,
            font: font,
            color: rgb(0, 0, 0), 
          });

          page.drawImage(pngImage, {
            x: (page.getWidth() - imageSize.width) / 2,
            y: yOffset,
            width: imageSize.width,
            height: imageSize.height,
          });
          yOffset += imageSize.height; 
        }

        else if (chartRef == chartRef3) {
          const chartImageBase64 = await captureChartAsImage(chartRef);
          const pngImage = await pdfDoc.embedPng(chartImageBase64);
          const imageSize = pngImage.scale(0.37);

          const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

          page.drawText("Batimento cardíaco", {
            x: 20,
            y: yOffset + 210, 
            size: 16,
            font: font,
            color: rgb(0, 0, 0), 
          });

          page.drawImage(pngImage, {
            x: (page.getWidth() - imageSize.width) / 2,
            y: yOffset,
            width: imageSize.width,
            height: imageSize.height,
          });
          yOffset += imageSize.height; 
        }

      } catch (error) {
        console.error('Erro ao capturar ou incorporar imagem:', error);
      }
    }
  };

  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();

      const page = pdfDoc.addPage();

      const { width, height } = page.getSize();

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
      const fontSize = 24;
      const text = 'Relatório Médico';
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const xPosition = (width - textWidth) / 2;

      const imageUrl = 'https://png.pngtree.com/png-clipart/20230923/original/pngtree-flat-icon-of-arterial-blood-pressure-monitor-on-isolated-background-vector-png-image_12548737.png';
      const imageBase64 = await urlToBase64(imageUrl);

      let yOffset = height - 50;

      const image = await pdfDoc.embedPng(imageBase64);

      
      const imageDims = image.scale(0.07);

      const x = (width - (textWidth + imageDims.width + 10)) / 2;
      const y = height - 50;

      page.drawText(text, {
        x: xPosition,
        y: yOffset,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      page.drawImage(image, {
        x: 20,
        y: y - (imageDims.height - fontSize) / 2,
        width: imageDims.width,
        height: imageDims.height,
      });

      yOffset -= 250;


      const borderWidth = 2; 
      const margin = 10; 

      page.drawRectangle({
        x: margin,
        y: margin,
        width: width - 2 * margin,
        height: height - 2 * margin,
        borderColor: rgb(255 / 255, 121 / 255, 0), 
        borderWidth,
      });


      await Promise.all([
        captureAndEmbedChart(chartRef1, pdfDoc, page, yOffset),
        captureAndEmbedChart(chartRef2, pdfDoc, page, yOffset - 250),
        captureAndEmbedChart(chartRef3, pdfDoc, page, yOffset - 500),
      ]);


      const secondpage = pdfDoc.addPage();

      
      const tableTop = 730;
      const tableLeft = 50;
      const cellHeight = 30;
      const cellWidth = 100;
      const numCols = 5;

      const headers = ['Data', 'P. Sistólica', 'P. Diastólica', 'Bpm', 'Braço'];

      const tableData = [headers];

      let p_s = [];
      let p_d = [];
      let bpms = [];

      let datas = [];
      let arms = [];
      let entrada;

      for (entrada in dados) {
        p_s.push(dados[entrada].data.at0004)
        p_d.push(dados[entrada].data.at0005)
        bpms.push(dados[entrada].data.bpm)
        datas.push(format(new Date(dados[entrada].date_t), 'yyyy-MM-dd'))
        if (dados[entrada].protocol.at0014 == 'at0025') {
          arms.push('Right arm')
        } else {
          arms.push('Left arm')
        }
        arms.push()
      }

      for (let i = 0; i < datas.length; i++) {
        tableData.push([datas[i].toString(), p_s[i].toString(), p_d[i].toString(), bpms[i].toString(), arms[i]]);
      }

      
      for (let row = 0; row < tableData.length; row++) {
        for (let col = 0; col < numCols; col++) {

          let fillColor = rgb(1, 1, 1); 
          if (row > 0 && col == 1 && parseInt(tableData[row][col], 10) > 140) {
            fillColor = rgb(255 / 255, 121 / 255, 0); 
          }

          if (row > 0 && col == 1 && parseInt(tableData[row][col], 10) == 140) {
            fillColor = rgb(255 / 255, 170 / 255, 102 / 255);
          }

          if (row > 0 && col == 2 && parseInt(tableData[row][col], 10) > 90) {
            fillColor = rgb(255 / 255, 121 / 255, 0); 
          }

          if (row > 0 && col == 2 && parseInt(tableData[row][col], 10) == 90) {
            fillColor = rgb(255 / 255, 170 / 255, 102 / 255);
          }

          if (row > 0 && col == 3 && parseInt(tableData[row][col], 10) > 100) {
            fillColor = rgb(255 / 255, 121 / 255, 0); 
          }

          if (row > 0 && col == 3 && parseInt(tableData[row][col], 10) == 100) {
            fillColor = rgb(255 / 255, 170 / 255, 102 / 255);
          }


          const tit_2 = "Dados"
          const tit_2Width = font.widthOfTextAtSize(tit_2, fontSize);
          const xPosition2 = (width - tit_2Width) / 2;
          secondpage.drawText(tit_2, {
            x: xPosition2,
            y: height - 50,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });

          
          secondpage.drawRectangle({
            x: tableLeft + col * cellWidth,
            y: tableTop - row * cellHeight,
            width: cellWidth,
            height: cellHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
            color: fillColor,
          });

          
          secondpage.drawText(tableData[row][col], {
            x: tableLeft + col * cellWidth + 5,
            y: tableTop - row * cellHeight + 5,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
          });

          secondpage.drawRectangle({
            x: margin,
            y: margin,
            width: width - 2 * margin,
            height: height - 2 * margin,
            borderColor: rgb(255 / 255, 121 / 255, 0), 
            borderWidth,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} onStartShouldSetResponder={true}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
      <View style={{ flexDirection: 'row'}}>
        <Text style={{ fontWeight: 'bold', fontSize: 18}}>Select Period:</Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={{ width: '80%',}}
          itemStyle={{ fontSize: 18 }}
        >
          <Picker.Item label="All data" value="all" />
          <Picker.Item label="Last 7 days" value="7" />
          <Picker.Item label="Last 15 days" value="15" />
          <Picker.Item label="Last 30 days" value="30" />
        </Picker>
      </View>
      
      
      <Pressable 
        onPress={generatePDF} 
        style={pdfButton}>
        <Text style={buttonText}>Generate PDF</Text>
      </Pressable>
      </View>
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
          ref={chartRef1}
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
          ref={chartRef2}
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
          ref={chartRef3}
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

const pdfButton = {
  backgroundColor: '#f97000',
  padding: 8,
  borderRadius: 5,
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginTop: 8,
  marginBottom: 8,

};

export default YourComponent;
