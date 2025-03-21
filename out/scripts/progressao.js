function getInputElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento com id "${id}" não encontrado.`);
    }
    return element;
}
function getNumberInputValue(id) {
    const input = getInputElement(id);
    return parseFloat(input.value);
}
export class Progressao {
    static calcularProgressao() {
        const TPselected = (getInputElement('tipoProgressão-select')).value;
        const valorA1 = getNumberInputValue('valorA1');
        const valorR = getNumberInputValue('valorR');
        const valorN = getNumberInputValue('valorN');
        const inputValorAn = getInputElement('valorAn');
        const inputValorAk = getInputElement('valorAk');
        const valorA11 = getNumberInputValue('valorA11');
        const valorN1 = getNumberInputValue('valorN1');
        const valorAn1 = getNumberInputValue('valorAn1');
        const inputValorS = getInputElement('valorS1');
        const valorA12 = getNumberInputValue('valorA12');
        const valorN2 = getNumberInputValue('valorN2');
        const valorQ2 = getNumberInputValue('valorQ2');
        const inputValorAn2 = getInputElement('valorAn2');
        const valorA13 = getNumberInputValue('valorA13');
        const valorQ = getNumberInputValue('valorQ');
        const valorN3 = getNumberInputValue('valorN3');
        const inputValorSn = getInputElement('valorSn');
        let resultado = null;
        let conta = '';
        if (TPselected === 'PA') {
            const selectedPA = (getInputElement('tipoPA-select')).value;
            if (selectedPA === 'TG') {
                if (isNaN(valorA1) || isNaN(valorR) || isNaN(valorN)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA1 + (valorN - 1) * valorR;
                conta = `Termo Geral: Aₙ = ${valorA1} + (${valorN} - 1) * ${valorR}`;
                if (inputValorAn.value === "") {
                    inputValorAn.value = resultado.toFixed(2);
                    inputValorAn.disabled = false;
                }
                else if (inputValorAk.value === "") {
                    inputValorAk.value = resultado.toFixed(2);
                    inputValorAk.disabled = false;
                }
            }
            else if (selectedPA === 'somaGeral') {
                if (isNaN(valorA11) || isNaN(valorAn1) || isNaN(valorN1)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                conta = `Soma dos Termos: Sₙ = (${valorN1} / 2) * (${valorA11} + ${valorAn1})`;
                if (inputValorS.value === "") {
                    inputValorS.value = resultado.toFixed(2);
                    inputValorS.disabled = false;
                }
            }
        }
        else if (TPselected === 'PG') {
            const selectedPG = (getInputElement('tipoPG-select')).value;
            if (selectedPG === 'TG') {
                if (isNaN(valorA12) || isNaN(valorQ2) || isNaN(valorN2)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA12 * Math.pow(valorQ2, valorN2 - 1);
                conta = `Termo Geral: Aₙ = ${valorA12} * ${valorQ2}^(${valorN2} - 1)`;
                if (inputValorAn2.value === "") {
                    inputValorAn2.value = resultado.toFixed(2);
                    inputValorAn2.disabled = false;
                }
            }
            else if (selectedPG === 'somaGeral') {
                if (isNaN(valorA13) || isNaN(valorQ) || isNaN(valorN3)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                if (valorQ === 1) {
                    resultado = valorA13 * valorN3;
                    conta = `Soma dos Termos: Sₙ = ${valorA13} * ${valorN3}`;
                }
                else {
                    resultado = valorA13 * (Math.pow(valorQ, valorN3) - 1) / (valorQ - 1);
                    conta = `Soma dos Termos: Sₙ = ${valorA13} * ((${valorQ}^${valorN3} - 1) / (${valorQ} - 1))`;
                }
                if (inputValorSn.value === "") {
                    inputValorSn.value = resultado.toFixed(2);
                    inputValorSn.disabled = false;
                }
            }
        }
        const resultStr = resultado !== null && !isNaN(resultado) ? resultado.toFixed(2) : "NaN";
        return { result: resultStr, conta };
    }
    static getInputFaltandoPaTg() {
        var _a;
        const inputs = [
            getInputElement("valorAn"),
            getInputElement("valorA1"),
            getInputElement("valorN"),
            getInputElement("valorR"),
        ];
        return ((_a = inputs.find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPaSg() {
        var _a;
        const inputs = [
            getInputElement("valorAk"),
            getInputElement("valorAn1"),
            getInputElement("valorA11"),
            getInputElement("valorN1"),
        ];
        return ((_a = inputs.find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPGTg() {
        var _a;
        const inputs = [
            getInputElement("valorAn2"),
            getInputElement("valorA12"),
            getInputElement("valorN2"),
            getInputElement("valorQ2"),
        ];
        return ((_a = inputs.find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static getInputFaltandoPGSg() {
        var _a;
        const inputs = [
            getInputElement("valorSn"),
            getInputElement("valorA13"),
            getInputElement("valorqN"),
            getInputElement("valorN3"),
            getInputElement("valorQ"),
        ];
        return ((_a = inputs.find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    static blockPaTg() {
        const inputs = [
            getInputElement("valorAn"),
            getInputElement("valorA1"),
            getInputElement("valorN"),
            getInputElement("valorR"),
            getInputElement("valorAk"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 4) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPaSg() {
        const inputs = [
            getInputElement("valorAn1"),
            getInputElement("valorA11"),
            getInputElement("valorN1"),
            getInputElement("valorS1"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPGTg() {
        const inputs = [
            getInputElement("valorAn2"),
            getInputElement("valorA12"),
            getInputElement("valorN2"),
            getInputElement("valorQ2"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
    static blockPGSg() {
        const inputs = [
            getInputElement("valorSn"),
            getInputElement("valorA13"),
            getInputElement("valorqN"),
            getInputElement("valorN3"),
            getInputElement("valorQ"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 4) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }
}
