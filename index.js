const { Command } = require("commander");
const Campeao = require('./campeao');
const Database = require('./database');

async function main () {
    const program = new Command();
    program
    .version("v1")
    .option('-n, --nome [value]', "Nome do Campeão")
    .option('-f, --funcao [value]', "Funcao do Campeão")
    .option('-i, --id [value]', "id do Campeão")
    .option('-c, --cadastrar', "Cadastrar um Campeão")
    .option('-l, --listar', "Listar Campeões")
    .option('-d, --deletar', "Deletar Campeão")
    .option("-a, --atualizar [value]", "Atualiza um Campeão")
    program.parse(process.argv);
    const options = program.opts();
    const campeao = new Campeao(options)
    try {
        if(options.cadastrar){
            const resultado = await Database.cadastrar(campeao);
            if(!resultado) {
                console.error('Campeão não foi cadastrado');
                return;
            }
            console.log("Campeão cadastrado com sucesso!");
        }
        if(options.listar){
            const resultado = await Database.listar();
           console.log(resultado);
           return;
        }
        if(options.deletar){
            const resultado = await Database.remover(campeao.id);
            if(!resultado){
                console.log('Erro ao remover o campeão');
                return;
            }
            console.log('Campeão removido com sucesso')
        }
        if(options.atualizar){
            const idParaAtualiza = parseInt(options.atualizar);
            delete campeao.id;
            const dado = JSON.stringify(campeao);
            const campeaoAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaAtualiza,campeaoAtualizar);
            if (!resultado) {
                console.error("Não foi possível atualizar o Campeão");
                return;
              }
              console.log("Campeão atualizado com sucesso");
        }
    } catch (error) {
        console.error('DEU RUIM PCO', error);
    }
}
main();