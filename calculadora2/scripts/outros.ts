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

type CalculoResult = {
    result: string | number | null | undefined;
    conta: string;
    resultado1?: string | number | null;
    resultado2?: string | number | null;
};

export class Outros {
    static mostrarResultado(): void {
        interface CalculoSelecionado {
            id: string;
        }

        const { result, conta, resultado1, resultado2 } = Outros.calcular();
        if (!result){
            return
        }
        const resposta = document.querySelector("#resultado") as HTMLElement | null;
        const idElemento = document.querySelector('.calculo-div[style*="display: flex"]');
        const idcs = idElemento ? idElemento.id : null;
        const calculoSelecionado: CalculoSelecionado = {
            id: idcs || ''
        };
        const razaoOuProporcao = document.querySelector("#razaoeproporção-select") as HTMLSelectElement | null;
        let inputFaltando: string | string[] | null = null;

        if (calculoSelecionado.id === 'razaoeproporção-div' && razaoOuProporcao?.value === 'razao') {
            inputFaltando = RazaoeProporcao.getInputFaltandoRazao() ?? null;
        } else if (calculoSelecionado.id === 'pitagoras-trigonometria-div') {
            inputFaltando = Pitagoras.getInputFaltandoTrigonometria() ?? null;
        } else if (calculoSelecionado.id === 'logaritmo-div') {
            inputFaltando = Logaritmo.getInputFaltandoLog() ?? null;
        } else if (calculoSelecionado.id === 'progressão-div') {
            const selectedProgress = document.getElementById('tipoProgressão-select') as HTMLSelectElement | null;
            if (selectedProgress) {
                if (selectedProgress.value === 'PA') {
                    const selectedPA = document.getElementById('tipoPA-select') as HTMLSelectElement | null;
                    if (selectedPA) {
                        if (selectedPA.value === 'TG') {
                            inputFaltando = Progressao.getInputFaltandoPaTg() ?? null;
                        } else if (selectedPA.value === 'somaGeral') {
                            inputFaltando = Progressao.getInputFaltandoPaSg() ?? null;
                        }
                    }
                } else if (selectedProgress.value === 'PG') {
                    const selectedPG = document.getElementById('tipoPG-select') as HTMLSelectElement | null;
                    if (selectedPG) {
                        if (selectedPG.value === 'TG') {
                            inputFaltando = Progressao.getInputFaltandoPGTg() ?? null;
                        } else if (selectedPG.value === 'somaGeral') {
                            inputFaltando = Progressao.getInputFaltandoPGSg() ?? null;
                        }
                    }
                }
            }
        }

        if (inputFaltando && result !== undefined) {
            if (Array.isArray(inputFaltando)) {
                inputFaltando.forEach(inputId => {
                    const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
                    if (inputElement) {
                        inputElement.value = result.toString();
                        inputElement.disabled = false;
                    }
                });
            } else {
                const inputElement = document.getElementById(inputFaltando) as HTMLInputElement | null;
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
        const conta1 = document.querySelector("#conta1") as HTMLElement | null;
        const conta2 = document.querySelector(".contas") as HTMLElement | null;
        const contaButton = document.querySelector("#mostrarCalculo") as HTMLElement | null;
    
        if (!conta1 || !conta2 || !contaButton) {
            console.error("Elementos não encontrados!");
            return;
        }
    
        if (conta2.style.display === "none" || conta2.style.display === "") {
            conta1.innerHTML = conta || "Nenhuma Conta Definida";
            conta2.style.display = "flex";
            contaButton.textContent = "Fechar Conta";
        } else {
            conta2.style.display = "none";
            contaButton.textContent = "Mostrar Conta";
            conta1.innerHTML = "Nenhuma Conta Definida";
        }
    }

    static mostrarHistorico() {
        const historicoDiv = document.querySelector(".historico") as HTMLElement | null;
        const historicoButton = document.querySelector("#mostrarHistorico") as HTMLElement | null;
        if (historicoDiv && historicoButton) {
            if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
                historicoDiv.style.display = "block";
                historicoButton.innerHTML = "Fechar Historico";
            } else {
                historicoDiv.style.display = "none";
                historicoButton.innerHTML = "Mostrar Historico";
            }
        }
    }

    static updateConta() {
        const { conta } = Outros.calcular();
        const conta1 = document.querySelector("#conta1") as HTMLElement | null;

        if (conta1) {
            conta1.innerHTML = conta !== undefined && conta !== null ? `${conta}` : "Nenhuma conta definida.";
        }
    }

    static deleteResultado() {
        const result = document.querySelector("#resultado") as HTMLElement | null;
        if (result) {
            result.innerHTML = '';
        }
    }

    static calcular(): CalculoResult {
        const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
        const errorMessage = document.querySelector('#erroMensagem') as HTMLElement | null;

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
        const calcularFunc = calculosMap[activeDiv.id as keyof typeof calculosMap];

        if (!calcularFunc) {
            if (errorMessage) {
                errorMessage.innerHTML = "Operação não suportada.";
            }
            return { result: undefined, conta: "Operação não suportada.", resultado1: undefined, resultado2: undefined };
        }

        try {
            const { result, conta, resultado1, resultado2 } = calcularFunc();
            return { result, conta, resultado1, resultado2 };
        } catch (error) {
            if (errorMessage) {
                errorMessage.innerHTML = "Erro ao realizar o cálculo. Verifique os valores de entrada.";
            }
            console.error(error);
            return { result: undefined, conta: "Erro ao realizar o cálculo.", resultado1: undefined, resultado2: undefined };
        }
    }

    static calculosMap(): Record<string, () => CalculoResult> {
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
                const matrizSelect = document.getElementById("matriz-select") as HTMLSelectElement | null;
                if (matrizSelect) {
                    const matrizSelected = matrizSelect.value;
                    return matrizSelected === "2x2" ? Matriz.matriz2x2() : Matriz.matriz3x3();
                }
                return { result: undefined, conta: "Erro: Selecione uma operação de matriz.", resultado1: undefined, resultado2: undefined };
            },
        };
    }
}