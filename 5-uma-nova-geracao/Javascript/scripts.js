const personagens = {
    Garen: { chibi: "garen-chibi.png", adulto: "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Garen.png" },
    Katarina: { chibi: "katarina-chibi.png", adulto: "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Katarina.png" },
    Zed: { chibi: "zed-chibi.png", adulto: "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Zed.png" },
    Riven: { chibi: "riven-chibi.png", adulto: "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Riven.png" }
};

const caracteristicas = {
    Garen: { 
        descricao: "Demaciano: Sente muita fome com o tempo, mas seu cansaço é controlado.", 
        fomeTempo: 6, 
        cansacoTempo: 4, 
        felicidadeTempo: -4, 
        bonusBrincar: 25, 
        bonusDescanso: 35, 
        idadePorCiclo: 1 
    },
    Katarina: { 
        descricao: "Assassina: Envelhece super rápido. O tempo voa, então você precisa ser muito eficiente.", 
        fomeTempo: 4, 
        cansacoTempo: 7, 
        felicidadeTempo: -4, 
        bonusBrincar: 35, 
        bonusDescanso: 30, 
        idadePorCiclo: 3 
    },
    Zed: { 
        descricao: "Mestre das Sombras: A meditação é sua aliada. Descansar recupera energia drasticamente.", 
        fomeTempo: 5, 
        cansacoTempo: 5, 
        felicidadeTempo: -4, 
        bonusBrincar: 25, 
        bonusDescanso: 45, 
        idadePorCiclo: 2 
    },
    Riven: { 
        descricao: "Exilada: Quase não sente fome, mas a tristeza do passado destrói a felicidade rápido.", 
        fomeTempo: 3, 
        cansacoTempo: 6, 
        felicidadeTempo: -7, 
        bonusBrincar: 35, 
        bonusDescanso: 30, 
        idadePorCiclo: 2 
    }
};

class BichinhoVirtual {
    constructor(nome) {
        this.nome = nome;
        this.nivelDeFome = 50;
        this.nivelFelicidade = 50;
        this.cansaco = 0;
        this.idade = 0;
        this.vivo = true;
        this.traits = caracteristicas[nome]; 
    }

    alimentar() { 
        if (this.vivo) { 
            this.nivelDeFome = Math.max(0, this.nivelDeFome - 35); 
            this.cansaco = Math.min(100, this.cansaco + 10); // Alimentar dá cansaço
            log(`${this.nome} se alimentou (-35 Fome), mas a digestão cansa (+10 Cans).`); 
        } 
    }

    brincar() { 
        if (this.vivo) {
            let ganho = this.traits.bonusBrincar || 25; 
            this.nivelFelicidade = Math.min(100, this.nivelFelicidade + ganho);
            this.cansaco = Math.min(100, this.cansaco + 15);
            log(`${this.nome} brincou (+${ganho} Fel), mas ficou cansado (+15 Cans).`);
        }
    }

    descansar() { 
        if (this.vivo) {
            let rec = this.traits.bonusDescanso || 35;
            this.cansaco = Math.max(0, this.cansaco - rec);
            this.nivelDeFome = Math.min(100, this.nivelDeFome + 15); // Descansar dá fome
            log(`${this.nome} descansou (-${rec} Cans), mas acordou faminto (+15 Fome).`);
        }
    }

    passarTempo() {
        if (this.vivo) {
            // Multiplicador mais suave (1x, 1.4x, 1.8x, 2.2x, 2.6x)
            let multiplicadorIdade = 1 + Math.floor(this.idade / 10) * 0.4;

            this.nivelDeFome += Math.round(this.traits.fomeTempo * multiplicadorIdade);
            this.nivelFelicidade += Math.round(this.traits.felicidadeTempo * multiplicadorIdade);
            this.cansaco += Math.round(this.traits.cansacoTempo * multiplicadorIdade);
            
            this.idade += this.traits.idadePorCiclo;

            this.nivelDeFome = Math.max(0, Math.min(100, this.nivelDeFome));
            this.nivelFelicidade = Math.max(0, Math.min(100, this.nivelFelicidade));
            this.cansaco = Math.max(0, Math.min(100, this.cansaco));

            log(`O tempo passou... ${this.nome} tem ${this.idade} anos.`);
            
            if (this.idade >= 10 && this.idade <= 15 || this.idade >= 20 && this.idade <= 25 || this.idade >= 30 && this.idade <= 35 || this.idade >= 40 && this.idade <= 45) {
                log(`⚠️ O metabolismo mudou! O desgaste agora é de ${multiplicadorIdade}x.`);
            }

            this.verificarRegras();
        }
    }

