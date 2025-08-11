const dialogoContainer = document.getElementById("dialogoContainer");
const escolhasContainer = document.getElementById("escolhasContainer");
const backgroundElement = document.getElementById("background");


let historia = {};
let cenaAtual = "inicio";
let indiceFalaAtual = 0;

export async function carregarHistoria() {
    console.log("Carregando história...");
    const response = await fetch("historiaC.json"); 
    historia = await response.json();
    
    mostrarCena(cenaAtual);
}

function mostrarCena(cenaId) {
    console.log(`Mostrando cena: ${cenaId}`);
    indiceFalaAtual = 0;
    cenaAtual = cenaId;
    escolhasContainer.innerHTML = ""; 
    dialogoContainer.addEventListener('click', avancarFala);
    
    avancarFala();
}


function avancarFala() {
    const cena = historia[cenaAtual];
    
    if (indiceFalaAtual < cena.falas.length) {
        dialogoContainer.innerHTML = cena.falas[indiceFalaAtual];
        if (cena.fundo) {
            backgroundElement.style.backgroundImage = `url('${cena.fundo}')`;
        }
        indiceFalaAtual++;
    } else {

        mostrarEscolhas();
    }
}


function mostrarEscolhas() {
    console.log("Mostrando botões de escolha...");
    const cena = historia[cenaAtual];
    
    // Limpa a última fala para dar espaço visual para os botões
    dialogoContainer.innerHTML = ""; 
    
    // Desativa o clique no diálogo para que apenas os botões funcionem
    dialogoContainer.removeEventListener('click', avancarFala);

    if (cena.escolhas && cena.escolhas.length > 0) {
        cena.escolhas.forEach(escolha => {
            const botao = document.createElement('button');
            botao.textContent = escolha.texto;
            botao.className = 'botao-escolha'; 
            botao.onclick = () => mostrarCena(escolha.proxima);
            
            escolhasContainer.appendChild(botao);
        });
    } else {

        // Se não houver escolhas, exibe uma mensagem de fim de cena.
        const fim = document.createElement("p");
        fim.innerText = "Fim da jornada.";
        escolhasContainer.appendChild(fim);
    }
}
