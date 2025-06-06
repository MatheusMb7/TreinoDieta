import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, IconButton, MD3Colors, Text } from 'react-native-paper';
import axios from 'axios';

const objetivos = ['Hipertrofia', 'Emagrecimento', 'Condicionamento', 'Resistência', 'Bem-estar'];

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=10')
      .then(res => {
        const adaptados = res.data.users.map(user => ({
          ...user,
          objetivo: objetivos[Math.floor(Math.random() * objetivos.length)]
        }));
        setUsuarios(adaptados);
      })
      .catch(() => alert('Erro ao comunicar com a API!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={MD3Colors.primary50} size={80} />
          <Text variant='titleLarge'>Carregando atletas...</Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} onPress={() => navigation.navigate('DetalhesUsuario', item)}>
              <Card.Title
                title={`${item.firstName} ${item.lastName}`}
                subtitle={`Objetivo: ${item.objetivo}`}
                left={props => <Avatar.Image {...props} source={{ uri: item.image }} />}
                right={props => <IconButton {...props} icon="chevron-right" />}
              />
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 5 },
});
