const Commander = require('commander');

async function main () {
    Commander
    .version('v1')
    .option('-n', '--nome [value]', "Nome do Campeão")
    .option('-p, --poder [value]', "Funcao do Campeão")
    .parse(process.argv)
    
    try {

    } catch (error) {
        console.error('DEU RUIM PCO', error)
    }
}
main();