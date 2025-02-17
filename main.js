import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { Porcentagem } from "./scripts/porcentagem.js";
import { Raiz } from "./scripts/raiz.js";
import { Bhaskara } from "./scripts/bhaskara.js";
import { Fatorial } from "./scripts/fatorial.js";
import { DuploFatorial } from "./scripts/duplofatorial.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";
import { Expressao } from "./scripts/expressão.js";
import { Funcao } from "./scripts/funcao.js";
import { Matriz } from "./scripts/matriz.js";

const calculosMap = {
    'eval-div': Expressao.calcularExpressao,
    'raiz-div': Raiz.calcularRaiz,
    'porcentagem-div': Porcentagem.calcularPorcentagem,
    'bhaskara-div': Bhaskara.calcularBhaskara,
    'fatorial-div': Fatorial.calcularFatorial,
    'duplofatorial-div': DuploFatorial.calcularDuploFatorial,
    'pitagoras-trigonometria-div': Pitagoras.calcularTrigonometria,
    'logaritmo-div': Logaritmo.calcularLog,
    'razaoeproporção-div': RazaoeProporcao.calcularRazaoEProporcao,
    'progressão-div': Progressao.calcularProgressao,
    'funcao-div': Funcao.calcularFuncao,
    'matriz-div': () => {
        const matrizSelected = document.getElementById("matriz-select").value;
        return matrizSelected === "2x2" ? Matriz.matriz2x2() : Matriz.matriz3x3();
    },
};

function calcular() {
    const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
    const errorMessage = document.querySelector('#erroMensagem');
    errorMessage.innerHTML = "";

    if (!activeDiv) {
        errorMessage.innerHTML = "Nenhuma operação selecionada.";
        return {};
    }

    const calcularFunc = calculosMap[activeDiv.id];
    if (!calcularFunc) {
        errorMessage.innerHTML = "Operação não reconhecida ou inválida.";
        return {};
    }

    const { result, conta, resultado1 = '', resultado2 = '' } = calcularFunc();
    return { result, conta, resultado1, resultado2 };
}

function mostrarCalculo(calculoId) {
    const divs = document.querySelectorAll('.calculo-div');
    const resposta = document.querySelector("#resultado");
    resposta.innerHTML = '';

    divs.forEach(div => div.style.display = 'none');

    const calculoDiv = document.getElementById(calculoId);
    calculoDiv.style.display = 'flex';
    calculoDiv.style.gap = '.5rem';

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
}

function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
            deleteCalculo();
        });
    });
}

function updateHistory() {
    const historyDiv = document.querySelector('.history');
    historyDiv.innerHTML = '<h3>Histórico</h3>';

    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];

    if (savedHistory.length === 0) {
        const p = document.createElement('p');
        p.innerHTML = "Sem registros no histórico.";
        historyDiv.appendChild(p);
        return;
    }

    savedHistory.forEach(entry => {
        const p = document.createElement('p');
        p.style.color = "black";
        p.innerHTML = entry;
        historyDiv.appendChild(p);
    });
}


function clearHistory() {
    localStorage.removeItem('history');
    updateHistory();
}

function mostrarResultado() {
    const { result, resultado1, resultado2 } = calcular();
    const resposta = document.querySelector("#resultado");
    const calculoSelecionado = document.querySelector('.calculo-div[style*="display: flex"]').id;
    const razaoOuProporcao = document.querySelector("#razaoeproporção-select");
    let inputFaltando = null;

    if (calculoSelecionado === 'razaoeproporção-div' && razaoOuProporcao.value === 'razao') {
        inputFaltando = RazaoeProporcao.getInputFaltandoRazao();
    } else if (calculoSelecionado === 'pitagoras-trigonometria-div') {
        inputFaltando = Pitagoras.getInputFaltandoTrigonometria();
    } else if (calculoSelecionado === 'logaritmo-div') {
        inputFaltando = Logaritmo.getInputFaltandoLog();
    } else if (calculoSelecionado === 'progressão-div') {
        const selected = document.getElementById('tipoPA-select').value;
        if (selected === 'TG') {
            inputFaltando = Progressao.getInputFaltandoPaTg();
        } else if (selected === 'somaGeral') {
            inputFaltando = Progressao.getInputFaltandoPaSg();
        }
    }

    if (inputFaltando && result !== undefined) {
        const inputElements = document.querySelectorAll(`#${inputFaltando}`);
        inputElements.forEach(inputElement => {
            if (!inputElement) return;
            if (calculoSelecionado !== 'pitagoras-trigonometria-div') {
                inputElement.value = result;
            } else {
                if (inputElement.id === 'angulo') {
                    inputElement.value = resultado1;
                    const inputElement2 = Pitagoras.getInputFaltandoTrigonometria();
                    if (inputElement2 && ['valorA', 'valorB', 'valorC'].includes(inputElement2.id)) {
                        inputElement2.value = resultado2;
                    }
                }
                if (['valorA', 'valorB', 'valorC'].includes(inputElement.id)) {
                    inputElement.value = resultado2;
                }
            }
            inputElement.disabled = false;
        });
    }

    resposta.innerHTML = result !== undefined ? `Resultado: ${result}` : "";

    if (result !== undefined && !isNaN(result)) {
        const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
        savedHistory.push(result);
        localStorage.setItem('history', JSON.stringify(savedHistory));
        updateHistory();
    }
}

function mostrarConta() {
    const { conta } = calcular();
    const conta1 = document.querySelector("#conta1");
    const conta2 = document.querySelector(".contas");
    conta1.innerHTML = conta !== undefined ? `${conta}` : "";
    conta2.style.display = "flex";
}

function deleteCalculo() {
    const conta2 = document.querySelector(".contas");
    conta2.style.display = "none";
}

function deleteResultado() {
    const result = document.querySelector("#resultado");
    result.innerHTML = '';
}

const inputEventListeners = [
    { ids: ['valorA', 'valorB', 'valorC', 'angulo'], event: 'input', handler: Pitagoras.blockTrigonometria },
    { ids: ['logaritmo', 'logaritmando', 'base'], event: 'input', handler: Logaritmo.blockLogaritmo },
    { ids: ['valorAR', 'valorBR', 'valorCR', 'valorDR'], event: 'input', handler: RazaoeProporcao.blockRazaoEProporcao },
    { ids: ['valorAn', 'valorA1', 'valorN', 'valorR', 'valorAk'], event: 'input', handler: Progressao.blockPaTg },
    { ids: ['valorAn1', 'valorA11', 'valorN1', 'valorS1'], event: 'input', handler: Progressao.blockPaSg },
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

document.querySelector("#calcularButton").addEventListener("click", mostrarResultado);
document.getElementById("mostrarCalculo").addEventListener("click", mostrarConta);
document.querySelector("#deletarResult").addEventListener("click", deleteResultado);
document.getElementById("buttonDeleteCal").addEventListener("click", deleteCalculo);
document.querySelector(".clearHistory").addEventListener("click", clearHistory);

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

    [PAD, PGD, PHD].forEach(el => { if (el) el.style.display = "none"; });
    if (PADS) PADS.style.display = "none";

    if (this.value === "PA") {
        if (PAD) PAD.style.display = "block";
        if (PADS) PADS.style.display = "flex";
    } else if (this.value === "PG") {
        if (PGD) PGD.style.display = "block";
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
    updateHistory();
};