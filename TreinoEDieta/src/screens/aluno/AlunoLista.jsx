import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import AlunoService from '../../services/AlunoService'

export default function AlunoLista({ navigation }) {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    buscarAlunos()
  }, [])

  async function buscarAlunos() {
    const listaAlunos = await AlunoService.listar()
    setAlunos(listaAlunos)
  }

  async function excluirAluno(id) {
    await AlunoService.remover(id)
    buscarAlunos()
    alert('Aluno excluído com sucesso')
  }

  return (
    <View>
      <Button style={{ margin: 10 }} mode="contained" icon="plus" onPress={() => navigation.navigate('AlunoForm')}>
        Cadastrar
      </Button>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>CPF: {item.cpf}</Text>
            </Card.Content>
            <Card.Actions>
              <Button icon="pencil" onPress={() => navigation.navigate('AlunoForm', item)} />
              <Button icon="delete" onPress={() => excluirAluno(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
}
