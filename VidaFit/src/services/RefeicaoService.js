let refeicoes = [
  { id: 1, nome: 'Café da manhã', descricao: 'Pão, café, frutas', calorias: 300, tipo: 'Café', horario: '07:00' },
  { id: 2, nome: 'Almoço', descricao: 'Arroz, feijão, frango', calorias: 700, tipo: 'Principal', horario: '12:00' },
];

export default {
  listar: () => Promise.resolve(refeicoes),

  inserir: (refeicao) => {
    refeicao.id = refeicoes.length > 0 ? refeicoes[refeicoes.length - 1].id + 1 : 1;
    refeicoes.push(refeicao);
    return Promise.resolve();
  },

  atualizar: (refeicao) => {
    const index = refeicoes.findIndex(r => r.id === refeicao.id);
    if (index >= 0) refeicoes[index] = refeicao;
    return Promise.resolve();
  },

  remover: (id) => {
    refeicoes = refeicoes.filter(r => r.id !== id);
    return Promise.resolve();
  }
};
