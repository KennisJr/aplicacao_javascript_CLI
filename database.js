const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

//outra forma de obter dados do json:
// const dadosJson = require('./campeoes.json');

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'campeoes.json'
    }
    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8');
        return JSON.parse(arquivo.toString());
    }
    async escreverArquivo(dados) {
        await writeFileAsync (this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }
    async cadastrar(campeao) {
        const dados = await this.obterDadosArquivo();
        const id = campeao.id <= 2 ? campeao.id : Date.now();
        const campeaoComId = {
            id,
            ...campeao
        }
        
        const dadoFinal = [
            ...dados,
            campeaoComId

        ]

        const resultado = await this.escreverArquivo(dadoFinal);
        return resultado;

    }
    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }
    async remover(id) {
        if(!id) {
            return  await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === - 1) {
            throw Error('O usuario informado nao existe');
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados);
    }
    async atualizar(id,modificacoes){
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));

        return false;
    }
}

module.exports = new Database();