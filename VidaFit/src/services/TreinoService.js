import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@treinos';

async function listar() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error('Erro ao listar treinos:', error);
    return [];
  }
}

async function inserir(treino) {
  try {
    const treinos = await listar();
    // Gera ID mais robusto
    const maxId = treinos.length > 0 ? Math.max(...treinos.map(t => t.id)) : 0;
    treino.id = maxId + 1;
    treinos.push(treino);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
  } catch (error) {
    console.error('Erro ao inserir treino:', error);
    throw error;
  }
}

async function atualizar(treino) {
  try {
    const treinos = await listar();
    const index = treinos.findIndex(t => t.id === treino.id);
    if (index !== -1) {
      treinos[index] = treino;
      await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
    }
  } catch (error) {
    console.error('Erro ao atualizar treino:', error);
    throw error;
  }
}

async function remover(id) {
  try {
    const treinos = await listar();
    const novos = treinos.filter(t => t.id !== id);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novos));
  } catch (error) {
    console.error('Erro ao remover treino:', error);
    throw error;
  }
}

export default {
  listar,
  inserir,
  atualizar,
  remover
};