import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Menu, HelperText } from 'react-native-paper';

import RefeicaoService from '../../services/RefeicaoService';

export default function RefeicaoForm({ navigation, route }) {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [calorias, setCalorias] = useState('');
  const [tipo, setTipo] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estados para o menu de tipos
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Estados para validação
  const [errors, setErrors] = useState({});

  const tiposRefeicao = [
    'Café da manhã',
    'Lanche da manhã', 
    'Almoço',
    'Lanche da tarde',
    'Jantar',
    'Ceia'
  ];

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

  function validarFormulario() {
    const newErrors = {};

    // Validar nome
    if (!nome.trim()) {
      newErrors.nome = 'O nome é obrigatório';
    } else if (nome.trim().length < 2) {
      newErrors.nome = 'O nome deve ter pelo menos 2 caracteres';
    }

    // Validar calorias
    if (!calorias.trim()) {
      newErrors.calorias = 'As calorias são obrigatórias';
    } else if (isNaN(calorias) || Number(calorias) <= 0) {
      newErrors.calorias = 'Informe um valor válido de calorias';
    } else if (Number(calorias) > 5000) {
      newErrors.calorias = 'Valor de calorias muito alto';
    }

    // Validar tipo
    if (!tipo.trim()) {
      newErrors.tipo = 'O tipo da refeição é obrigatório';
    }

    // Validar horário (formato HH:MM)
    if (!horario.trim()) {
      newErrors.horario = 'O horário é obrigatório';
    } else {
      const horarioRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!horarioRegex.test(horario)) {
        newErrors.horario = 'Formato de horário inválido (use HH:MM)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function formatarHorario(text) {
    // Remove caracteres não numéricos
    const numbers = text.replace(/\D/g, '');
    
    // Aplica máscara HH:MM
    if (numbers.length >= 3) {
      return `${numbers.substring(0, 2)}:${numbers.substring(2, 4)}`;
    }
    return numbers;
  }

  function handleHorarioChange(text) {
    const formatted = formatarHorario(text);
    setHorario(formatted);
    
    // Remove erro do horário ao digitar
    if (errors.horario) {
      setErrors(prev => ({ ...prev, horario: null }));
    }
  }

  async function salvar() {
    if (!validarFormulario()) {
      Alert.alert('Erro de Validação', 'Por favor, corrija os campos marcados');
      return;
    }

    setLoading(true);
    
    const refeicao = { 
      id, 
      nome: nome.trim(), 
      descricao: descricao.trim(), 
      calorias: Number(calorias), 
      tipo, 
      horario 
    };

    try {
      if (id) {
        await RefeicaoService.atualizar(refeicao);
        Alert.alert('Sucesso', 'Refeição atualizada com sucesso!');
      } else {
        await RefeicaoService.inserir(refeicao);
        Alert.alert('Sucesso', 'Refeição cadastrada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar refeição. Tente novamente.');
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Nome da Refeição"
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          if (errors.nome) setErrors(prev => ({ ...prev, nome: null }));
        }}
        style={styles.input}
        error={!!errors.nome}
      />
      <HelperText type="error" visible={!!errors.nome}>
        {errors.nome}
      </HelperText>

      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <TextInput
        label="Calorias (kcal)"
        value={calorias}
        onChangeText={(text) => {
          setCalorias(text);
          if (errors.calorias) setErrors(prev => ({ ...prev, calorias: null }));
        }}
        keyboardType="numeric"
        style={styles.input}
        error={!!errors.calorias}
      />
      <HelperText type="error" visible={!!errors.calorias}>
        {errors.calorias}
      </HelperText>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TextInput
            label="Tipo de Refeição"
            value={tipo}
            onFocus={() => setMenuVisible(true)}
            style={styles.input}
            right={<TextInput.Icon icon="chevron-down" />}
            editable={false}
            error={!!errors.tipo}
          />
        }
      >
        {tiposRefeicao.map((tipoItem) => (
          <Menu.Item
            key={tipoItem}
            onPress={() => {
              setTipo(tipoItem);
              setMenuVisible(false);
              if (errors.tipo) setErrors(prev => ({ ...prev, tipo: null }));
            }}
            title={tipoItem}
          />
        ))}
      </Menu>
      <HelperText type="error" visible={!!errors.tipo}>
        {errors.tipo}
      </HelperText>

      <TextInput
        label="Horário (HH:MM)"
        value={horario}
        onChangeText={handleHorarioChange}
        style={styles.input}
        keyboardType="numeric"
        maxLength={5}
        error={!!errors.horario}
        placeholder="ex: 08:30"
      />
      <HelperText type="error" visible={!!errors.horario}>
        {errors.horario}
      </HelperText>

      <Button 
        mode="contained" 
        onPress={salvar} 
        style={styles.botao}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { marginBottom: 10 },
  botao: { marginTop: 10 }
});
