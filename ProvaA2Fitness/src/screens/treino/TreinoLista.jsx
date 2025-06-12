import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import TreinoService from '../../services/TreinoService';

export default function TreinoLista({ navigation }) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  async function buscar() {
    const dados = await TreinoService.listar();
    setLista(dados);
  }

  async function excluir(id) {
    await TreinoService.remover(id);
    buscar();
    alert('Treino excluído!');
  }

  return (
    <View>
      <Button style={{ margin: 10 }} mode='contained' icon='plus' onPress={() => navigation.navigate('TreinoForm')}>
        Novo Treino
      </Button>

      <FlatList
        data={lista}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Duração: {item.duracao} min</Text>
              <Text>Data: {item.data}</Text>
            </Card.Content>
            <Card.Actions>
              <Button icon="pencil" onPress={() => navigation.navigate('TreinoForm', item)} />
              <Button icon="delete" onPress={() => excluir(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
