import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { Porcentagem  } from "./scripts/porcentagem.js";
import { Raiz } from "./scripts/raiz.js";
import { Bhaskara } from "./scripts/bhaskara.js";
import { Fatorial } from "./scripts/fatorial.js";
import { DuploFatorial } from "./scripts/duplofatorial.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";
import { Expressao } from "./scripts/expressão.js";
import { Funcao } from "./scripts/funcao.js";

const history = [];
let resposta = document.querySelector("#resultadoModificador");

function calcular() {
    const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
    let errorMessage = document.querySelector('#erroMensagem');
    let result, conta, resultado1, resultado2;

    errorMessage.innerHTML = "";

    if (!activeDiv) return errorMessage.innerHTML = "Nenhuma operação selecionada.";

    switch (activeDiv.id) {
        case 'eval-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Expressao.calcularExpressao());
            break;
        case 'raiz-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Raiz.calcularRaiz());
            break;
        case 'porcentagem-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Porcentagem.calcularPorcentagem());
            break;
        case 'bhaskara-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Bhaskara.calcularBhaskara());
            break;
        case 'fatorial-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Fatorial.calcularFatorial());
            break;
        case 'duplofatorial-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = DuploFatorial.calcularDuploFatorial());
            break;
        case 'pitagoras-trigonometria-div':
            ({ result, conta, resultado1, resultado2 } = Pitagoras.calcularTrigonometria());
            break;
        case 'logaritmo-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Logaritmo.calcularLog());
            break;
        case 'razaoeproporção-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = RazaoeProporcao.calcularRazaoEProporcao());
            break;
        case 'progressão-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Progressao.calcularProgressao());
            break;
        case 'funcao-div':
            ({ result, conta, resultado1 = '', resultado2 = '' } = Funcao.calcularFuncao());    
            break;                     
        default:
            errorMessage.innerHTML = "Operação não reconhecida ou inválida.";
            return { result, conta, resultado1, resultado2 };
    }

    return { result, conta, resultado1, resultado2 };
}

function mostrarCalculo(calculoId) {
    const divs = document.querySelectorAll('.calculo-div');
    let resposta = document.querySelector("#resultado");
    resposta.innerHTML = ''

    divs.forEach(div => {
        div.style.display = 'none';
    });

    const calculoDiv = document.getElementById(calculoId);
    calculoDiv.style.display = 'flex';

    if (calculoId === 'raiz-div') {
        const raizDiv = document.getElementById('raiz');
        raizDiv.style.display = 'flex';
        raizDiv.style.flexDirection = 'row';
        raizDiv.style.gap = '.5rem';
        raizDiv.style.alignItems = 'center';
        calculoDiv.style.flexDirection = 'column';
    } else if (calculoId === 'bhaskara-div') {
        calculoDiv.style.display = 'flex';
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.gap = '.5rem';
    } else if (calculoId === 'fatorial-div' || calculoId === 'porcentagem-div') {
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.alignItems = 'center'
        calculoDiv.style.justifyContent = 'center'
    } else if (calculoId === 'duplofatorial-div') {
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.alignItems = 'center'
        calculoDiv.style.justifyContent = 'center'
    } else {
        calculoDiv.style.flexDirection = 'column';
    }

    calculoDiv.style.gap = '.5rem';
}

function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
            deleteCalculo()
        });
    });
}

