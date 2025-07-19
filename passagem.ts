// Mariely Manoel Bragil, Ana Julia franco, Maria Tereza 


const entrada = require("readline-sync"); //biblioteca para resposta usuário
import * as fs from 'fs';

interface LinhaOnibus {
    id: number;
    partida: string;
    destino: string;
    preco: number;
    localEmbarque: string;          //tipando as linhas de onibus
    assentosDisponiveis: string[]; // Lista de assentos como strings
}

let linhas: LinhaOnibus[] = [
    {
        id: 1,
        partida: 'Ituiutaba',
        destino: 'Uberlândia',
        preco: 80,
        localEmbarque: 'Rodoviaria',
        assentosDisponiveis: ['02', '03']
    },
    {
        id: 2,
        partida: 'Olimpia',
        destino: 'Ituiutaba',
        preco: 120,
        localEmbarque: 'Rodoviaria',
        assentosDisponiveis: ['05', '06', '08', '09', '10', '15', '18', '19', '22', '24', '25']
    }
];

function GerarBilhete(nomeArquivo: string, conteudo: string){
    try {
        fs.writeFileSync(nomeArquivo, conteudo, { encoding: 'utf8' });
        console.log(`Arquivo '${nomeArquivo}' criado com sucesso!`);
    } catch (error) {
        console.error(`Erro ao salvar o arquivo '${nomeArquivo}':`, error);
    }
}

while (true) {
    console.log("\n--- Linhas Disponíveis ---");
    linhas.forEach(linha => {
        console.log(`Numero: ${linha.id} | ${linha.partida} -> ${linha.destino} | Preço: R$${linha.preco.toFixed(2)}`);
        console.log(`Assentos Disponíveis: ${linha.assentosDisponiveis.length} de ${linha.assentosDisponiveis.length + linha.assentosDisponiveis.length}`); 
    });

    let escolhaLinhaStr: string = entrada.question('Qual a sua opcao desejada? Digite o numero da linha (ou 0 para sair): ');
    let escolhaLinha: number = parseInt(escolhaLinhaStr);

    if (escolhaLinha === 0) {
        console.log("Saindo do sistema. Obrigado!");
        break; //Saída do sistema
    }

    // Encontra a linha escolhida 
    let linhaSelecionada: LinhaOnibus | undefined = linhas.find(linha => linha.id === escolhaLinha);

    if (!linhaSelecionada) {
        console.log("Opção de linha não disponível.");
        continue; 
    }

    if (linhaSelecionada.assentosDisponiveis.length === 0) {
        console.log("Desculpe, esta linha está lotada. Por favor, escolha outra.");
        continue;
    }

    // Reserva
    console.log(`\nAssentos disponíveis para ${linhaSelecionada.partida} -> ${linhaSelecionada.destino}:`);
    console.log(linhaSelecionada.assentosDisponiveis.join(', ')); 

    let nomePassageiro: string = entrada.question('Digite o nome para reserva: ');
    if (nomePassageiro.trim() === "") {
        console.log("Nome não pode ser vazio");
        continue; 
    }

    let escolhaAssento: string = entrada.question('Escolha qual assento deseja reservar: ');

    // Validação assento
    const indiceAssento = linhaSelecionada.assentosDisponiveis.indexOf(escolhaAssento);

    if (indiceAssento === -1) {
        console.log("Assento indisponível ou inválido.");
        continue;
    }

    

    // Remove o assento da lista
    linhaSelecionada.assentosDisponiveis.splice(indiceAssento, 1);
    console.log(`Assento ${escolhaAssento} reservado com sucesso!`);

    // Gera o bilhete
    const bilheteConteudo = `
    --- BILHETE DE PASSAGEM ---
    Nome do Passageiro: ${nomePassageiro}
    Linha: ${linhaSelecionada.partida} -> ${linhaSelecionada.destino}
    Local de Embarque: ${linhaSelecionada.localEmbarque}
    Número da Poltrona: ${escolhaAssento}
    Valor da Passagem: R$${linhaSelecionada.preco.toFixed(2)}
    `;

    const nomeArquivoBilhete = `bilhete_${nomePassageiro.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.txt`;
    GerarBilhete(nomeArquivoBilhete, bilheteConteudo);

    let continuarComprando: string = entrada.question('Deseja comprar outra passagem? sim ou nao: ').toLowerCase().trim();
    if (continuarComprando !== 'sim') {
        console.log("Finalizando sistema. Até mais!");
        break;
    }
}





