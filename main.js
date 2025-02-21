import { Outros } from './scripts/outros.js'
import { Historico } from './scripts/historico.js'
import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";

function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
            Outros.deleteCalculo();
        });
    });
}

function mostrarCalculo(calculoId) {
    const divs = document.querySelectorAll('.calculo-div');
    const resposta = document.querySelector("#resultado");
    resposta.innerHTML = '';

    divs.forEach(div => div.style.display = 'none');

    const calculoDiv = document.getElementById(calculoId);
    calculoDiv.style.display = 'flex';
    calculoDiv.style.gap = '.5rem';

    const container = document.querySelector(".container");
    if (container) {
        container.style.alignItems = '';
        container.style.justifyContent = '';
    }

    if (calculoId === 'raiz-div') {
        const raizDiv = document.getElementById('raiz');
        if (raizDiv) {
            raizDiv.style.display = 'flex';
            raizDiv.style.flexDirection = 'row';
            raizDiv.style.gap = '.5rem';
            raizDiv.style.alignItems = 'center';
        }
        calculoDiv.style.flexDirection = 'column';
    } else if (calculoId === 'bhaskara-div') {
        calculoDiv.style.flexDirection = 'row';
    } else if (['fatorial-div', 'porcentagem-div', 'duplofatorial-div'].includes(calculoId)) {
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.alignItems = 'center';
        calculoDiv.style.justifyContent = 'center';
    } else {
        calculoDiv.style.flexDirection = 'column';
    }

    if (calculoId === 'porcentagem-div' || calculoId === 'bhaskara-div') {
        if (container) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
        }
    }
}

const inputEventListeners = [
    { ids: ['valorA', 'valorB', 'valorC', 'angulo'], event: 'input', handler: Pitagoras.blockTrigonometria },
    { ids: ['logaritmo', 'logaritmando', 'base'], event: 'input', handler: Logaritmo.blockLogaritmo },
    { ids: ['valorAR', 'valorBR', 'valorCR', 'valorDR'], event: 'input', handler: RazaoeProporcao.blockRazaoEProporcao },
    { ids: ['valorAn', 'valorA1', 'valorN', 'valorR', 'valorAk'], event: 'input', handler: Progressao.blockPaTg },
    { ids: ['valorAn1', 'valorA11', 'valorN1', 'valorS1'], event: 'input', handler: Progressao.blockPaSg },
    { ids: ['valorAn2', 'valorA12', 'valorN2', 'valorQ2'], event: 'input', handler: Progressao.blockPGTg },
    { ids: ['valorSn', 'valorA13','valorqN', 'valorN3', 'valorQ'], event: 'input', handler: Progressao.blockPGSg },
];

inputEventListeners.forEach(({ ids, event, handler }) => {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener(event, handler);
    });
});

document.getElementById("razaoeproporção-select").addEventListener("change", function () {
    ['valorAR', 'valorBR', 'valorCR', 'valorDR'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    RazaoeProporcao.blockRazaoEProporcao();
});

document.querySelector("#calcularButton").addEventListener("click", Outros.mostrarResultado);
document.getElementById("mostrarCalculo").addEventListener("click", Outros.mostrarConta);
document.getElementById("calcularButton").addEventListener("click", Outros.mostrarConta);
document.getElementById("calcularButton").addEventListener("click", Outros.updateConta);
document.querySelector("#deletarResult").addEventListener("click", Outros.deleteResultado);
document.getElementById("buttonDeleteCal").addEventListener("click", Outros.deleteCalculo);
document.querySelector(".clearHistory").addEventListener("click", Historico.clearHistory);

document.getElementById('dropdownCalculos').addEventListener('click', function () {
    const calculoSection = document.getElementById('calculoContainer');
    if (!calculoSection.style.display || calculoSection.style.display === 'none') {
        calculoSection.style.display = 'flex';
        calculoSection.style.flexDirection = 'column';
    } else {
        calculoSection.style.display = 'none';
    }
});

document.getElementById("tipoProgressão-select").addEventListener("change", function () { 
    const PAD = document.querySelector("#PAD");
    const PGD = document.querySelector("#PGD");
    const PHD = document.querySelector("#PHD");
    const PADS = document.querySelector('#tipoPA-select');
    const PGDS = document.querySelector("#tipoPG-select");

    [PAD, PGD, PHD].forEach(el => { if (el) el.style.display = "none"; });
    if (PADS) PADS.style.display = "none";
    if (PGDS) PGDS.style.display = "none";

    if (this.value === "PA") {
        if (PAD) PAD.style.display = "block";
        if (PADS) PADS.style.display = "flex";
    } else if (this.value === "PG") {
        if (PGD) PGD.style.display = "block";
        if (PGDS) PGDS.style.display = "flex";
    } else if (this.value === "PH") {
        if (PHD) PHD.style.display = "block";
    } else {
        document.querySelector('#erroMensagem').innerHTML = 'Selecione um cálculo válido';
    }
});

document.getElementById("tipoPA-select").addEventListener("change", function () {
    const TG = document.querySelector("#TG");
    const somaGeral = document.querySelector("#somaGeral");

    if (TG) TG.style.display = "none";
    if (somaGeral) somaGeral.style.display = "none";

    if (this.value === "TG") {
        if (TG) TG.style.display = "flex";
    } else if (this.value === "somaGeral") {
        if (somaGeral) somaGeral.style.display = "flex";
    }
});

document.getElementById("tipoPG-select").addEventListener("change", function () {
    const tg = document.querySelector("#PGD .TG");
    const somaGeral = document.querySelector("#PGD .somaGeral");

    if (tg) tg.style.display = "none";
    if (somaGeral) somaGeral.style.display = "none";
    if (this.value === "TG") {
        if (tg) tg.style.display = "block";
    } else if (this.value === "somaGeral") {
        if (somaGeral) somaGeral.style.display = "block";
    }
});

document.getElementById("matriz-select").addEventListener("change", () => {
    const matriz2x2 = document.getElementById("matriz2x2");
    const matriz3x3 = document.getElementById("matriz3x3");
    const matrizSelected = document.getElementById("matriz-select").value;
    if (matrizSelected === "2x2") {
        if (matriz2x2) matriz2x2.style.display = "block";
        if (matriz3x3) matriz3x3.style.display = "none";
    } else {
        if (matriz2x2) matriz2x2.style.display = "none";
        if (matriz3x3) matriz3x3.style.display = "block";
    }
});

window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    Historico.updateHistory();
};