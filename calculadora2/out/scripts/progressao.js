export class Progressao {
    static calcularProgressao() {
        const TPselected = document.getElementById('tipoProgressão-select').value;
        const valorA1 = parseFloat(document.getElementById('valorA1').value);
        const valorR = parseFloat(document.getElementById('valorR').value);
        const valorN = parseFloat(document.getElementById('valorN').value);
        const valorAn = document.getElementById('valorAn');
        const valorAk = document.getElementById('valorAk');
        const valorA11 = parseFloat(document.getElementById('valorA11').value);
        const valorN1 = parseFloat(document.getElementById('valorN1').value);
        const valorAn1 = parseFloat(document.getElementById('valorAn1').value);
        const valorS = document.getElementById('valorS1');
        const valorAn2 = document.getElementById('valorAn2');
        const valorA12 = parseFloat(document.getElementById('valorA12').value);
        const valorN2 = parseFloat(document.getElementById('valorN2').value);
        const valorQ2 = parseFloat(document.getElementById('valorQ2').value);
        const valorSn = document.getElementById('valorSn');
        const valorA13 = parseFloat(document.getElementById('valorA13').value);
        const valorqN = parseFloat(document.getElementById('valorqN').value);
        const valorN3 = parseFloat(document.getElementById('valorN3').value);
        const valorQ = parseFloat(document.getElementById('valorQ').value);
        let resultado = null;
        let conta = '';
        if (TPselected === 'PA') {
            const selectedPA = document.getElementById('tipoPA-select').value;
            if (selectedPA === 'TG') {
                if (isNaN(valorA1) || isNaN(valorR) || isNaN(valorN)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA1 + (valorN - 1) * valorR;
                conta = `Termo Geral: Aₙ = ${valorA1} + (${valorN} - 1) * ${valorR}`;
                if (valorAn.value === "") {
                    valorAn.value = resultado.toFixed(2);
                    valorAn.disabled = false;
                }
                else if (valorAk.value === "") {
                    valorAk.value = resultado.toFixed(2);
                    valorAk.disabled = false;
                }
            }
            else if (selectedPA === 'somaGeral') {
                if (isNaN(valorA11) || isNaN(valorAn1) || isNaN(valorN1)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                conta = `Soma dos termos: Sₙ = (${valorN1} / 2) * (${valorA11} + ${valorAn1})`;
                if (valorS.value === "") {
                    valorS.value = resultado.toFixed(2);
                    valorS.disabled = false;
                }
            }
        }
        else if (TPselected === 'PG') {
            const selectedPG = document.getElementById('tipoPG-select').value;
            if (selectedPG === 'TG') {
                if (isNaN(valorA12) || isNaN(valorQ2) || isNaN(valorN2)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA12 * Math.pow(valorQ2, valorN2 - 1);
                conta = `Termo Geral: Aₙ = ${valorA12} * ${valorQ2}^(${valorN2} - 1)`;
                if (valorAn2.value === "") {
                    valorAn2.value = resultado.toFixed(2);
                    valorAn2.disabled = false;
                }
            }
            else if (selectedPG === 'somaGeral') {
                if (isNaN(valorA13) || isNaN(valorQ) || isNaN(valorN3)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                if (valorQ === 1) {
                    resultado = valorA13 * valorN3;
                    conta = `Soma dos termos: Sₙ = ${valorA13} * ${valorN3}`;
                }
                else {
                    resultado = valorA13 * (Math.pow(valorQ, valorN3) - 1) / (valorQ - 1);
                    conta = `Soma dos termos: Sₙ = ${valorA13} * (${valorQ}^${valorN3} - 1) / (${valorQ} - 1)`;
                }
                if (valorSn.value === "") {
                    valorSn.value = resultado.toFixed(2);
                    valorSn.disabled = false;
                }
            }
        }
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
