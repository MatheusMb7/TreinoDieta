import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

import RefeicaoService from '../../services/RefeicaoService';

export default function RefeicaoLista({ navigation }) {
  const [refeicoes, setRefeicoes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarRefeicoes);
    return unsubscribe;
  }, [navigation]);

  function carregarRefeicoes() {
    RefeicaoService.listar().then(setRefeicoes);
  }

  function excluir(id) {
    Alert.alert('Confirmação', 'Deseja realmente excluir esta refeição?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: () => {
          RefeicaoService.remover(id).then(carregarRefeicoes);
        },
        style: 'destructive'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('FormRefeicao')} style={styles.botao}>
        Nova Refeição
      </Button>
      <FlatList
        data={refeicoes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.nome}
              subtitle={`Calorias: ${item.calorias} kcal`}
              right={props => (
                <>
                  <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('FormRefeicao', item)} />
                  <IconButton {...props} icon="delete" onPress={() => excluir(item.id)} />
                </>
              )}
            />
            <Card.Content>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Horário: {item.horario}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma refeição cadastrada</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  botao: { marginBottom: 10 },
  card: { marginBottom: 10 }
});
