import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Text, ActivityIndicator, Searchbar } from 'react-native-paper';
import { buscarAlimentosFitness } from '../../services/NutritionixService';

export default function NutritionScreen() {
  const [alimentos, setAlimentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState('frango');

  useEffect(() => {
    carregarAlimentos(busca);
  }, []);

  const carregarAlimentos = async (termo) => {
    setCarregando(true);
    const resultado = await buscarAlimentosFitness(termo);
    setAlimentos(resultado);
    setCarregando(false);
  };

  const onSubmitSearch = () => {
    if (busca.trim()) {
      carregarAlimentos(busca);
    }
  };

  if (carregando) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating size="large" />
        <Text>Carregando alimentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar alimento fitness..."
        value={busca}
        onChangeText={setBusca}
        onSubmitEditing={onSubmitSearch}
        onIconPress={onSubmitSearch}
        style={styles.searchbar}
      />

      <FlatList
        data={alimentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.nome} />
            <Card.Content>
              <Text>Porção: {item.porcao}</Text>
              <Text>Calorias: {item.calorias}</Text>
              <Text>Proteínas: {item.proteinas}</Text>
              <Text>Carboidratos: {item.carboidratos}</Text>
              <Text>Gorduras: {item.gorduras}</Text>
            </Card.Content>
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                style={styles.imagem}
              />
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchbar: { marginBottom: 10 },
  card: { marginBottom: 10 },
  imagem: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});
