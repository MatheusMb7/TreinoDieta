import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Text, Title, Button } from 'react-native-paper';
import { buscarRefeicoesAleatorias } from '../../services/RefeicaoService';

export default function RefeicaoListaScreen() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarRefeicoes() {
    setCarregando(true);
    const dados = await buscarRefeicoesAleatorias(5);
    setRefeicoes(dados);
    setCarregando(false);
  }

  useEffect(() => {
    carregarRefeicoes();
  }, []);

  if (carregando) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.titulo}>🍽️ Refeições Sugeridas</Title>
      <Button mode="contained" onPress={carregarRefeicoes} style={styles.botao}>
        Buscar Novas
      </Button>

      {refeicoes.map(ref => (
        <Card key={ref.id} style={styles.card}>
          <Card.Title title={ref.nome} subtitle={`${ref.categoria} - ${ref.origem}`} />
          <Card.Content>
            <Image source={{ uri: ref.imagem }} style={styles.imagem} />
            <Text numberOfLines={4}>{ref.instrucoes}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: 'center' },
  titulo: { fontSize: 22, marginBottom: 10 },
  botao: { marginBottom: 20 },
  card: { marginBottom: 16 },
  imagem: { height: 180, borderRadius: 8, marginVertical: 10 },
});
