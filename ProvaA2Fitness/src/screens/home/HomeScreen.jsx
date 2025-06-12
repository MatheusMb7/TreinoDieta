import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, ActivityIndicator } from 'react-native-paper'
import axios from 'axios'

const objetivos = [
  'Perder peso',
  'Ganhar massa muscular',
  'Melhorar resistência',
  'Manter forma',
  'Aumentar flexibilidade'
]

const frasesMotivacionais = [
  'O esforço de hoje é a vitória de amanhã.',
  'Você é mais forte do que pensa.',
  'Não desista, o começo é sempre difícil.',
  'Sua saúde é seu maior patrimônio.',
  'Cada treino é um passo a mais.'
]

function getObjetivo(index) {
  return objetivos[index % objetivos.length]
}

function getFrase(index) {
  return frasesMotivacionais[index % frasesMotivacionais.length]
}

export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedIds, setExpandedIds] = useState([]) // controla quais cards estão abertos

  useEffect(() => {
    buscarUsuarios()
  }, [])

  async function buscarUsuarios() {
    setLoading(true)
    try {
      const response = await axios.get('https://dummyjson.com/users?limit=10')
      const dadosOriginais = response.data.users || []

      const dadosFitness = dadosOriginais.map((user, idx) => ({
        id: user.id,
        nome: `${user.firstName} ${user.lastName}`,
        email: user.email,
        telefone: user.phone,
        peso: user.weight || (60 + idx * 5),
        altura: user.height || (160 + idx * 3),
        idade: user.age,
        objetivo: getObjetivo(idx),
        frase: getFrase(idx),
        nivelFitness: user.age < 30 ? 'Iniciante' : user.age < 50 ? 'Intermediário' : 'Avançado'
      }))

      setUsuarios(dadosFitness)
    } catch (error) {
      console.error(error)
      alert('Erro ao carregar dados fitness.')
    } finally {
      setLoading(false)
    }
  }

  function toggleExpand(id) {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id))
    } else {
      setExpandedIds([...expandedIds, id])
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Mundo Fitness - Usuários</Text>

      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const expanded = expandedIds.includes(item.id)
            return (
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <Card style={styles.card} mode="outlined">
                  <Card.Content>
                    <Text style={styles.nome}>{item.nome}</Text>
                    {expanded && (
                      <>
                        <Text>Email: {item.email}</Text>
                        <Text>Telefone: {item.telefone}</Text>
                        <Text>Peso: {item.peso} kg</Text>
                        <Text>Altura: {item.altura} cm</Text>
                        <Text>Idade: {item.idade} anos</Text>
                        <Text>Objetivo: {item.objetivo}</Text>
                        <Text>Nível Fitness: {item.nivelFitness}</Text>
                        <Text style={styles.frase}>"{item.frase}"</Text>
                      </>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    marginBottom: 10,
    textAlign: 'center'
  },
  card: {
    marginBottom: 10
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4
  },
  frase: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555'
  }
})
