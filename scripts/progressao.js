export class Progressao {
    static calcularProgressao() {
        // Obtém os valores dos inputs
        const TPselected = document.getElementById('tipoProgressão-select').value;
        const valorA1 = parseFloat(document.getElementById('valorA1').value);
        const valorR = parseFloat(document.getElementById('valorR').value);
        const valorN = parseFloat(document.getElementById('valorN').value);
        const valorAn = parseFloat(document.getElementById('valorAn').value);
        const valorAk = parseFloat(document.getElementById('valorAk').value);
        const valorA11 = parseFloat(document.getElementById('valorA11').value);
        const valorN1 = parseFloat(document.getElementById('valorN1').value);
        const valorAn1 = parseFloat(document.getElementById('valorAn1').value);
        const valorS = parseFloat(document.getElementById('valorS1').value);
        // Verifica se todos os valores necessários estão presentes
        if (isNaN(valorA1) || isNaN(valorR) || isNaN(valorN) || isNaN(valorAn) || isNaN(valorAk) ||
            isNaN(valorA11) || isNaN(valorN1) || isNaN(valorAn1) || isNaN(valorS)) {
            return { result: "NaN", conta: "Entrada inválida: todos os campos devem ser preenchidos." };
        }
        let resultado = null;
        let conta = '';
        if (TPselected === 'PA') {
            const selectedPA = document.getElementById('tipoPA-select').value;
            if (selectedPA === 'TG') {
                // Cálculo do termo geral da PA
                if (!isNaN(valorA1) && !isNaN(valorR) && !isNaN(valorN)) {
                    resultado = valorA1 + (valorN - 1) * valorR;
                    conta = `Termo Geral: Aₙ = A₁ + (n - 1) * R`;
                }
            }
            else if (selectedPA === 'somaGeral') {
                // Cálculo da soma dos termos da PA
                if (!isNaN(valorA11) && !isNaN(valorAn1) && !isNaN(valorN1)) {
                    resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                    conta = `Soma dos termos: Sₙ = (n / 2) * (A₁ + Aₙ)`;
                }
            }
        }
        else if (TPselected === 'PG') {
            const selectedPG = document.getElementById('tipoPG-select').value;
            if (selectedPG === 'TG') {
                // Cálculo do termo geral da PG
                const valorQ = parseFloat(document.getElementById('valorQ').value);
                if (!isNaN(valorA1) && !isNaN(valorQ) && !isNaN(valorN)) {
                    resultado = valorA1 * Math.pow(valorQ, valorN - 1);
                    conta = `Termo Geral: Aₙ = A₁ * q^(n - 1)`;
                }
            }
            else if (selectedPG === 'somaGeral') {
                // Cálculo da soma dos termos da PG
                const valorQ = parseFloat(document.getElementById('valorQ').value);
                if (!isNaN(valorA1) && !isNaN(valorQ) && !isNaN(valorN)) {
                    if (valorQ === 1) {
                        resultado = valorA1 * valorN;
                        conta = `Soma dos termos: Sₙ = A₁ * n`;
                    }
                    else {
                        resultado = valorA1 * (Math.pow(valorQ, valorN) - 1) / (valorQ - 1);
                        conta = `Soma dos termos: Sₙ = A₁ * (qⁿ - 1) / (q - 1)`;
                    }
                }
            }
        }
        // Formata o resultado ou retorna "NaN" se o cálculo não for possível
        const result = resultado !== null && !isNaN(resultado) ? resultado.toFixed(2) : "NaN";
        return { result, conta };
    }
    static getInputFaltandoPaTg() {
        var _a;
        const valorAn = document.getElementById("valorAn");
        const valorA1 = document.getElementById("valorA1");
        const valorN = document.getElementById("valorN");
        const valorR = document.getElementById("valorR");
        return ((_a = [valorAn, valorA1, valorN, valorR]
            .find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPaSg() {
        var _a;
        const valorAk = document.getElementById("valorAk");
        const valorAn1 = document.getElementById("valorAn1");
        const valorA11 = document.getElementById("valorA11");
        const valorN1 = document.getElementById("valorN1");
        return ((_a = [valorAk, valorAn1, valorA11, valorN1]
            .find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPGTg() {
        var _a;
        const valorAn2 = document.getElementById("valorAn2");
        const valorA12 = document.getElementById("valorA12");
        const valorN2 = document.getElementById("valorN2");
        const valorQ2 = document.getElementById("valorQ2");
        return ((_a = [valorAn2, valorA12, valorN2, valorQ2]
            .find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPGSg() {
        var _a;
        const valorSn = document.getElementById("valorSn");
        const valorA13 = document.getElementById("valorA13");
        const valorqN = document.getElementById("valorqN");
        const valorN3 = document.getElementById("valorN3");
        const valorQ = document.getElementById("valorQ");
        return ((_a = [valorSn, valorA13, valorqN, valorN3, valorQ]
            .find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static blockPaTg() {
        const inputs = [
            document.getElementById("valorAn"),
            document.getElementById("valorA1"),
            document.getElementById("valorN"),
            document.getElementById("valorR"),
            document.getElementById("valorAk"),
        ];
        const filledInputs = inputs.filter(input => input.value !== "").length;
        inputs.forEach(input => {
            input.disabled = false;
        });
        if (filledInputs >= 4) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPaSg() {
        const inputs = [
            document.getElementById("valorAn1"),
            document.getElementById("valorA11"),
            document.getElementById("valorN1"),
            document.getElementById("valorS1"),
        ];
        const filledInputs = inputs.filter(input => input.value !== "").length;
        inputs.forEach(input => {
            input.disabled = false;
        });
        if (filledInputs >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPGTg() {
        const inputs = [
            document.getElementById("valorAn2"),
            document.getElementById("valorA12"),
            document.getElementById("valorN2"),
            document.getElementById("valorQ2"),
        ];
        const filledInputsPGTG = inputs.filter(input => input.value !== "").length;
        inputs.forEach(input => {
            input.disabled = false;
        });
        if (filledInputsPGTG >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPGSg() {
        const inputs = [
            document.getElementById("valorSn"),
            document.getElementById("valorA13"),
            document.getElementById("valorqN"),
            document.getElementById("valorN3"),
            document.getElementById("valorQ"),
        ];
        const filledInputsPG2 = inputs.filter(input => input.value !== "").length;
        console.log(filledInputsPG2);
        inputs.forEach(input => {
            input.disabled = false;
        });
        if (filledInputsPG2 >= 4) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
}
