import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import ProgressoService from '../../services/ProgressoService'

export default function ProgressoLista({ navigation }) {

  const [progressoList, setProgressoList] = useState([])

  useEffect(() => {
    buscarProgresso()
  }, [])

  async function buscarProgresso() {
    const lista = await ProgressoService.listar()
    setProgressoList(lista)
  }

  async function excluirProgresso(id) {
    await ProgressoService.remover(id)
    buscarProgresso()
    alert('Registro excluído com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Button
        style={{ margin: 10 }}
        mode='contained'
        icon='plus'
        onPress={() => navigation.navigate('ProgressoForm')}
      >
        Novo Registro
      </Button>

      <FlatList
        data={progressoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>ID: {item.id}</Text>
              <Text>Peso: {item.peso} kg</Text>
              <Text>Altura: {item.altura} cm</Text>
              <Text>Gordura: {item.gordura} %</Text>
              <Text>Data: {item.data}</Text>
              <Text>Obs: {item.obs || '-'}</Text>
            </Card.Content>
            <Card.Actions>
              <Button icon='pencil' onPress={() => navigation.navigate('ProgressoForm', item)} />
              <Button icon='delete' onPress={() => excluirProgresso(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    margin: 10
  }
})
