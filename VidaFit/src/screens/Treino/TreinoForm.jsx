import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import TreinoService from '../../services/TreinoService';

export default function TreinoForm({ navigation, route }) {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (route.params) {
      const treino = route.params;
      setId(treino.id);
      setNome(treino.nome);
      setDescricao(treino.descricao);
      setDuracao(treino.duracao.toString());
      setDificuldade(treino.dificuldade);
      setCategoria(treino.categoria);
    }
  }, [route.params]);

  function salvar() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O campo nome é obrigatório');
      return;
    }
    if (!duracao.trim() || isNaN(duracao)) {
      Alert.alert('Erro', 'Informe uma duração válida');
      return;
    }

    const treino = { id, nome, descricao, duracao: Number(duracao), dificuldade, categoria };

    if (id) {
      TreinoService.atualizar(treino).then(() => {
        Alert.alert('Sucesso', 'Treino atualizado');
        navigation.goBack();
      });
    } else {
      TreinoService.inserir(treino).then(() => {
        Alert.alert('Sucesso', 'Treino cadastrado');
        navigation.goBack();
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} multiline />
      <TextInput label="Duração (min)" value={duracao} onChangeText={setDuracao} keyboardType="numeric" style={styles.input} />
      <TextInput label="Dificuldade" value={dificuldade} onChangeText={setDificuldade} style={styles.input} />
      <TextInput label="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />

      <Button mode="contained" onPress={salvar} style={styles.botao}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { marginBottom: 10 },
  botao: { marginTop: 10 }
});
