import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import RefeicaoService from '../../services/RefeicaoService';

export default function RefeicaoForm({ navigation, route }) {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [calorias, setCalorias] = useState('');
  const [tipo, setTipo] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    if (route.params) {
      const refeicao = route.params;
      setId(refeicao.id);
      setNome(refeicao.nome);
      setDescricao(refeicao.descricao);
      setCalorias(refeicao.calorias.toString());
      setTipo(refeicao.tipo);
      setHorario(refeicao.horario);
    }
  }, [route.params]);

  function salvar() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O campo nome é obrigatório');
      return;
    }
    if (!calorias.trim() || isNaN(calorias)) {
      Alert.alert('Erro', 'Informe uma quantidade válida de calorias');
      return;
    }

    const refeicao = { id, nome, descricao, calorias: Number(calorias), tipo, horario };

    if (id) {
      RefeicaoService.atualizar(refeicao).then(() => {
        Alert.alert('Sucesso', 'Refeição atualizada');
        navigation.goBack();
      });
    } else {
      RefeicaoService.inserir(refeicao).then(() => {
        Alert.alert('Sucesso', 'Refeição cadastrada');
        navigation.goBack();
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} multiline />
      <TextInput label="Calorias" value={calorias} onChangeText={setCalorias} keyboardType="numeric" style={styles.input} />
      <TextInput label="Tipo" value={tipo} onChangeText={setTipo} style={styles.input} />
      <TextInput label="Horário" value={horario} onChangeText={setHorario} style={styles.input} />

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
