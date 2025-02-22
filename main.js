var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
import { Outros } from './scripts/outros.js';
import { Historico } from './scripts/historico.js';
import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";
var TipoProgressao;
(function (TipoProgressao) {
    TipoProgressao["PA"] = "PA";
    TipoProgressao["PG"] = "PG";
    TipoProgressao["PH"] = "PH";
})(TipoProgressao || (TipoProgressao = {}));
const inputEventListeners = [
    { ids: ['valorA', 'valorB', 'valorC', 'angulo'], event: 'input', handler: Pitagoras.blockTrigonometria },
    { ids: ['logaritmo', 'logaritmando', 'base'], event: 'input', handler: Logaritmo.blockLogaritmo },
    { ids: ['valorAR', 'valorBR', 'valorCR', 'valorDR'], event: 'input', handler: RazaoeProporcao.blockRazaoEProporcao },
    { ids: ['valorAn', 'valorA1', 'valorN', 'valorR', 'valorAk'], event: 'input', handler: Progressao.blockPaTg },
    { ids: ['valorAn1', 'valorA11', 'valorN1', 'valorS1'], event: 'input', handler: Progressao.blockPaSg },
    { ids: ['valorAn2', 'valorA12', 'valorN2', 'valorQ2'], event: 'input', handler: Progressao.blockPGTg },
    { ids: ['valorSn', 'valorA13', 'valorqN', 'valorN3', 'valorQ'], event: 'input', handler: Progressao.blockPGSg },
];
inputEventListeners.forEach(({ ids, event, handler }) => {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element)
            element.addEventListener(event, handler);
    });
});
function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
        });
    });
}
function mostrarCalculo(calculoId) {
    const divs = document.querySelectorAll('.calculo-div');
    const resposta = document.querySelector("#resultado");
    if (resposta)
        resposta.innerHTML = '';
    divs.forEach((div) => div.style.display = 'none');
    const calculoDiv = document.getElementById(calculoId);
    if (calculoDiv) {
        calculoDiv.style.display = 'flex';
        calculoDiv.style.gap = '.5rem';
    }
    const container = document.querySelector(".container");
    if (container) {
        container.style.alignItems = '';
        container.style.justifyContent = '';
    }
    if (calculoId === 'raiz-div') {
        const raizDiv = document.getElementById('raiz');
        if (raizDiv && calculoDiv) {
            raizDiv.style.display = 'flex';
            raizDiv.style.flexDirection = 'row';
            raizDiv.style.gap = '.5rem';
            raizDiv.style.alignItems = 'center';
            calculoDiv.style.flexDirection = 'column';
        }
    }
    else if (calculoId === 'bhaskara-div') {
        if (calculoDiv) {
            calculoDiv.style.flexDirection = 'row';
        }
    }
    else if (['fatorial-div', 'porcentagem-div', 'duplofatorial-div'].includes(calculoId)) {
        if (calculoDiv) {
            calculoDiv.style.flexDirection = 'row';
            calculoDiv.style.alignItems = 'center';
            calculoDiv.style.justifyContent = 'center';
        }
    }
    else {
        if (calculoDiv) {
            calculoDiv.style.flexDirection = 'column';
        }
    }
    if (calculoId === 'porcentagem-div' || calculoId === 'bhaskara-div') {
        if (container) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
        }
    }
}
function typeOfPa(event) {
    const selectElement = event.target;
    const tg = document.querySelector("#PGD .TG");
    const somaGeral = document.querySelector("#PGD .somaGeral");
    tg === null || tg === void 0 ? void 0 : tg.style.setProperty("display", "none");
    somaGeral === null || somaGeral === void 0 ? void 0 : somaGeral.style.setProperty("display", "none");
    if (selectElement.value === "TG") {
        tg === null || tg === void 0 ? void 0 : tg.style.setProperty("display", "flex");
    }
    if (selectElement.value === "somaGeral") {
        somaGeral === null || somaGeral === void 0 ? void 0 : somaGeral.style.setProperty("display", "flex");
    }
}
function typeOfPG(event) {
    const selectedPg = event.target;
    const tg = document.querySelector("#PGD .TG");
    const somaGeral = document.querySelector("#PGD .somaGeral");
    tg === null || tg === void 0 ? void 0 : tg.style.setProperty("Display", "none");
    somaGeral === null || somaGeral === void 0 ? void 0 : somaGeral.style.setProperty("display", "none");
    if (selectedPg.value == "TG")
        tg === null || tg === void 0 ? void 0 : tg.style.setProperty("display", "flex");
    if (selectedPg.value == "somaGeral")
        somaGeral === null || somaGeral === void 0 ? void 0 : somaGeral.style.setProperty("display", "flex");
}
function typeOfMatriz(event) {
    const selectedMatriz = event.target;
    const matriz2x2 = document.getElementById("matriz2x2");
    const matriz3x3 = document.getElementById("matriz3x3");
    if (selectedMatriz) {
        if (selectedMatriz.value === "2x2") {
            matriz2x2 === null || matriz2x2 === void 0 ? void 0 : matriz2x2.style.setProperty("display", "block");
            matriz3x3 === null || matriz3x3 === void 0 ? void 0 : matriz3x3.style.setProperty("display", "none");
        }
        ;
        if (selectedMatriz.value === "3x3") {
            matriz2x2 === null || matriz2x2 === void 0 ? void 0 : matriz2x2.style.setProperty("display", "none");
            matriz3x3 === null || matriz3x3 === void 0 ? void 0 : matriz3x3.style.setProperty("display", "flex");
        }
        ;
    }
}
(_a = document.getElementById("razaoeproporção-select")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
    ['valorAR', 'valorBR', 'valorCR', 'valorDR'].forEach(id => {
        const input = document.getElementById(id);
        if (input)
            input.value = '';
    });
    RazaoeProporcao.blockRazaoEProporcao();
});
(_b = document.getElementById('dropdownCalculos')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    const calculoSection = document.getElementById('calculoContainer');
    if (calculoSection) {
        if (!calculoSection.style.display || calculoSection.style.display === 'none') {
            calculoSection.style.display = 'flex';
            calculoSection.style.flexDirection = 'column';
        }
        else {
            calculoSection.style.display = 'none';
        }
    }
});
(_c = document.getElementById("tipoProgressão-select")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", function () {
    const PAD = document.querySelector("#PAD");
    const PGD = document.querySelector("#PGD");
    const PHD = document.querySelector("#PHD");
    const PADS = document.querySelector("#tipoPA-select");
    const PGDS = document.querySelector("#tipoPG-select");
    const errorMessage = document.querySelector("#erroMensagem");
    [PAD, PGD, PHD, PADS, PGDS].forEach(el => {
        if (el)
            el.classList.add("hidden");
    });
    if (errorMessage)
        errorMessage.innerHTML = '';
    switch (this.value) {
        case TipoProgressao.PA:
            if (PAD)
                PAD.classList.remove("hidden");
            if (PADS)
                PADS.classList.remove("hidden");
            break;
        case TipoProgressao.PG:
            if (PGD)
                PGD.classList.remove("hidden");
            if (PGDS)
                PGDS.classList.remove("hidden");
            break;
        case TipoProgressao.PH:
            if (PHD)
                PHD.classList.remove("hidden");
            break;
        default:
            if (errorMessage)
                errorMessage.innerHTML = 'Selecione um cálculo válido';
            break;
    }
});
(_d = document.getElementById("tipoPA-select")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", typeOfPa);
(_e = document.getElementById("tipoPG-select")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", typeOfPG);
(_f = document.querySelector("#calcularButton")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", Outros.mostrarResultado);
(_g = document.getElementById("mostrarCalculo")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", Outros.mostrarConta);
(_h = document.getElementById("mostrarHistorico")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", Outros.mostrarHistorico);
(_j = document.getElementById("calcularButton")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", Outros.mostrarConta);
(_k = document.getElementById("calcularButton")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", Outros.updateConta);
(_l = document.querySelector("#deletarResult")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", Outros.deleteResultado);
(_m = document.querySelector(".clearHistory")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", Historico.clearHistory);
(_o = document.getElementById("matriz-select")) === null || _o === void 0 ? void 0 : _o.addEventListener("change", typeOfMatriz);
window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    Historico.updateHistory();
};
