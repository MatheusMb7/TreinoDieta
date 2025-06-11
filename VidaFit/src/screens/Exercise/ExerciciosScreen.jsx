import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Card, Text, Button, Chip, ActivityIndicator, Searchbar } from 'react-native-paper';

import ExerciseAPIService from '../../services/ExerciseAPIService';

export default function ExerciciosScreen() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('peito');

  // lista de músculos em português (deve corresponder aos valores usados na API traduzidos)
  const muscles = ['peito', 'costas', 'ombros', 'bíceps', 'tríceps', 'quadríceps', 'isquiotibiais', 'abdominais'];

  useEffect(() => {
    carregarExercicios();
  }, [selectedMuscle]);

  async function carregarExercicios() {
    setLoading(true);
    try {
      const data = await ExerciseAPIService.buscarPorMusculo(selectedMuscle);
      setExercises(data);
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error);
    } finally {
      setLoading(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await carregarExercicios();
    setRefreshing(false);
  }

  const exercisesFiltrados = exercises.filter(exercise =>
    exercise.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExercise = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.nome}
        subtitle={`${item.tipo} • ${item.dificuldade}`}
      />
      <Card.Content>
        <View style={styles.chipsContainer}>
          <Chip icon="dumbbell" style={styles.chip}>
            {item.musculo}
          </Chip>
          <Chip icon="tools" style={styles.chip}>
            {item.equipamento}
          </Chip>
        </View>
        <Text style={styles.instructions} numberOfLines={3}>
          {item.instrucoes}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={() => addToWorkout(item)}>
          Adicionar ao Treino
        </Button>
      </Card.Actions>
    </Card>
  );

  function addToWorkout(exercise) {
    alert(`${exercise.nome} adicionado aos favoritos!`);
  }

  if (loading && exercises.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando exercícios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar exercícios..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.muscleContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={muscles}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Chip
              mode={selectedMuscle === item ? 'flat' : 'outlined'}
              onPress={() => setSelectedMuscle(item)}
              style={styles.muscleChip}
            >
              {item}
            </Chip>
          )}
        />
      </View>

      <FlatList
        data={exercisesFiltrados}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        renderItem={renderExercise}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum exercício encontrado
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchbar: { marginBottom: 10 },
  muscleContainer: { marginBottom: 10 },
  muscleChip: { marginRight: 8 },
  card: { marginBottom: 10 },
  chipsContainer: { flexDirection: 'row', marginVertical: 5 },
  chip: { marginRight: 10 },
  instructions: { marginTop: 5, color: '#555' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 }
});
