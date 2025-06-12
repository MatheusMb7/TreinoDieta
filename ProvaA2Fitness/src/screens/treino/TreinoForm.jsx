import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import TreinoService from '../../services/TreinoService';

export default function TreinoForm({ navigation, route }) {
  const treinoAntigo = route.params || {};
  const [tipo, setTipo] = useState(treinoAntigo.tipo || '');
  const [duracao, setDuracao] = useState(treinoAntigo.duracao || '');
  const [intensidade, setIntensidade] = useState(treinoAntigo.intensidade || '');
  const [data, setData] = useState(treinoAntigo.data || '');
  const [obs, setObs] = useState(treinoAntigo.obs || '');

  async function salvar() {
    const treino = { tipo, duracao, intensidade, data, obs };
    if (!tipo || !duracao || !intensidade || !data || !obs) {
      alert('Preencha todos os campos!');
      return;
    }

    if (treinoAntigo.id) {
      treino.id = treinoAntigo.id;
      await TreinoService.atualizar(treino);
      alert('Treino atualizado!');
    } else {
      await TreinoService.salvar(treino);
      alert('Treino salvo!');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'TreinoLista' }]
    });
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Cadastro de Treino</Text>

      <TextInput label="Tipo" mode="outlined" style={styles.input} value={tipo} onChangeText={setTipo} />
      <TextInput label="Duração (min)" mode="outlined" style={styles.input} value={duracao} onChangeText={setDuracao} keyboardType="numeric" />
      <TextInput label="Intensidade" mode="outlined" style={styles.input} value={intensidade} onChangeText={setIntensidade} />
      <TextInput
        label="Data"
        mode="outlined"
        style={styles.input}
        value={data}
        onChangeText={setData}
        keyboardType="numeric"
        render={props => <TextInputMask {...props} type={'datetime'} options={{ format: 'DD/MM/YYYY' }} />}
      />
      <TextInput label="Observações" mode="outlined" style={styles.input} value={obs} onChangeText={setObs} />

      <Button mode="contained" onPress={salvar} style={styles.input}>Salvar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  input: { width: '90%', marginTop: 10 }
});