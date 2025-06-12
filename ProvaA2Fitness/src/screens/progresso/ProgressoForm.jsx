import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import ProgressoService from '../../services/ProgressoService'

export default function ProgressoForm({ navigation, route }) {

  const progressoAntigo = route.params || {}

  const [peso, setPeso] = useState(progressoAntigo.peso || '')
  const [altura, setAltura] = useState(progressoAntigo.altura || '')
  const [gordura, setGordura] = useState(progressoAntigo.gordura || '')
  const [data, setData] = useState(progressoAntigo.data || '')
  const [obs, setObs] = useState(progressoAntigo.obs || '')

  async function salvar() {
    const progresso = { peso, altura, gordura, data, obs }

    if (!peso || !altura || !gordura || !data) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    if (progressoAntigo.id) {
      progresso.id = progressoAntigo.id
      await ProgressoService.atualizar(progresso)
      alert('Progresso atualizado!')
    } else {
      await ProgressoService.salvar(progresso)
      alert('Progresso registrado!')
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'ProgressoLista' }]
    })
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={{ marginTop: 10 }}>Registro de Progresso</Text>
      <Text variant='titleMedium'>ID: {progressoAntigo.id || 'NOVO'}</Text>
      <Button
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        mode='outlined'
        icon='calculator'
        onPress={() => navigation.navigate('IMCScreen')}
      >
        Calcular IMC
      </Button>

      <TextInput
        label='Peso (kg)'
        style={styles.input}
        mode='outlined'
        keyboardType='numeric'
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        label='Altura (cm)'
        style={styles.input}
        mode='outlined'
        keyboardType='numeric'
        value={altura}
        onChangeText={setAltura}
      />

      <TextInput
        label='Gordura Corporal (%)'
        style={styles.input}
        mode='outlined'
        keyboardType='numeric'
        value={gordura}
        onChangeText={setGordura}
      />

      <TextInput
        label='Data da Avaliação'
        style={styles.input}
        mode='outlined'
        value={data}
        onChangeText={setData}
        keyboardType='numeric'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
          />
        )}
      />

      <TextInput
        label='Observações'
        style={styles.input}
        mode='outlined'
        multiline
        value={obs}
        onChangeText={setObs}
      />

      <Button
        style={styles.input}
        mode='contained'
        icon='content-save'
        onPress={salvar}
      >
        Salvar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: '90%',
    marginTop: 10
  }
})
