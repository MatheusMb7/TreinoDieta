import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Card, Divider, Text } from 'react-native-paper'
import axios from 'axios'

export default function UsuarioScreen({ route }) {
  const idUsuario = route.params
  const [usuario, setUsuario] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users/' + idUsuario)
      .then((resposta) => setUsuario(resposta.data))
      .catch(() => alert('Ocorreu um erro ao buscar usuário'))

    axios
      .get('https://dummyjson.com/users/' + idUsuario + '/posts')
      .then((resposta) => setPosts(resposta.data.posts))
      .catch(() => alert('Ocorreu um erro ao buscar posts'))
  }, [idUsuario])

  return (
    <View>
      <Card>
        <Card.Title
          title={usuario.firstName + ' ' + usuario.lastName}
          subtitle={usuario.email}
          left={(props) => <Avatar.Image {...props} source={{ uri: usuario.image }} />}
        />
        <Card.Content>
          <Text variant="titleMedium">Dados do Usuário:</Text>
          <Text>Username: {usuario.username}</Text>
          <Text>Idade: {usuario.age}</Text>
          <Text>Gênero: {usuario.gender}</Text>
          <Text>Telefone: {usuario.phone}</Text>
          <Text>Data de Nascimento: {usuario.birthDate}</Text>
          <Text>Universidade: {usuario.university}</Text>

          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            Imagem do Usuário:
          </Text>
          <Card.Cover source={{ uri: usuario.image }} />

          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            Posts:
          </Text>
          {posts.map((post) => (
            <Card key={post.id} style={{ marginVertical: 5 }}>
              <Card.Title title={post.title} subtitle={post.body} />
            </Card>
          ))}
        </Card.Content>
      </Card>
    </View>
  )
}
