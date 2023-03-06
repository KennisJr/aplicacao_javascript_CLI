const {
     deepEqual,
     ok
} = require('assert')

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Braum',
    funcao: 'Suporte',
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Urgot',
    funcao: 'Tank/DPS',
    id: 2

}

describe('Suite de manipulação de Campões', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    })
    it('Deve pesquisar um campeao usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id);
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um campeões, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected);
    })
    it('deve remover um campeão por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected);
    })
    it('deve atualizar um campeão', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Veigar',
            funcao: 'DPS/Control',
        }
        const novoDado = {
            nome: 'Veigar',
            funcao: 'DPS/Control'
        }
         await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
         const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
        deepEqual(resultado, expected);
    })
})