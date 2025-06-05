import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Avatar, Card, IconButton, MD3Colors, Text } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=10')
      .then(res => setUsuarios(res.data.users))
      .catch(() => alert('Erro ao comunicar com a API!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} color={MD3Colors.primary50} size={80} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} onPress={() => navigation.navigate('DetalhesUsuario', item.id)}>
              <Card.Title
                title={`${item.firstName} ${item.lastName}`}
                subtitle={item.email}
                left={props => <Avatar.Image {...props} source={{ uri: item.image }} />}
                right={props => <IconButton {...props} icon="chevron-right" />}
              />
            </Card>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum usuário encontrado</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { margin: 5 },
});
