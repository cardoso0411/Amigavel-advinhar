let segredo = 0;
let tentativas = 3;
let pontos = 0;

const selectDificuldade = document.getElementById("dificuldade");
const inputPalpite = document.getElementById("palpite");
const msg = document.getElementById("mensagem");
const pontuacao = document.getElementById("pontuacao");
const btnModo = document.getElementById("btnModo");
const btnJogar = document.getElementById("btnJogar");
const btnMusica = document.getElementById("btnMusica");
const musica = document.getElementById("musica");

const somAcerto = new Audio("acerto.mp3");
const somErro = new Audio("erro.mp3");

function atualizarLimitesInput() {
    const max = parseInt(selectDificuldade.value, 10);
    inputPalpite.min = "1";
    inputPalpite.max = String(max);
}

function gerarNumero() {
    const max = parseInt(selectDificuldade.value, 10);
    segredo = Math.floor(Math.random() * max) + 1;
    tentativas = 3;
    msg.innerText = "";
    inputPalpite.value = "";
    inputPalpite.focus();
    atualizarLimitesInput();
}

function toggleMusica() {
    if (musica.paused) musica.play();
    else musica.pause();
}

function jogar() {
    const palpite = parseInt(inputPalpite.value, 10);

    if (isNaN(palpite)) {
        msg.innerText = "Digite um número válido.";
        return;
    }

    const max = parseInt(selectDificuldade.value, 10);
    if (palpite < 1 || palpite > max) {
        msg.innerText = `Digite um número entre 1 e ${max}.`;
        return;
    }

    if (palpite === segredo) {
        somAcerto.currentTime = 0;
        somAcerto.play();
        msg.innerText = "🎉 Você acertou!";
        pontos += tentativas * 30;
        pontuacao.innerText = "Pontuação: " + pontos;
        gerarNumero();
    } else {
        somErro.currentTime = 0;
        somErro.play();
        tentativas--;
        if (tentativas > 0) {
            msg.innerText = `❌ Errou! Você tem ${tentativas} tentativas.`;
        } else {
            msg.innerText = `💥 Você perdeu! O número era ${segredo}.`;
            gerarNumero();
        }
    }
}

selectDificuldade.addEventListener("change", gerarNumero);
btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
btnMusica.addEventListener("click", toggleMusica);
btnJogar.addEventListener("click", jogar);
inputPalpite.addEventListener("keydown", (e) => {
    if (e.key === "Enter") jogar();
});

atualizarLimitesInput();
gerarNumero();
