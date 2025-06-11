import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

export default function UsuarioScreen({ route }) {
  const user = route?.params || {};

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={`${user.firstName || 'Usuário'} ${user.lastName || ''}`}
          subtitle={`Objetivo: ${user.objetivo || 'Não informado'}`}
          left={props => (
            user.image ? (
              <Avatar.Image
                {...props}
                source={{ uri: user.image }}
              />
            ) : (
              <Avatar.Icon {...props} icon="account" />
            )
          )}
        />
        <Card.Content>
          <Text>Email: {user.email || 'Não informado'}</Text>
          <Text>Idade: {user.age ? `${user.age} anos` : 'Não informado'}</Text>
          <Text>Peso: {user.weight || '75kg'}</Text>
          <Text>Altura: {user.height || '1.75m'}</Text>
          <Text>Experiência: {user.company?.title || 'Intermediário'}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});
