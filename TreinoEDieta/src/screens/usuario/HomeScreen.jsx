import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Avatar, Card, IconButton, MD2Colors, Text } from 'react-native-paper'
import axios from 'axios'

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users?delay=2000')
      .then((resposta) => setUsuarios(resposta.data.users))
      .catch(() => alert('Erro ao comunicar com a API!!!'))
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <Card.Title
              title={item.firstName + ' ' + item.lastName}
              subtitle={item.email}
              left={(props) => <Avatar.Image {...props} source={{ uri: item.image }} />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  size={30}
                  onPress={() => navigation.navigate('UsuarioScreen', item.id)}
                />
              )}
            />
          </Card>
        )}
        ListEmptyComponent={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={80} />
            <Text variant="titleLarge">Aguarde...</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50
  },
  loadingContainer: {
    height: 750,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
