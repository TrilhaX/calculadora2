import { Historico } from './historico.js';
import { Pitagoras } from './pitagoras.js';
import { Logaritmo } from './logaritmo.js';
import { Porcentagem } from './porcentagem.js';
import { Raiz } from './raiz.js';
import { Bhaskara } from './bhaskara.js';
import { Fatorial } from './fatorial.js';
import { DuploFatorial } from './duplofatorial.js';
import { RazaoeProporcao } from './razaoeproporcao.js';
import { Progressao } from './progressao.js';
import { Expressao } from './expressao.js';
import { Funcao } from './funcao.js';
import { Matriz } from './matriz.js';
import { Geometria } from './geometria.js';
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
export class Outros {
    static mostrarResultado() {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, conta } = Outros.calcular();
        if (result === undefined || result === null) {
            return;
        }
        const resposta = document.querySelector("#resultado");
        const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
        const activeDivId = activeDiv ? activeDiv.id : '';
        let inputFaltando = null;
        if (activeDivId === 'razaoeproporção-div') {
            const razaoOuProporcao = getElement("#razaoeproporção-select");
            if (razaoOuProporcao.value === 'razao') {
                inputFaltando = (_a = RazaoeProporcao.getInputFaltandoRazao()) !== null && _a !== void 0 ? _a : null;
            }
        }
        else if (activeDivId === 'pitagoras-trigonometria-div') {
            inputFaltando = (_b = Pitagoras.getInputFaltandoTrigonometria()) !== null && _b !== void 0 ? _b : null;
        }
        else if (activeDivId === 'logaritmo-div') {
            inputFaltando = (_c = Logaritmo.getInputFaltandoLog()) !== null && _c !== void 0 ? _c : null;
        }
        else if (activeDivId === 'progressão-div') {
            const selectedProgress = getElement('#tipoProgressão-select');
            if (selectedProgress.value === 'PA') {
                const selectedPA = getElement('#tipoPA-select');
                if (selectedPA.value === 'TG') {
                    inputFaltando = (_d = Progressao.getInputFaltandoPaTg()) !== null && _d !== void 0 ? _d : null;
                }
                else if (selectedPA.value === 'somaGeral') {
                    inputFaltando = (_e = Progressao.getInputFaltandoPaSg()) !== null && _e !== void 0 ? _e : null;
                }
            }
            else if (selectedProgress.value === 'PG') {
                const selectedPG = getElement('#tipoPG-select');
                if (selectedPG.value === 'TG') {
                    inputFaltando = (_f = Progressao.getInputFaltandoPGTg()) !== null && _f !== void 0 ? _f : null;
                }
                else if (selectedPG.value === 'somaGeral') {
                    inputFaltando = (_g = Progressao.getInputFaltandoPGSg()) !== null && _g !== void 0 ? _g : null;
                }
            }
        }
        if (inputFaltando) {
            if (Array.isArray(inputFaltando)) {
                inputFaltando.forEach(inputId => {
                    const inputElement = document.getElementById(inputId);
                    if (inputElement) {
                        inputElement.value = result.toString();
                        inputElement.disabled = false;
                    }
                });
            }
            else {
                const inputElement = document.getElementById(inputFaltando);
                if (inputElement) {
                    inputElement.value = result.toString();
                    inputElement.disabled = false;
                }
            }
        }
        if (resposta) {
            resposta.innerHTML = `Resultado: ${result}`;
        }
        if ((typeof result === "string" || !isNaN(Number(result)))) {
            const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
            savedHistory.push({ result, conta });
            localStorage.setItem('history', JSON.stringify(savedHistory));
            Historico.updateHistory();
        }
    }
    static mostrarConta() {
        const conta1 = getElement("#conta1");
        const conta2 = getElement(".contas");
        const contaButton = getElement("#mostrarCalculo");
        if (conta2.style.display === "none" || conta2.style.display === "") {
            conta1.innerHTML = Outros.calcular().conta || "Nenhuma Conta Definida";
            conta2.style.display = "flex";
            contaButton.textContent = "Fechar Conta";
        }
        else {
            conta2.style.display = "none";
            contaButton.textContent = "Mostrar Conta";
            conta1.innerHTML = "Nenhuma Conta Definida";
        }
    }
    static mostrarHistorico() {
        const historicoDiv = getElement(".historico");
        const historicoButton = getElement("#mostrarHistorico");
        if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
            historicoDiv.style.display = "block";
            historicoButton.innerHTML = "Fechar Historico";
        }
        else {
            historicoDiv.style.display = "none";
            historicoButton.innerHTML = "Mostrar Historico";
        }
    }
    static updateConta() {
        const conta1 = document.querySelector("#conta1");
        const { conta } = Outros.calcular();
        if (conta1) {
            conta1.innerHTML = conta ? conta : "Nenhuma conta definida.";
        }
    }
    static deleteResultado() {
        const resultElement = document.querySelector("#resultado");
        if (resultElement) {
            resultElement.innerHTML = '';
        }
    }
    static deleteConta() {
        const conta1 = document.querySelector("#conta1");
        const contaDiv = document.querySelector(".contas");
        if (conta1) {
            conta1.innerHTML = "";
        }
        if (contaDiv) {
            contaDiv.style.display = "none";
        }
    }
    static calcular() {
        const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
        const errorMessage = document.querySelector('#erroMensagem');
        if (errorMessage) {
            errorMessage.innerHTML = "";
        }
        if (!activeDiv) {
            if (errorMessage) {
                errorMessage.innerHTML = "Nenhuma operação selecionada.";
            }
            return { result: undefined, conta: "Nenhuma operação selecionada." };
        }
        const calculosMap = Outros.calculosMap();
        const calcularFunc = calculosMap[activeDiv.id];
        if (!calcularFunc) {
            if (errorMessage) {
                errorMessage.innerHTML = "Operação não suportada.";
            }
            return { result: undefined, conta: "Operação não suportada." };
        }
        try {
            return calcularFunc();
        }
        catch (error) {
            if (errorMessage) {
                errorMessage.innerHTML = "Erro ao realizar o cálculo. Verifique os valores de entrada.";
            }
            console.error(error);
            return { result: undefined, conta: "Erro ao realizar o cálculo." };
        }
    }
    static calculosMap() {
        return {
            'eval-div': () => {
                const { result, conta, resultado2 } = Expressao.calcularExpressao();
                return { result, conta, resultado2, resultado1: undefined };
            },
            'raiz-div': () => {
                const { result, conta } = Raiz.calcularRaiz();
                return { result, conta };
            },
            'porcentagem-div': () => {
                const { result, conta } = Porcentagem.calcularPorcentagem();
                return { result, conta };
            },
            'bhaskara-div': () => {
                const { result, conta } = Bhaskara.calcularBhaskara();
                return { result, conta };
            },
            'fatorial-div': () => {
                const { result, conta } = Fatorial.calcularFatorial();
                return { result, conta };
            },
            'duplofatorial-div': () => {
                const { result, conta } = DuploFatorial.calcularDuploFatorial();
                return { result, conta };
            },
            'pitagoras-trigonometria-div': () => {
                const { result, conta } = Pitagoras.calcularTrigonometria();
                return { result, conta };
            },
            'logaritmo-div': () => {
                const { result, conta } = Logaritmo.calcularLog();
                return { result, conta };
            },
            'razaoeproporção-div': () => {
                const { result, conta } = RazaoeProporcao.calcularRazaoEProporcao();
                return { result, conta };
            },
            'progressão-div': () => {
                const { result, conta } = Progressao.calcularProgressao();
                return { result, conta };
            },
            'funcao-div': () => {
                const { result, conta } = Funcao.calcularFuncao();
                return { result, conta };
            },
            'matriz-div': () => {
                const matrizSelect = document.getElementById("matriz-select");
                if (matrizSelect) {
                    const matrizSelected = matrizSelect.value;
                    return matrizSelected === "2x2" ? Matriz.matriz2x2() : Matriz.matriz3x3();
                }
                return { result: undefined, conta: "Erro: Selecione uma operação de matriz." };
            },
            'geometria-div': () => {
                const selectElement = document.querySelector("#geometria-select");
                const selectedOperation = selectElement.options[selectElement.selectedIndex].getAttribute("data-operation");
                let result;
                let conta;
                switch (selectedOperation) {
                    case 'perimetroCirculo':
                        ({ result, conta } = Geometria.perimetroCirculo());
                        break;
                    case 'areaCirculo':
                        ({ result, conta } = Geometria.areaCirculo());
                        break;
                    case 'perimetroRetangulo':
                        ({ result, conta } = Geometria.perimetroRetangulo());
                        break;
                    case 'areaRetangulo':
                        ({ result, conta } = Geometria.areaRetangulo());
                        break;
                    case 'perimetroTriangulo':
                        ({ result, conta } = Geometria.perimetroTriangulo());
                        break;
                    case 'areaTriangulo':
                        ({ result, conta } = Geometria.areaTriangulo());
                        break;
                    case 'areaTrianguloHero':
                        ({ result, conta } = Geometria.areaTrianguloHero());
                        break;
                    case 'areaTrapezio':
                        ({ result, conta } = Geometria.areaTrapezio());
                        break;
                    case 'areaParalelogramo':
                        ({ result, conta } = Geometria.areaParalelogramo());
                        break;
                    case 'areaLosango':
                        ({ result, conta } = Geometria.areaLosango());
                        break;
                    case 'perimetroQuadrado':
                        ({ result, conta } = Geometria.perimetroQuadrado());
                        break;
                    case 'areaQuadrado':
                        ({ result, conta } = Geometria.areaQuadrado());
                        break;
                    case 'volumeCubo':
                        ({ result, conta } = Geometria.volumeCubo());
                        break;
                    case 'volumeParalelepipedo':
                        ({ result, conta } = Geometria.volumeParalelepipedo());
                        break;
                    case 'areaEsfera':
                        ({ result, conta } = Geometria.areaEsfera());
                        break;
                    case 'volumeEsfera':
                        ({ result, conta } = Geometria.volumeEsfera());
                        break;
                    case 'areaCilindro':
                        ({ result, conta } = Geometria.areaCilindro());
                        break;
                    case 'volumeCilindro':
                        ({ result, conta } = Geometria.volumeCilindro());
                        break;
                    case 'areaCone':
                        ({ result, conta } = Geometria.areaCone());
                        break;
                    case 'volumeCone':
                        ({ result, conta } = Geometria.volumeCone());
                        break;
                    default:
                        result = "Selecione uma operação válida.";
                        conta = "Operação inválida.";
                        break;
                }
                return { result, conta };
            },
        };
    }
}
