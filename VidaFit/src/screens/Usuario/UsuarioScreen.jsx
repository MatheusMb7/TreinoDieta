import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Avatar, Card, Text, ActivityIndicator, Title, Divider } from 'react-native-paper';

import { buscarRefeicoesAleatorias } from '../../services/RefeicaoService';
import TreinoService from '../../services/TreinoService';

export default function UsuarioScreen({ route }) {
  const user = route?.params || {};
  const [refeicoes, setRefeicoes] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosRefeicoes = await buscarRefeicoesAleatorias(3);
        const dadosTreinos = await TreinoService.listar();
        setRefeicoes(dadosRefeicoes);
        setTreinos(dadosTreinos);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={`${user.firstName || 'Usuário'} ${user.lastName || ''}`}
          subtitle={`Objetivo: ${user.objetivo || 'Não informado'}`}
          left={(props) =>
            user.image ? (
              <Avatar.Image {...props} source={{ uri: user.image }} />
            ) : (
              <Avatar.Icon {...props} icon="account" />
            )
          }
        />
        <Card.Content>
          <Text>Email: {user.email || 'Não informado'}</Text>
          <Text>Idade: {user.age || 'Não informado'} anos</Text>
          <Text>Peso: {user.weight || 'Não informado'}</Text>
          <Text>Altura: {user.height || 'Não informado'}</Text>
          <Text>Experiência: {user.experiencia || 'Intermediário'}</Text>
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>🍽️ Refeições Sugeridas</Title>
      {refeicoes.map((refeicao) => (
        <Card key={refeicao.id} style={styles.itemCard}>
          <Card.Title title={refeicao.nome} subtitle={`${refeicao.categoria} - ${refeicao.origem}`} />
          <Card.Content>
            <Image source={{ uri: refeicao.imagem }} style={styles.refeicaoImg} />
            <Text numberOfLines={3}>{refeicao.instrucoes}</Text>
          </Card.Content>
        </Card>
      ))}

      <Divider style={{ marginVertical: 16 }} />

      <Title style={styles.sectionTitle}>🏋️ Meus Treinos</Title>
      {treinos.length === 0 && <Text>Você ainda não cadastrou treinos.</Text>}
      {treinos.map((treino) => (
        <Card key={treino.id} style={styles.itemCard}>
          <Card.Title title={treino.nome} subtitle={`Duração: ${treino.duracao}`} />
          <Card.Content>
            <Text>{treino.descricao}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 20,
  },
  itemCard: {
    marginBottom: 15,
  },
  refeicaoImg: {
    height: 150,
    width: '100%',
    borderRadius: 8,
    marginVertical: 10,
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});
