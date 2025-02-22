import { Outros } from './scripts/outros.js'
import { Historico } from './scripts/historico.js'
import { Pitagoras } from "./scripts/pitagoras.js";
import { Logaritmo } from "./scripts/logaritmo.js";
import { RazaoeProporcao } from "./scripts/razaoeproporcao.js";
import { Progressao } from "./scripts/progressao.js";

interface inputEventListeners {
    ids: string[];
    event: string;
    handler: (event: Event) => void;
}

enum TipoProgressao {
    PA = "PA",
    PG = "PG",
    PH = "PH"
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

function configurarBotoes(): void {
    const botoes: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#calculoLista button');
    botoes.forEach((botao: HTMLButtonElement) => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
        });
    });
}

function mostrarCalculo(calculoId: any): void {
    const divs: NodeListOf<HTMLDivElement> = document.querySelectorAll('.calculo-div');
    const resposta: HTMLElement | null = document.querySelector("#resultado");
    if (resposta) resposta.innerHTML = '';

    divs.forEach((div: HTMLDivElement) => div.style.display = 'none');

    const calculoDiv: HTMLElement | null = document.getElementById(calculoId);
    if (calculoDiv) {calculoDiv.style.display = 'flex'; calculoDiv.style.gap = '.5rem';}

    const container: HTMLDivElement | null = document.querySelector(".container");
    if (container) {container.style.alignItems = ''; container.style.justifyContent = '';}

    if (calculoId === 'raiz-div') {
        const raizDiv: HTMLElement | null = document.getElementById('raiz');
        if (raizDiv && calculoDiv) {raizDiv.style.display = 'flex'; raizDiv.style.flexDirection = 'row'; raizDiv.style.gap = '.5rem'; raizDiv.style.alignItems = 'center'; calculoDiv.style.flexDirection = 'column';}
    } else if (calculoId === 'bhaskara-div') {
        if (calculoDiv) {calculoDiv.style.flexDirection = 'row';}
    } else if (['fatorial-div', 'porcentagem-div', 'duplofatorial-div'].includes(calculoId)) {
        if (calculoDiv){calculoDiv.style.flexDirection = 'row'; calculoDiv.style.alignItems = 'center'; calculoDiv.style.justifyContent = 'center';}
    } else {
        if (calculoDiv){calculoDiv.style.flexDirection = 'column';}
    }

    if (calculoId === 'porcentagem-div' || calculoId === 'bhaskara-div') {
        if (container) {container.style.display = 'flex'; container.style.alignItems = 'center'; container.style.justifyContent = 'center';}
    }
}

function typeOfPa(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const tg = document.querySelector<HTMLElement>("#PGD .TG");
    const somaGeral = document.querySelector<HTMLElement>("#PGD .somaGeral");

    tg?.style.setProperty("display", "none");
    somaGeral?.style.setProperty("display", "none");

    if (selectElement.value === "TG"){tg?.style.setProperty("display", "flex");}
    if (selectElement.value === "somaGeral"){somaGeral?.style.setProperty("display", "flex");}
}

function typeOfPG(event: Event) {
    const selectedPg = event.target as HTMLSelectElement
    const tg = document.querySelector<HTMLElement>("#PGD .TG");
    const somaGeral = document.querySelector<HTMLElement>("#PGD .somaGeral");

    tg?.style.setProperty("Display","none");
    somaGeral?.style.setProperty("display","none");

    if (selectedPg.value == "TG") tg?.style.setProperty("display","flex");
    if (selectedPg.value == "somaGeral") somaGeral?.style.setProperty("display","flex");
}

function typeOfMatriz(event: Event) {
    const selectedMatriz = event.target as HTMLSelectElement;
    const matriz2x2: HTMLElement | null = document.getElementById("matriz2x2");
    const matriz3x3: HTMLElement | null = document.getElementById("matriz3x3");

    if (selectedMatriz){
        if (selectedMatriz.value === "2x2") {matriz2x2?.style.setProperty("display", "block"); matriz3x3?.style.setProperty("display", "none")};
        if(selectedMatriz.value === "3x3") {matriz2x2?.style.setProperty("display", "none"); matriz3x3?.style.setProperty("display", "flex")};
    }
}

document.getElementById("razaoeproporção-select")?.addEventListener("change", function () {
    ['valorAR', 'valorBR', 'valorCR', 'valorDR'].forEach(id => {
        const input: HTMLInputElement | any = document.getElementById(id);
        if (input) input.value = '';
    });
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById('dropdownCalculos')?.addEventListener('click', function () {
    const calculoSection: HTMLElement | null = document.getElementById('calculoContainer');
    if (calculoSection){
        if (!calculoSection.style.display || calculoSection.style.display === 'none') {calculoSection.style.display = 'flex'; calculoSection.style.flexDirection = 'column';}
        else {calculoSection.style.display = 'none';}
    }
});

document.getElementById("tipoProgressão-select")?.addEventListener("change", function (this: HTMLSelectElement) {
    const PAD = document.querySelector("#PAD");
    const PGD = document.querySelector("#PGD");
    const PHD = document.querySelector("#PHD");
    const PADS = document.querySelector("#tipoPA-select");
    const PGDS = document.querySelector("#tipoPG-select");
    const errorMessage = document.querySelector("#erroMensagem");

    [PAD, PGD, PHD, PADS, PGDS].forEach(el => {
        if (el) el.classList.add("hidden");
    });

    if (errorMessage) errorMessage.innerHTML = '';

    switch (this.value as TipoProgressao) {
        case TipoProgressao.PA:
            if (PAD) PAD.classList.remove("hidden");
            if (PADS) PADS.classList.remove("hidden");
            break;
        case TipoProgressao.PG:
            if (PGD) PGD.classList.remove("hidden");
            if (PGDS) PGDS.classList.remove("hidden");
            break;
        case TipoProgressao.PH:
            if (PHD) PHD.classList.remove("hidden");
            break;
        default:
            if (errorMessage) errorMessage.innerHTML = 'Selecione um cálculo válido';
            break;
    }
});

document.getElementById("tipoPA-select")?.addEventListener("change", typeOfPa);
document.getElementById("tipoPG-select")?.addEventListener("change", typeOfPG);
document.querySelector("#calcularButton")?.addEventListener("click", Outros.mostrarResultado);
document.getElementById("mostrarCalculo")?.addEventListener("click", Outros.mostrarConta);
document.getElementById("mostrarHistorico")?.addEventListener("click", Outros.mostrarHistorico);
document.getElementById("calcularButton")?.addEventListener("click", Outros.mostrarConta);
document.getElementById("calcularButton")?.addEventListener("click", Outros.updateConta);
document.querySelector("#deletarResult")?.addEventListener("click", Outros.deleteResultado);
document.querySelector(".clearHistory")?.addEventListener("click", Historico.clearHistory);
document.getElementById("matriz-select")?.addEventListener("change", typeOfMatriz)

window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    Historico.updateHistory();
};