window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    updateHistory();
};

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
    let { result, resultado1, resultado2 } = calcular();
    let resposta = document.querySelector("#resultado");
    const calculoSelecionado = document.querySelector('.calculo-div[style*="display: flex"]').id;
    let razaoOuProporcao = document.querySelector("#razaoeproporção-select");

    let inputFaltando = null;

    if (calculoSelecionado === 'razaoeproporção-div' && razaoOuProporcao.value === 'razao') {
        inputFaltando = RazaoeProporcao.getInputFaltandoRazao();
    } else if (calculoSelecionado === 'pitagoras-trigonometria-div') {
        inputFaltando = Pitagoras.getInputFaltandoTrigonometria();
    } else if (calculoSelecionado === 'logaritmo-div') {
        inputFaltando = Logaritmo.getInputFaltandoLog();
    } else if (calculoSelecionado === 'progressão-div') {
        let selected = document.getElementById('tipoPA-select').value;
        if (selected === 'TG') {
            inputFaltando = Progressao.getInputFaltandoPaTg();
        } else if (selected === 'somaGeral') {
            inputFaltando = Progressao.getInputFaltandoPaSg();
        }
    }

    if (inputFaltando && result !== undefined) {
        let inputElements = document.querySelectorAll(`#${inputFaltando}`);
        inputElements.forEach(inputElement => {
            if (!inputElement) return;
            if (calculoSelecionado !== 'pitagoras-trigonometria-div') inputElement.value = result
            else {
                if (inputElement.id === 'angulo') {
                    inputElement.value = resultado1;
                    let inputElement2 = Pitagoras.getInputFaltandoTrigonometria();
                    if (inputElement2.id === 'valorA' || inputElement.id === 'valorB' || inputElement.id === 'valorC') {
                        inputElement2.value = resultado2;
                    }
                }
                if (inputElement.id === 'valorA' || inputElement.id === 'valorB' || inputElement.id === 'valorC') {
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
    let { conta } = calcular();
    let conta1 = document.querySelector("#conta1");
    let conta2 = document.querySelector(".contas");
    conta1.innerHTML = conta !== undefined ? `${conta}` : "";
    conta2.style.display = "flex"
}

function deleteCalculo() {
    let conta2 = document.querySelector(".contas");
    conta2.style.display = "none"
}

function deleteResultado() {
    const result = document.querySelector("#resultado");
    result.innerHTML = '';
}

document.getElementById("razaoeproporção-select").addEventListener("change", RazaoeProporcao.blockRazaoEProporcao);
document.querySelector("#calcularButton").addEventListener("click", mostrarResultado);
document.getElementById("mostrarCalculo").addEventListener("click", mostrarConta);
document.querySelector("#deletarResult").addEventListener("click", deleteResultado);
document.getElementById("buttonDeleteCal").addEventListener("click", deleteCalculo);
document.querySelector(".clearHistory").addEventListener("click", clearHistory);

document.getElementById('dropdownCalculos').addEventListener('click', function () {
    const calculoSection = document.getElementById('calculoContainer');

    if (calculoSection.style.display === 'none' || calculoSection.style.display === '') {
        calculoSection.style.display = 'flex';
        calculoSection.style.flexDirection = 'column';
    } else {
        calculoSection.style.display = 'none';
    }
});

document.getElementById("razaoeproporção-select").addEventListener("change", function () {
    const valorA = document.getElementById("valorAR");
    const valorB = document.getElementById("valorBR");
    const valorC = document.getElementById("valorCR");
    const valorD = document.getElementById("valorDR");
    valorA.value = '';
    valorB.value = '';
    valorC.value = '';
    valorD.value = '';
});

document.getElementById("tipoProgressão-select").addEventListener("change", function () {
    const PAD = document.querySelector("#PAD");
    const PGD = document.querySelector("#PGD");
    const PHD = document.querySelector("#PHD");
    const PADS = document.querySelector('#tipoPA-select');

    PAD.style.display = "none";
    PGD.style.display = "none";
    PHD.style.display = "none";

    if (this.value === "PA") {
        PAD.style.display = "block";
        PADS.style.display = "flex";
    } else if (this.value === "PG") {
        PGD.style.display = "block";
    } else if (this.value === "PH") {
        PHD.style.display = "block";
    } else {
        let errorMessage = document.querySelector('#erroMensagem');
        errorMessage.innerHTML = 'Selecione um cálculo válido';
    }
});

document.getElementById("tipoPA-select").addEventListener("change", function () {
    const TG = document.querySelector("#TG");
    const somaGeral = document.querySelector("#somaGeral");

    TG.style.display = "none";
    somaGeral.style.display = "none";

    if (this.value === "TG") {
        TG.style.display = "flex";
    } else if (this.value === "somaGeral") {
        somaGeral.style.display = "flex";
    }
});

document.getElementById("valorA").addEventListener("input", () => {
    Pitagoras.blockTrigonometria();
});

document.getElementById("valorB").addEventListener("input", () => {
    Pitagoras.blockTrigonometria();
});
document.getElementById("valorC").addEventListener("input", () => {
    Pitagoras.blockTrigonometria();
});
document.getElementById("angulo").addEventListener("input", () => {
    Pitagoras.blockTrigonometria();
});
document.getElementById("logaritmo").addEventListener("input", () => {
    Logaritmo.blockLogaritmo();
});

document.getElementById("logaritmando").addEventListener("input", () => {
    Logaritmo.blockLogaritmo();
});

document.getElementById("base").addEventListener("input", () => {
    Logaritmo.blockLogaritmo();
});

document.getElementById("valorAR").addEventListener("input", () => {
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById("valorBR").addEventListener("input", () => {
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById("valorCR").addEventListener("input", () => {
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById("valorDR").addEventListener("input", () => {
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById("valorAn").addEventListener("input", () => {
    Progressao.blockPaTg();
});

document.getElementById("valorA1").addEventListener("input", () => {
    Progressao.blockPaTg();
});

document.getElementById("valorN").addEventListener("input", () => {
    Progressao.blockPaTg();
});
document.getElementById("valorR").addEventListener("input", () => {
    Progressao.blockPaTg();
});
document.getElementById("valorAk").addEventListener("input", () => {
    Progressao.blockPaTg();
});
document.getElementById("valorAn1").addEventListener("input", () => {
    Progressao.blockPaSg();
});

document.getElementById("valorA11").addEventListener("input", () => {
    Progressao.blockPaSg();
});

document.getElementById("valorN1").addEventListener("input", () => {
    Progressao.blockPaSg();
});
document.getElementById("valorS1").addEventListener("input", () => {
    Progressao.blockPaSg();
});