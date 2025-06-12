import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@treinos';

async function listar() {
  const json = await AsyncStorage.getItem(CHAVE);
  return json != null ? JSON.parse(json) : [];
}

async function salvar(treino) {
  treino.id = new Date().getTime();
  const treinos = await listar();
  treinos.push(treino);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
}

async function remover(id) {
  const treinos = await listar();
  const filtrados = treinos.filter(t => t.id !== id);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(filtrados));
}

async function atualizar(novo) {
  const treinos = await listar();
  const atualizados = treinos.map(t => t.id === novo.id ? novo : t);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(atualizados));
}

export default { listar, salvar, remover, atualizar };
