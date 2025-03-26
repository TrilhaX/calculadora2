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

type CalculoResult = {
    result: string | number | null | undefined;
    conta: string;
    resultado1?: string | number | null;
    resultado2?: string | number | null;
};

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element as T;
}

export class Outros {
    static mostrarResultado(): void {
        const { result, conta } = Outros.calcular();
        if (result === undefined || result === null) {
            return;
        }

        const resposta = document.querySelector("#resultado") as HTMLElement | null;
        const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
        const activeDivId = activeDiv ? activeDiv.id : '';

        let inputFaltando: string | string[] | null = null;
        if (activeDivId === 'razaoeproporção-div') {
            const razaoOuProporcao = getElement<HTMLSelectElement>("#razaoeproporção-select");
            if (razaoOuProporcao.value === 'razao') {
                inputFaltando = RazaoeProporcao.getInputFaltandoRazao() ?? null;
            }
        } else if (activeDivId === 'pitagoras-trigonometria-div') {
            inputFaltando = Pitagoras.getInputFaltandoTrigonometria() ?? null;
        } else if (activeDivId === 'logaritmo-div') {
            inputFaltando = Logaritmo.getInputFaltandoLog() ?? null;
        } else if (activeDivId === 'progressão-div') {
            const selectedProgress = getElement<HTMLSelectElement>('#tipoProgressão-select');
            if (selectedProgress.value === 'PA') {
                const selectedPA = getElement<HTMLSelectElement>('#tipoPA-select');
                if (selectedPA.value === 'TG') {
                    inputFaltando = Progressao.getInputFaltandoPaTg() ?? null;
                } else if (selectedPA.value === 'somaGeral') {
                    inputFaltando = Progressao.getInputFaltandoPaSg() ?? null;
                }
            } else if (selectedProgress.value === 'PG') {
                const selectedPG = getElement<HTMLSelectElement>('#tipoPG-select');
                if (selectedPG.value === 'TG') {
                    inputFaltando = Progressao.getInputFaltandoPGTg() ?? null;
                } else if (selectedPG.value === 'somaGeral') {
                    inputFaltando = Progressao.getInputFaltandoPGSg() ?? null;
                }
            }
        }

        if (inputFaltando) {
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
            resposta.innerHTML = `Resultado: ${result}`;
        }

        if ((typeof result === "string" || !isNaN(Number(result)))) {
            const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
            savedHistory.push({ result, conta });
            localStorage.setItem('history', JSON.stringify(savedHistory));
            Historico.updateHistory();
        }
    }

    static mostrarConta(): void {
        const conta1 = getElement<HTMLElement>("#conta1");
        const conta2 = getElement<HTMLElement>(".contas");
        const contaButton = getElement<HTMLElement>("#mostrarCalculo");

        if (conta2.style.display === "none" || conta2.style.display === "") {
            conta1.innerHTML = Outros.calcular().conta || "Nenhuma Conta Definida";
            conta2.style.display = "flex";
            contaButton.textContent = "Fechar Conta";
        } else {
            conta2.style.display = "none";
            contaButton.textContent = "Mostrar Conta";
            conta1.innerHTML = "Nenhuma Conta Definida";
        }
    }

    static mostrarHistorico(): void {
        const historicoDiv = getElement<HTMLElement>(".historico");
        const historicoButton = getElement<HTMLElement>("#mostrarHistorico");

        if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
            historicoDiv.style.display = "block";
            historicoButton.innerHTML = "Fechar Historico";
        } else {
            historicoDiv.style.display = "none";
            historicoButton.innerHTML = "Mostrar Historico";
        }
    }

    static updateConta(): void {
        const conta1 = document.querySelector("#conta1") as HTMLElement | null;
        const { conta } = Outros.calcular();
        if (conta1) {
            conta1.innerHTML = conta ? conta : "Nenhuma conta definida.";
        }
    }

    static deleteResultado(): void {
        const resultElement = document.querySelector("#resultado") as HTMLElement | null;
        if (resultElement) {
            resultElement.innerHTML = '';
        }
    }

    static deleteConta(): void {
        const conta1 = document.querySelector("#conta1") as HTMLElement | null;
        const contaDiv = document.querySelector(".contas") as HTMLElement | null;
    
        if (conta1) {
            conta1.innerHTML = "";
        }
    
        if (contaDiv) {
            contaDiv.style.display = "none";
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
            return { result: undefined, conta: "Nenhuma operação selecionada." };
        }

        const calculosMap = Outros.calculosMap();
        const calcularFunc = calculosMap[activeDiv.id as keyof typeof calculosMap];

        if (!calcularFunc) {
            if (errorMessage) {
                errorMessage.innerHTML = "Operação não suportada.";
            }
            return { result: undefined, conta: "Operação não suportada." };
        }

        try {
            return calcularFunc();
        } catch (error) {
            if (errorMessage) {
                errorMessage.innerHTML = "Erro ao realizar o cálculo. Verifique os valores de entrada.";
            }
            console.error(error);
            return { result: undefined, conta: "Erro ao realizar o cálculo." };
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
                Funcao.atualizarGrafico();
                const { result, conta } = Funcao.calcularFuncao();
                return { result, conta };
            },
            'matriz-div': () => {
                const matrizSelect = document.getElementById("matriz-select") as HTMLSelectElement | null;
                if (matrizSelect) {
                    const matrizSelected = matrizSelect.value;
                    return matrizSelected === "2x2" ? Matriz.matriz2x2() : Matriz.matriz3x3();
                }
                return { result: undefined, conta: "Erro: Selecione uma operação de matriz." };
            },
            'geometria-div': () => {
                const selectElement = document.querySelector("#geometria-select") as HTMLSelectElement;
                const selectedOperation = selectElement.options[selectElement.selectedIndex].getAttribute("data-operation");
    
                let result: string | number | null | undefined;
                let conta: string;
    
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