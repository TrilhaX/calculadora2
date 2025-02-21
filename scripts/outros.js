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
import { Expressao } from './expressão.js';
import { Funcao } from './funcao.js';
import { Matriz } from './matriz.js';
export class Outros{
    static mostrarResultado() {
        const { result, conta, resultado1, resultado2 } = Outros.calcular();
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
            const selectedProgress = document.getElementById('tipoProgressão-select').value;
            if (selectedProgress === 'PA') {
                const selectedPA = document.getElementById('tipoPA-select').value;
                if (selectedPA === 'TG') {
                    inputFaltando = Progressao.getInputFaltandoPaTg();
                } else if (selectedPA === 'somaGeral') {
                    inputFaltando = Progressao.getInputFaltandoPaSg();
                }
            }else if (selectedProgress === 'PG') {
                const selectedPG = document.getElementById('tipoPG-select').value;
                if (selectedPG === 'TG') {
                    inputFaltando = Progressao.getInputFaltandoPGTg();
                } else if (selectedPG === 'somaGeral') {
                    inputFaltando = Progressao.getInputFaltandoPGSg();
                }
            }else if (selectedProgress === 'PH'){
    
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
        
        if (result !== undefined && (typeof result === "string" || !isNaN(result))) {
            const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
            savedHistory.push({ result, conta });
            localStorage.setItem('history', JSON.stringify(savedHistory));
            Historico.updateHistory();
        }
    }

    static mostrarConta() {
        const { conta } = Outros.calcular();
        const conta1 = document.querySelector("#conta1");
        const conta2 = document.querySelector(".contas");
        const contaButton = document.querySelector("#mostrarCalculo")
        conta1.innerHTML = "Nenhuma Conta Definida"
        if (conta !== undefined && conta !== null && conta !== "" && conta2.style.display == "none") {
            conta1.innerHTML = conta;
            conta2.style.display = "flex";
            contaButton.innerHTML = "Fechar Conta"
        } else if (conta2.style.display == "flex") {
            conta2.style.display = "none";
            contaButton.innerHTML = "Mostrar Conta"
        }else{
            conta1.innerHTML = "Nenhuma conta definida.";
        }
    }    
    
    static mostrarHistorico() {
        const historicoDiv = document.querySelector(".historico");
        const historicoButton = document.querySelector("#mostrarHistorico")
        if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
            historicoDiv.style.display = "block";
            historicoButton.innerHTML = "Fechar Historico"
        } else {
            historicoDiv.style.display = "none";
            historicoButton.innerHTML = "Mostrar Historico"
        }
    }      

    static updateConta() {
        const { conta } = Outros.calcular();
        const conta1 = document.querySelector("#conta1");
        const conta2 = document.querySelector(".contas");
        if (conta !== undefined && conta !== null && conta !== "") {
            const { conta } = Outros.calcular();
            const conta1 = document.querySelector("#conta1");
            conta1.innerHTML = conta !== undefined ? `${conta}` : "";
        } else {
            conta1.innerHTML = "Nenhuma conta definida.";
            conta2.style.display = "none";
        }
    }
    
    static deleteResultado() {
        const result = document.querySelector("#resultado");
        result.innerHTML = '';
    }

    static calcular() {
        const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
        const errorMessage = document.querySelector('#erroMensagem');
        errorMessage.innerHTML = "";
        const calcularFunc = Outros.calculosMap()[activeDiv.id];

        if (!activeDiv) {
            errorMessage.innerHTML = "Nenhuma operação selecionada.";
            return {};
        }
        if (!calcularFunc) {
            errorMessage.innerHTML = "Operação não reconhecida ou inválida.";
            return {};
        }

        const { result, conta, resultado1, resultado2 } = calcularFunc();
        return { result, conta, resultado1, resultado2 };
    }

    static calculosMap(){
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
        return calculosMap
    }
}