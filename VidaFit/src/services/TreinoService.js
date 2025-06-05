import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@treinos';

async function listar() {
  const dados = await AsyncStorage.getItem(CHAVE);
  return dados ? JSON.parse(dados) : [];
}

async function inserir(treino) {
  const treinos = await listar();
  treino.id = Date.now();
  treinos.push(treino);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
}

async function atualizar(treino) {
  const treinos = await listar();
  const index = treinos.findIndex(t => t.id === treino.id);
  if (index !== -1) {
    treinos[index] = treino;
    await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
  }
}

async function remover(id) {
  const treinos = await listar();
  const novos = treinos.filter(t => t.id !== id);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(novos));
}

export default {
  listar,
  inserir,
  atualizar,
  remover
};
