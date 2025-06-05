import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Card, Divider, Text } from 'react-native-paper';
import axios from 'axios';

export default function UsuarioScreen({ route }) {
  const idUsuario = route.params;
  const [usuario, setUsuario] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${idUsuario}`)
      .then(res => setUsuario(res.data))
      .catch(() => alert('Erro ao buscar usuário'));

    axios.get(`https://dummyjson.com/users/${idUsuario}/posts`)
      .then(res => setPosts(res.data.posts))
      .catch(() => alert('Erro ao buscar posts'));
  }, [idUsuario]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Card>
        <Card.Title
          title={`${usuario.firstName} ${usuario.lastName}`}
          subtitle={usuario.email}
          left={props => <Avatar.Image {...props} source={{ uri: usuario.image }} />}
        />
        <Card.Content>
          <Text variant="titleMedium">Dados do Usuário:</Text>
          <Text>Username: {usuario.username}</Text>
          <Text>Idade: {usuario.age}</Text>
          <Text>Gênero: {usuario.gender}</Text>
          <Text>Telefone: {usuario.phone}</Text>
          <Text>Data de Nascimento: {usuario.birthDate}</Text>
          <Text>Universidade: {usuario.university}</Text>

          <Divider style={{ marginVertical: 10 }} />
          <Text variant="titleMedium">Imagem do Usuário:</Text>
          <Card.Cover source={{ uri: usuario.image }} />

          <Divider style={{ marginVertical: 10 }} />
          <Text variant="titleMedium">Posts:</Text>
          {posts.map(post => (
            <View key={post.id} style={{ marginBottom: 10 }}>
              <Text variant="titleSmall">{post.title}</Text>
              <Text>{post.body}</Text>
              <Divider />
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
