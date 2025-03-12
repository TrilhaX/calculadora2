var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
import { Outros } from './scripts/outros.js';
import { Historico } from './scripts/historico.js';
import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";
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
        }
        else if (calculoId === 'bhaskara-div') {
            calculoDiv.style.flexDirection = 'row';
        }
        else if (['fatorial-div', 'porcentagem-div', 'duplofatorial-div'].includes(calculoId)) {
            calculoDiv.style.flexDirection = 'row';
            calculoDiv.style.alignItems = 'center';
            calculoDiv.style.justifyContent = 'center';
        }
        else {
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
}
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
(_a = document.getElementById("razaoeproporção-select")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
    ['valorAR', 'valorBR', 'valorCR', 'valorDR'].forEach(id => {
        const input = document.getElementById(id);
        if (input)
            input.value = '';
    });
    RazaoeProporcao.blockRazaoEProporcao();
});
(_b = document.getElementById("mostrarCalculo")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", Outros.mostrarConta);
(_c = document.getElementById("mostrarHistorico")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", Outros.mostrarHistorico);
(_d = document.querySelector("#deletarResult")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", Outros.deleteResultado);
(_e = document.querySelector(".clearHistory")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", Historico.clearHistory);
(_f = document.querySelector("#calcularButton")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    Outros.mostrarResultado();
    Outros.updateConta();
});
(_g = document.getElementById('dropdownCalculos')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () {
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
(_h = document.getElementById("tipoProgressão-select")) === null || _h === void 0 ? void 0 : _h.addEventListener("change", function () {
    const PAD = document.getElementById("PAD");
    const PGD = document.getElementById("PGD");
    const PHD = document.getElementById("PHD");
    const tipoPASelect = document.getElementById("tipoPA-select");
    const tipoPGSelect = document.getElementById("tipoPG-select");
    [PAD, PGD, PHD].forEach((el) => {
        if (el)
            el.style.display = "none";
    });
    if (tipoPASelect)
        tipoPASelect.style.display = "none";
    if (tipoPGSelect)
        tipoPGSelect.style.display = "none";
    const select = this;
    if (select.value === "PA") {
        if (PAD)
            PAD.style.display = "block";
        if (tipoPASelect)
            tipoPASelect.style.display = "flex";
    }
    else if (select.value === "PG") {
        if (PGD)
            PGD.style.display = "block";
        if (tipoPGSelect)
            tipoPGSelect.style.display = "flex";
    }
    else if (select.value === "PH") {
        if (PHD)
            PHD.style.display = "block";
    }
    else {
        const erroMensagem = document.getElementById("erroMensagem");
        if (erroMensagem)
            erroMensagem.innerHTML = 'Selecione um cálculo válido';
    }
});
(_j = document.getElementById("tipoPA-select")) === null || _j === void 0 ? void 0 : _j.addEventListener("change", function () {
    const termoGeralPA = document.getElementById("TG");
    const somaGeralPA = document.getElementById("somaGeral");
    if (termoGeralPA)
        termoGeralPA.style.display = "none";
    if (somaGeralPA)
        somaGeralPA.style.display = "none";
    const select = this;
    if (select.value === "TG") {
        if (termoGeralPA)
            termoGeralPA.style.display = "block";
    }
    else if (select.value === "somaGeral") {
        if (somaGeralPA)
            somaGeralPA.style.display = "block";
    }
});
(_k = document.getElementById("tipoPG-select")) === null || _k === void 0 ? void 0 : _k.addEventListener("change", function () {
    const termoGeralPG = document.querySelector(".TG");
    const somaGeralPG = document.querySelector(".somaGeral");
    if (termoGeralPG)
        termoGeralPG.style.display = "none";
    if (somaGeralPG)
        somaGeralPG.style.display = "none";
    const select = this;
    if (select.value === "TG") {
        if (termoGeralPG)
            termoGeralPG.style.display = "block";
    }
    else if (select.value === "somaGeral") {
        if (somaGeralPG)
            somaGeralPG.style.display = "block";
    }
});
(_l = document.getElementById("matriz-select")) === null || _l === void 0 ? void 0 : _l.addEventListener("change", () => {
    const matriz2x2 = document.getElementById("matriz2x2");
    const matriz3x3 = document.getElementById("matriz3x3");
    const matrizSelected = document.getElementById("matriz-select");
    if (matrizSelected.value === "2x2") {
        if (matriz2x2)
            matriz2x2.style.display = "block";
        if (matriz3x3)
            matriz3x3.style.display = "none";
    }
    else if (matrizSelected.value === "3x3") {
        if (matriz2x2)
            matriz2x2.style.display = "none";
        if (matriz3x3)
            matriz3x3.style.display = "block";
    }
});
window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    Historico.updateHistory();
};
