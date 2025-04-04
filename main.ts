import { Historico } from './scripts/historico.js';
import { Outros } from './scripts/outros.js';
import { Pitagoras } from './scripts/pitagoras.js';
import { Logaritmo } from './scripts/logaritmo.js';
import { RazaoeProporcao } from './scripts/razaoeproporcao.js';
import { Progressao } from './scripts/progressao.js';

interface InputEventListener {
    ids: string[];
    event: string;
    handler: (event: Event) => void;
}

function configurarBotoes(): void {
    const botoes = document.querySelectorAll<HTMLButtonElement>('#calculoLista button');
    botoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            mostrarCalculo(`${botao.value}-div`);
        });
    });
}

function mostrarCalculo(calculoId: string): void {
    const divs = document.querySelectorAll<HTMLElement>('.calculo-div');
    const resposta = document.querySelector<HTMLElement>("#resultado");
    if (resposta) resposta.innerHTML = '';

    divs.forEach(div => div.style.display = 'none');

    const calculoDiv = document.getElementById(calculoId);
    if (calculoDiv) {
        calculoDiv.style.display = 'flex';
        calculoDiv.style.gap = '.5rem';

        const container = document.querySelector<HTMLElement>(".container");
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

        if (['porcentagem-div', 'bhaskara-div'].includes(calculoId)) {
            if (container) {
                container.style.display = 'flex';
                container.style.alignItems = 'center';
                container.style.justifyContent = 'center';
            }
        }
    }
}

function mostrarGrafico(){
    const canvas = document.getElementById('graficoCanvas') as HTMLCanvasElement;
    const displayCanvas = canvas.style.display
    const button = document.getElementById('mostrarGrafico') as HTMLButtonElement;
    if (displayCanvas == 'none') {
        canvas.style.display = 'flex';
        button.innerHTML = "Fechar Grafico";
    }else{
        canvas.style.display = 'none';
        button.innerHTML = "Mostrar Grafico";
    }
}

const inputEventListeners: InputEventListener[] = [
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

document.getElementById("razaoeproporção-select")?.addEventListener("change", function () {
    ['valorAR', 'valorBR', 'valorCR', 'valorDR'].forEach(id => {
        const input: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement;
        if (input) input.value = '';
    });
    RazaoeProporcao.blockRazaoEProporcao();
});

document.getElementById("mostrarCalculo")?.addEventListener("click", Outros.mostrarConta);
document.getElementById("mostrarGrafico")?.addEventListener("click", mostrarGrafico);
document.getElementById("mostrarHistorico")?.addEventListener("click", Outros.mostrarHistorico);
document.querySelector("#deletarResult")?.addEventListener("click", Outros.deleteResultado);
document.querySelector(".clearHistory")?.addEventListener("click", Historico.clearHistory);

document.querySelector("#calcularButton")?.addEventListener("click", () => {
    Outros.mostrarResultado();
    Outros.updateConta();
});

document.getElementById('dropdownCalculos')?.addEventListener('click', function () {
    const calculoSection: HTMLElement | null = document.getElementById('calculoContainer');
    if (calculoSection) {
        if (!calculoSection.style.display || calculoSection.style.display === 'none') {
            calculoSection.style.display = 'flex';
            calculoSection.style.flexDirection = 'column';
        } else {
            calculoSection.style.display = 'none';
        }
    }
});

document.getElementById("tipoProgressão-select")?.addEventListener("change", function () {
    const PAD: HTMLElement | null = document.getElementById("PAD");
    const PGD: HTMLElement | null = document.getElementById("PGD");
    const PHD: HTMLElement | null = document.getElementById("PHD");
    const tipoPASelect: HTMLElement | null = document.getElementById("tipoPA-select");
    const tipoPGSelect: HTMLElement | null = document.getElementById("tipoPG-select");

    [PAD, PGD, PHD].forEach((el: HTMLElement | null) => {
        if (el) el.style.display = "none";
    });

    if (tipoPASelect) tipoPASelect.style.display = "none";
    if (tipoPGSelect) tipoPGSelect.style.display = "none";

    const select = this as HTMLSelectElement;
    if (select.value === "PA") {
        if (PAD) PAD.style.display = "block";
        if (tipoPASelect) tipoPASelect.style.display = "flex";
    } else if (select.value === "PG") {
        if (PGD) PGD.style.display = "block";
        if (tipoPGSelect) tipoPGSelect.style.display = "flex";
    } else if (select.value === "PH") {
        if (PHD) PHD.style.display = "block";
    } else {
        const erroMensagem: HTMLElement | null = document.getElementById("erroMensagem");
        if (erroMensagem) erroMensagem.innerHTML = 'Selecione um cálculo válido';
    }
});

document.getElementById("tipoPA-select")?.addEventListener("change", function () {
    const termoGeralPA: HTMLElement | null = document.getElementById("TG");
    const somaGeralPA: HTMLElement | null = document.getElementById("somaGeral");

    if (termoGeralPA) termoGeralPA.style.display = "none";
    if (somaGeralPA) somaGeralPA.style.display = "none";

    const select = this as HTMLSelectElement;
    if (select.value === "TG") {
        if (termoGeralPA) termoGeralPA.style.display = "block";
    } else if (select.value === "somaGeral") {
        if (somaGeralPA) somaGeralPA.style.display = "block";
    }
});

document.getElementById("tipoPG-select")?.addEventListener("change", function () {
    const termoGeralPG: HTMLElement | null = document.querySelector(".TG");
    const somaGeralPG: HTMLElement | null = document.querySelector(".somaGeral");

    if (termoGeralPG) termoGeralPG.style.display = "none";
    if (somaGeralPG) somaGeralPG.style.display = "none";

    const select = this as HTMLSelectElement;
    if (select.value === "TG") {
        if (termoGeralPG) termoGeralPG.style.display = "block";
    } else if (select.value === "somaGeral") {
        if (somaGeralPG) somaGeralPG.style.display = "block";
    }
});

document.getElementById("matriz-select")?.addEventListener("change", () => {
    const matriz2x2: HTMLElement | null = document.getElementById("matriz2x2");
    const matriz3x3: HTMLElement | null = document.getElementById("matriz3x3");
    const matrizSelected: HTMLSelectElement = document.getElementById("matriz-select") as HTMLSelectElement;

    if (matrizSelected.value === "2x2") {
        if (matriz2x2) matriz2x2.style.display = "block";
        if (matriz3x3) matriz3x3.style.display = "none";
    } else if (matrizSelected.value === "3x3") {
        if (matriz2x2) matriz2x2.style.display = "none";
        if (matriz3x3) matriz3x3.style.display = "block";
    }
});

document.getElementById("geometria-select")?.addEventListener("change", function (this: HTMLSelectElement) {
    const selectedFormula: string = this.value;
    const allInputs: NodeListOf<HTMLElement> = document.querySelectorAll(".formula-inputs");

    allInputs.forEach((input: HTMLElement) => {
        input.style.display = "none";
    });

    if (selectedFormula) {
        const selectedInputs: HTMLElement | null = document.getElementById(`${selectedFormula}-inputs`);
        if (selectedInputs) {
            selectedInputs.style.display = "block";
        }
    }
});

window.onload = (): void => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    Historico.updateHistory();
};