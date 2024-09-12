

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        const recintos = [
            {id:1 ,bioma:"savana", espacoLivre:7, total:10, animalExistentes: 'MACACO',animaisPermetidos: ['LEAO', 'LEOPARDO', 'MACACO', 'GAZELA', 'HIPOPOTAMO']},
            {id:2 ,bioma:"floresta", espacoLivre:5, total:5, animalExistentes: null, animaisPermetidos: ['MACACO']},
            {id:3 ,bioma:"savana e rio", espacoLivre:5, total:7, animalExistentes: 'GAZELA', animaisPermetidos: ['HIPOPOTAMO','LEAO', 'LEOPARDO', 'MACACO', 'GAZELA']},
            {id:4 ,bioma:"rio", espacoLivre:8, total:8, animalExistentes: null ,animaisPermetidos: ['CROCODILO', 'HIPOPOTAMO']},
            {id:5 ,bioma:"savana", espacoLivre:6, total:9, animalExistentes: 'LEAO',animaisPermetidos: ['LEAO', 'LEOPARDO', 'MACACO', 'GAZELA', 'HIPOPOTAMO']}
        ]

        const animaisValidos = [
            {id:1, especie:'LEAO', tamanho: 3},
            {id:2, especie:'LEOPARDO', tamanho: 2},
            {id:3, especie:'CROCODILO', tamanho: 3},
            {id:4, especie:'MACACO', tamanho: 1},
            {id:5, especie:'GAZELA', tamanho: 2},
            {id:5, especie:'HIPOPOTAMO', tamanho: 4}
        ];

        let recintosViaveis = []

        if(animaisValidos.filter(e => e.especie === animal).length <= 0){
            return { erro: "Animal inválido" };
        }
        
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
        
        const ocupacao = animaisValidos
            .filter(e => e.especie === animal)
            .map(e => e.tamanho * quantidade)
        const ocupacaoAnimais = Number(ocupacao);

        if(animal == 'LEAO' || animal == 'LEOPARDO' || animal == 'CROCODILO' ){

         recintosViaveis = recintos
            .filter(e => e.animaisPermetidos?.includes(animal))
            .filter(e => e.animalExistentes == animal || e.animalExistentes == null )
            .filter(e => e.espacoLivre >= ocupacaoAnimais)
            .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - ocupacaoAnimais} total: ${recinto.total})`);
        }

        if(animal == 'MACACO'){

            if(quantidade == 1 ){
                const recintosAnimalDiferente  = recintos
                    .filter(e => e.animalExistentes != null && e.animalExistentes != animal )
                    .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= (ocupacaoAnimais + 1))
                    .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                    .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - (ocupacaoAnimais + 1)} total: ${recinto.total})`);

                const recintosMesmoAnimal = recintos
                    .filter(e => e.animalExistentes == animal )
                    .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= ocupacaoAnimais )
                    .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                    .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - ocupacaoAnimais } total: ${recinto.total})`);

                recintosViaveis = recintosMesmoAnimal.concat(recintosAnimalDiferente)
            }
            else{

                const recintosAnimalDiferente  = recintos
                    .filter(e => e.animalExistentes != animal && e.animalExistentes != null)
                    .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= (ocupacaoAnimais + 1))
                    .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                    .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - (ocupacaoAnimais + 1)} total: ${recinto.total})`);

                const recintosMesmoAnimal = recintos
                    .filter(e => e.animalExistentes == animal || e.animalExistentes == null)
                    .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= ocupacaoAnimais )
                    .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                    .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - ocupacaoAnimais } total: ${recinto.total})`);
            
                recintosViaveis = recintosMesmoAnimal.concat(recintosAnimalDiferente)
            }
        }

        if(animal == 'GAZELA' ){  

            const recintosAnimalDiferente = recintos
                .filter(e => e.animalExistentes != animal && e.animalExistentes != null)
                .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= (ocupacaoAnimais + 1))
                .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - (ocupacaoAnimais + 1)} total: ${recinto.total})`)
            
            const recintosMesmoAnimal = recintos
                .filter(e => e.animalExistentes == animal || e.animalExistentes == null)
                .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= ocupacaoAnimais)
                .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - ocupacaoAnimais} total: ${recinto.total})`);

            recintosViaveis = recintosAnimalDiferente.concat(recintosMesmoAnimal)
        }
        
        if(animal == 'HIPOPOTAMO'){

            const recintosAnimalDiferente = recintos
                .filter(e => e.animalExistentes != animal && e.animalExistentes != null && e.bioma == 'savana e rio')
                .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= (ocupacaoAnimais + 1))
                .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - (ocupacaoAnimais + 1)} total: ${recinto.total})`)
        
            const recintosMesmoAnimal = recintos
                .filter(e => e.animalExistentes == animal || e.animalExistentes == null)
                .filter(e => e.animaisPermetidos?.includes(animal) && e.espacoLivre >= ocupacaoAnimais)
                .filter(e => e.animalExistentes != 'LEAO' && e.animalExistentes != 'LEOPARDO' && e.animalExistentes != 'CROCODILO')
                .map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre - ocupacaoAnimais} total: ${recinto.total})`);

        recintosViaveis = recintosAnimalDiferente.concat(recintosMesmoAnimal)
        }   

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return {recintosViaveis};

    }
    
}

export { RecintosZoo as RecintosZoo };
