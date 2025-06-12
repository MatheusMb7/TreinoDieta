import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'

export default function ImcForm() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcularIMC() {
    const pesoNum = parseFloat(peso.replace(',', '.'))
    const alturaNum = parseFloat(altura.replace(',', '.'))

    if (!pesoNum || !alturaNum) {
      setErro('Preencha peso e altura corretamente')
      setResultado(null)
      return
    }
    if (pesoNum <= 0 || alturaNum <= 0) {
      setErro('Peso e altura devem ser maiores que zero')
      setResultado(null)
      return
    }

    setErro('')

    const imc = pesoNum / (alturaNum * alturaNum)
    setResultado(imc.toFixed(2))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text variant="titleLarge" style={{ marginBottom: 10 }}>Calculadora de IMC</Text>

      <TextInput
        label="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Ex: 70.5"
      />

      <TextInput
        label="Altura (m)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Ex: 1.75"
      />

      {!!erro && <Text style={styles.erro}>{erro}</Text>}

      <Button mode="contained" onPress={calcularIMC} style={styles.botao}>
        Calcular
      </Button>

      {resultado && (
        <Text variant="headlineMedium" style={styles.resultado}>
          Seu IMC é: {resultado}
        </Text>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  input: {
    marginBottom: 15,
  },
  botao: {
    marginTop: 10,
  },
  resultado: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
})