    verificarRegras() {
        if (this.nivelDeFome >= 100) { this.vivo = false; finalizarJogo(`GAME OVER! ${this.nome} morreu de fome na idade ${this.idade}.`); }
        else if (this.cansaco >= 100) { this.vivo = false; finalizarJogo(`GAME OVER! ${this.nome} morreu de exaustão na idade ${this.idade}.`); }
        else if (this.nivelFelicidade <= 0) { this.vivo = false; finalizarJogo(`GAME OVER! ${this.nome} morreu de tristeza na idade ${this.idade}.`); }
        else if (this.idade >= 50) { this.vivo = false; finalizarJogo(`VITÓRIA! Parabéns! Você cuidou tão bem de ${this.nome} que ele chegou aos 50 anos!`); }
    }
}

let pet;
let acoesRestantes = 2;

function iniciarJogo(nomeCampeao) {
    document.getElementById('tela-selecao').style.display = 'none';
    document.getElementById('tela-jogo').style.display = 'block';
    
    document.getElementById('btn-reiniciar').style.display = 'none';
    document.getElementById('log').innerHTML = '<p>Jogo iniciado. Cuide bem do seu campeão!</p>';

    const botoesAcao = document.querySelectorAll('.botoes button');
    botoesAcao.forEach(btn => { 
        btn.disabled = false; 
        btn.style.opacity = '1';
    });

    pet = new BichinhoVirtual(nomeCampeao);
    acoesRestantes = 2; 
    
    document.getElementById('nome-pet').innerText = nomeCampeao;
    document.getElementById('avatar-pet').src = personagens[nomeCampeao].chibi;
    
    atualizarInterface();
}

function reiniciarJogo() {
    document.getElementById('tela-jogo').style.display = 'none';
    document.getElementById('tela-selecao').style.display = 'grid';
}

function acao(tipo) {
    if (!pet || !pet.vivo) return;

    if (tipo === 'passarTempo') {
        pet.passarTempo();
        acoesRestantes = 2; 
    } else {
        if (acoesRestantes <= 0) return; 
        
        if (tipo === 'alimentar') pet.alimentar();
        if (tipo === 'brincar') pet.brincar();
        if (tipo === 'descansar') pet.descansar();
        
        acoesRestantes--; 
    }
    
    atualizarInterface();
}

function atualizarInterface() {
    document.getElementById('txt-fome').innerText = `${Math.round(pet.nivelDeFome)}/100`;
    document.getElementById('txt-felicidade').innerText = `${Math.round(pet.nivelFelicidade)}/100`;
    document.getElementById('txt-cansaco').innerText = `${Math.round(pet.cansaco)}/100`;
    document.getElementById('txt-idade').innerText = `${pet.idade} anos`;
    document.getElementById('txt-acoes').innerText = `${acoesRestantes} / 2`;

    document.getElementById('barra-fome').style.width = `${pet.nivelDeFome}%`;
    document.getElementById('barra-felicidade').style.width = `${pet.nivelFelicidade}%`;
    document.getElementById('barra-cansaco').style.width = `${pet.cansaco}%`;

    // Painel de Previsão Dinâmico
    let multiplicadorIdade = 1 + Math.floor(pet.idade / 10) * 0.4;
    
    let custoFome = Math.round(pet.traits.fomeTempo * multiplicadorIdade);
    let custoFel = Math.round(pet.traits.felicidadeTempo * multiplicadorIdade);
    let custoCans = Math.round(pet.traits.cansacoTempo * multiplicadorIdade);

    document.getElementById('descricao-pet').innerText = `${pet.traits.descricao}`;
    document.getElementById('txt-custo-tempo').innerHTML = `+${custoFome} Fome / ${custoFel} Fel / +${custoCans} Cans <br><small>(Multiplicador: ${multiplicadorIdade.toFixed(1)}x)</small>`;
    
    let ganhoFel = pet.traits.bonusBrincar || 25;
    let descanso = pet.traits.bonusDescanso || 35;
    
    document.getElementById('txt-custo-alimentar').innerText = `-35 Fome / +10 Cans`;
    document.getElementById('txt-custo-brincar').innerText = `+${ganhoFel} Fel / +15 Cans`;
    document.getElementById('txt-custo-descansar').innerText = `-${descanso} Cans / +15 Fome`;

    // Avatar
    const avatar = document.getElementById('avatar-pet');
    if (pet.idade >= 25) {
        avatar.classList.add('adulto');
        avatar.src = personagens[pet.nome].adulto; 
    } else {
        avatar.classList.remove('adulto');
        avatar.src = personagens[pet.nome].chibi; 
    }

    // Botões
    const botoesAcao = document.querySelectorAll('.botoes button:not(.btn-passar)');
    botoesAcao.forEach(btn => {
        if (acoesRestantes <= 0 || !pet.vivo) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

function log(mensagem) {
    const divLog = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = mensagem;
    divLog.appendChild(p);
    divLog.scrollTop = divLog.scrollHeight; 
}

function finalizarJogo(mensagem) {
    log(`🚨 ${mensagem}`);
    
    const botoesAcao = document.querySelectorAll('.botoes button');
    botoesAcao.forEach(btn => { btn.disabled = true; });

    document.getElementById('btn-reiniciar').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
    }, 100);
}