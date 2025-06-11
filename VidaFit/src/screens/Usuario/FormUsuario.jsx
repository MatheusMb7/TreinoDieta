import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { salvarUsuario } from '../../services/UsuarioService';

export default function FormUsuario({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !objetivo || !idade) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const novoUsuario = {
      id: Date.now(),  // simula um ID único
      firstName,
      lastName,
      email,
      objetivo,
      age: idade
    };

    await salvarUsuario(novoUsuario);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Nome"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Objetivo"
        value={objetivo}
        onChangeText={setObjetivo}
        style={styles.input}
      />
      <TextInput
        label="Idade"
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleSubmit}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});
