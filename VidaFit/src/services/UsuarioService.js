import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIOS_KEY = '@usuarios';

export async function salvarUsuario(usuario) {
  const usuarios = await listarUsuarios();
  usuarios.push(usuario);
  await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

export async function listarUsuarios() {
  const data = await AsyncStorage.getItem(USUARIOS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function atualizarUsuario(usuario) {
  const usuarios = await listarUsuarios();
  const index = usuarios.findIndex(u => u.id === usuario.id);
  if (index !== -1) {
    usuarios[index] = usuario;
    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  }
}

export async function excluirUsuario(id) {
  const usuarios = await listarUsuarios();
  const novosUsuarios = usuarios.filter(u => u.id !== id);
  await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(novosUsuarios));
}
