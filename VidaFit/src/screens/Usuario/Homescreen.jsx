<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 06b31ae (alterações)
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
<<<<<<< HEAD

import { listarUsuarios } from '../../services/UsuarioService';
=======
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, IconButton, MD3Colors, Text } from 'react-native-paper';
import axios from 'axios';
>>>>>>> bc0d165 (mudança no dummyjson)
=======
>>>>>>> 06b31ae (alterações)

import { listarUsuarios } from '../../services/UsuarioService';

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 06b31ae (alterações)
    async function carregarUsuarios() {
      const data = await listarUsuarios();
      setUsuarios(data);
    }
    carregarUsuarios();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetalhesUsuario', item)}
    >
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
<<<<<<< HEAD

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
=======
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
>>>>>>> bc0d165 (mudança no dummyjson)
=======

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
>>>>>>> 06b31ae (alterações)
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 06b31ae (alterações)
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
<<<<<<< HEAD
=======
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 5 },
>>>>>>> bc0d165 (mudança no dummyjson)
=======
>>>>>>> 06b31ae (alterações)
});
