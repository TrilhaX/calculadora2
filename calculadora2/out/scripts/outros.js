import { Historico } from '../out/scripts/historico.js';
import { Pitagoras } from '../out/scripts/pitagoras.js';
import { Logaritmo } from '../out/scripts/logaritmo.js';
import { Porcentagem } from '../out/scripts/porcentagem.js';
import { Raiz } from '../out/scripts/raiz.js';
import { Bhaskara } from '../out/scripts/bhaskara.js';
import { Fatorial } from '../out/scripts/fatorial.js';
import { DuploFatorial } from '../out/scripts/duplofatorial.js';
import { RazaoeProporcao } from '../out/scripts/razaoeproporcao.js';
import { Progressao } from '../out/scripts/progressao.js';
import { Expressao } from '../out/scripts/expressao.js';
import { Funcao } from '../out/scripts/funcao.js';
import { Matriz } from '../out/scripts/matriz.js';
export class Outros {
    static mostrarResultado() {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, conta, resultado1, resultado2 } = Outros.calcular();
        if (!result) {
            return;
        }
        const resposta = document.querySelector("#resultado");
        const idElemento = document.querySelector('.calculo-div[style*="display: flex"]');
        const idcs = idElemento ? idElemento.id : null;
        const calculoSelecionado = {
            id: idcs || ''
        };
        const razaoOuProporcao = document.querySelector("#razaoeproporção-select");
        let inputFaltando = null;
        if (calculoSelecionado.id === 'razaoeproporção-div' && (razaoOuProporcao === null || razaoOuProporcao === void 0 ? void 0 : razaoOuProporcao.value) === 'razao') {
            inputFaltando = (_a = RazaoeProporcao.getInputFaltandoRazao()) !== null && _a !== void 0 ? _a : null;
        }
        else if (calculoSelecionado.id === 'pitagoras-trigonometria-div') {
            inputFaltando = (_b = Pitagoras.getInputFaltandoTrigonometria()) !== null && _b !== void 0 ? _b : null;
        }
        else if (calculoSelecionado.id === 'logaritmo-div') {
            inputFaltando = (_c = Logaritmo.getInputFaltandoLog()) !== null && _c !== void 0 ? _c : null;
        }
        else if (calculoSelecionado.id === 'progressão-div') {
            const selectedProgress = document.getElementById('tipoProgressão-select');
            if (selectedProgress) {
                if (selectedProgress.value === 'PA') {
                    const selectedPA = document.getElementById('tipoPA-select');
                    if (selectedPA) {
                        if (selectedPA.value === 'TG') {
                            inputFaltando = (_d = Progressao.getInputFaltandoPaTg()) !== null && _d !== void 0 ? _d : null;
                        }
                        else if (selectedPA.value === 'somaGeral') {
                            inputFaltando = (_e = Progressao.getInputFaltandoPaSg()) !== null && _e !== void 0 ? _e : null;
                        }
                    }
                }
                else if (selectedProgress.value === 'PG') {
                    const selectedPG = document.getElementById('tipoPG-select');
                    if (selectedPG) {
                        if (selectedPG.value === 'TG') {
                            inputFaltando = (_f = Progressao.getInputFaltandoPGTg()) !== null && _f !== void 0 ? _f : null;
                        }
                        else if (selectedPG.value === 'somaGeral') {
                            inputFaltando = (_g = Progressao.getInputFaltandoPGSg()) !== null && _g !== void 0 ? _g : null;
                        }
                    }
                }
            }
        }
        if (inputFaltando && result !== undefined) {
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
            resposta.innerHTML = result !== undefined && result !== null ? `Resultado: ${result}` : "";
        }
        if (result !== undefined && result !== null && (typeof result === "string" || !isNaN(Number(result)))) {
            const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
            savedHistory.push({ result, conta });
            localStorage.setItem('history', JSON.stringify(savedHistory));
            Historico.updateHistory();
        }
    }
    static mostrarConta() {
        const { conta } = Outros.calcular();
        const conta1 = document.querySelector("#conta1");
        const conta2 = document.querySelector(".contas");
        const contaButton = document.querySelector("#mostrarCalculo");
        if (!conta1 || !conta2 || !contaButton) {
            console.error("Elementos não encontrados!");
            return;
        }
        if (conta2.style.display === "none" || conta2.style.display === "") {
            conta1.innerHTML = conta || "Nenhuma Conta Definida";
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
        const historicoDiv = document.querySelector(".historico");
        const historicoButton = document.querySelector("#mostrarHistorico");
        if (historicoDiv && historicoButton) {
            if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
                historicoDiv.style.display = "block";
                historicoButton.innerHTML = "Fechar Historico";
            }
            else {
                historicoDiv.style.display = "none";
                historicoButton.innerHTML = "Mostrar Historico";
            }
        }
    }
    static updateConta() {
        const { conta } = Outros.calcular();
        const conta1 = document.querySelector("#conta1");
        if (conta1) {
            conta1.innerHTML = conta !== undefined && conta !== null ? `${conta}` : "Nenhuma conta definida.";
        }
    }
    static deleteResultado() {
        const result = document.querySelector("#resultado");
        if (result) {
            result.innerHTML = '';
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
            return { result: undefined, conta: "Nenhuma operação selecionada.", resultado1: undefined, resultado2: undefined };
        }
        const calculosMap = Outros.calculosMap();
        const calcularFunc = calculosMap[activeDiv.id];
        if (!calcularFunc) {
            if (errorMessage) {
                errorMessage.innerHTML = "Operação não suportada.";
            }
            return { result: undefined, conta: "Operação não suportada.", resultado1: undefined, resultado2: undefined };
        }
        try {
            const { result, conta, resultado1, resultado2 } = calcularFunc();
            return { result, conta, resultado1, resultado2 };
        }
        catch (error) {
            if (errorMessage) {
                errorMessage.innerHTML = "Erro ao realizar o cálculo. Verifique os valores de entrada.";
            }
            console.error(error);
            return { result: undefined, conta: "Erro ao realizar o cálculo.", resultado1: undefined, resultado2: undefined };
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
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'porcentagem-div': () => {
                const { result, conta } = Porcentagem.calcularPorcentagem();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'bhaskara-div': () => {
                const { result, conta } = Bhaskara.calcularBhaskara();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'fatorial-div': () => {
                const { result, conta } = Fatorial.calcularFatorial();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'duplofatorial-div': () => {
                const { result, conta } = DuploFatorial.calcularDuploFatorial();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'pitagoras-trigonometria-div': () => {
                const { result, conta } = Pitagoras.calcularTrigonometria();
                return { result, conta, };
            },
            'logaritmo-div': () => {
                const { result, conta } = Logaritmo.calcularLog();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'razaoeproporção-div': () => {
                const { result, conta } = RazaoeProporcao.calcularRazaoEProporcao();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'progressão-div': () => {
                const { result, conta } = Progressao.calcularProgressao();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'funcao-div': () => {
                const { result, conta } = Funcao.calcularFuncao();
                return { result, conta, resultado1: undefined, resultado2: undefined };
            },
            'matriz-div': () => {
                const matrizSelect = document.getElementById("matriz-select");
                if (matrizSelect) {
                    const matrizSelected = matrizSelect.value;
                    return matrizSelected === "2x2" ? Matriz.matriz2x2() : Matriz.matriz3x3();
                }
                return { result: undefined, conta: "Erro: Selecione uma operação de matriz.", resultado1: undefined, resultado2: undefined };
            },
        };
    }
}
