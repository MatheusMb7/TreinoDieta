 import AsyncStorage from '@react-native-async-storage/async-storage'

const CHAVE = 'alunos_v1'

export default {
  async listar() {
    const dados = await AsyncStorage.getItem(CHAVE)
    return dados ? JSON.parse(dados) : []
  },

  async salvar(aluno) {
    const alunos = await this.listar()

    if (aluno.id) {
      const index = alunos.findIndex((a) => a.id === aluno.id)
      alunos[index] = aluno
    } else {
      aluno.id = new Date().getTime()
      alunos.push(aluno)
    }

    await AsyncStorage.setItem(CHAVE, JSON.stringify(alunos))
  },

  async atualizar(aluno) {
    await this.salvar(aluno)
  },

  async remover(id) {
    const alunos = await this.listar()
    const novosAlunos = alunos.filter((a) => a.id !== id)
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novosAlunos))
  }
}
