// src/screens/Imc/ImcScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText, Card } from 'react-native-paper';

export default function ImcScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState({});

  const calcularImc = () => {
    const newErro = {};
    if (!peso || isNaN(peso) || Number(peso) <= 0) newErro.peso = 'Peso inválido';
    if (!altura || isNaN(altura) || Number(altura) <= 0) newErro.altura = 'Altura inválida';
    setErro(newErro);
    if (Object.keys(newErro).length) {
      Alert.alert('Erro', 'Corrija os campos destacados.');
      return;
    }

    const imc = Number(peso) / (Number(altura) ** 2);
    let faixa = '';
    if (imc < 18.5) faixa = 'Magreza';
    else if (imc < 24.9) faixa = 'Normal';
    else if (imc < 29.9) faixa = 'Sobrepeso';
    else faixa = 'Obesidade';
    setResultado({ imc: imc.toFixed(1), faixa });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Calculadora de IMC" />
        <Card.Content>
          <TextInput
            label="Peso (kg)"
            value={peso}
            onChangeText={text => { setPeso(text); if (erro.peso) setErro(prev => ({ ...prev, peso: null })); }}
            keyboardType="numeric"
            error={!!erro.peso}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erro.peso}>{erro.peso}</HelperText>

          <TextInput
            label="Altura (m)"
            value={altura}
            onChangeText={text => { setAltura(text); if (erro.altura) setErro(prev => ({ ...prev, altura: null })); }}
            keyboardType="numeric"
            error={!!erro.altura}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erro.altura}>{erro.altura}</HelperText>

          <Button mode="contained" onPress={calcularImc} style={styles.button}>
            Calcular IMC
          </Button>
          
          {resultado && (
            <View style={styles.result}>
              <Text style={styles.textResult}>IMC: {resultado.imc}</Text>
              <Text style={styles.textResult}>Faixa: {resultado.faixa}</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  card: { padding: 10 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  result: { marginTop: 20, alignItems: 'center' },
  textResult: { fontSize: 18 }
});
