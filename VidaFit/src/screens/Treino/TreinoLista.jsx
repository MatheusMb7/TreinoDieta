import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

import TreinoService from '../../services/TreinoService';

export default function TreinoLista({ navigation }) {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarTreinos);
    return unsubscribe;
  }, [navigation]);

  function carregarTreinos() {
    TreinoService.listar().then(setTreinos);
  }

  function excluir(id) {
    Alert.alert('Confirmação', 'Deseja realmente excluir este treino?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: () => {
          TreinoService.remover(id).then(carregarTreinos);
        },
        style: 'destructive'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('FormTreino')} style={styles.botao}>
        Novo Treino
      </Button>
      <FlatList
        data={treinos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.nome}
              subtitle={`Duração: ${item.duracao} min`}
              right={props => (
                <>
                  <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('FormTreino', item)} />
                  <IconButton {...props} icon="delete" onPress={() => excluir(item.id)} />
                </>
              )}
            />
            <Card.Content>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Dificuldade: {item.dificuldade}</Text>
              <Text>Categoria: {item.categoria}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum treino cadastrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  botao: { marginBottom: 10 },
  card: { marginBottom: 10 }
});
