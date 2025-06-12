import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@progresso'

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
  return jsonValue != null ? JSON.parse(jsonValue) : []
}

async function salvar(progresso) {
  progresso.id = new Date().getTime()
  const lista = await listar()
  lista.push(progresso)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

async function buscar(id) {
  const lista = await listar()
  return lista.find(item => item.id === id)
}

async function remover(id) {
  const lista = await listar()
  const novaLista = lista.filter(item => item.id !== id)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista))
}

async function atualizar(progressoAtualizado) {
  const lista = await listar()
  const novaLista = lista.map(item => item.id === progressoAtualizado.id ? progressoAtualizado : item)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista))
}

export default {
  listar,
  salvar,
  buscar,
  remover,
  atualizar
}
