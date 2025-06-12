import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { listarUsuarios } from '../../services/UsuarioService';

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function carregarUsuarios() {
      const data = await listarUsuarios();
      setUsuarios(data);
    }
    carregarUsuarios();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetalhesUsuario', item)}>
      <Card style={styles.card}>
        <Card.Title
          title={`${item.firstName} ${item.lastName}`}
          subtitle={`Objetivo: ${item.objetivo}`}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{ uri: item.image || 'https://via.placeholder.com/100' }}
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('FormUsuario')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
