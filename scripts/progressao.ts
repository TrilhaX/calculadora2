interface CalculoResultado {
    result: string;
    conta: string;
}

function getInputElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento com id "${id}" não encontrado.`);
    }
    return element as T;
}

function getNumberInputValue(id: string): number {
    const input = getInputElement<HTMLInputElement>(id);
    return parseFloat(input.value);
}

export class Progressao {
    static calcularProgressao(): CalculoResultado {
        const TPselected = (getInputElement<HTMLSelectElement>('tipoProgressão-select')).value;

        const valorA1 = getNumberInputValue('valorA1');
        const valorR = getNumberInputValue('valorR');
        const valorN = getNumberInputValue('valorN');
        const inputValorAn = getInputElement<HTMLInputElement>('valorAn');
        const inputValorAk = getInputElement<HTMLInputElement>('valorAk');
        const valorA11 = getNumberInputValue('valorA11');
        const valorN1 = getNumberInputValue('valorN1');
        const valorAn1 = getNumberInputValue('valorAn1');
        const inputValorS = getInputElement<HTMLInputElement>('valorS1');
        const valorA12 = getNumberInputValue('valorA12');
        const valorN2 = getNumberInputValue('valorN2');
        const valorQ2 = getNumberInputValue('valorQ2');
        const inputValorAn2 = getInputElement<HTMLInputElement>('valorAn2');
        const valorA13 = getNumberInputValue('valorA13');
        const valorQ = getNumberInputValue('valorQ');
        const valorN3 = getNumberInputValue('valorN3');
        const inputValorSn = getInputElement<HTMLInputElement>('valorSn');

        let resultado: number | null = null;
        let conta = '';

        if (TPselected === 'PA') {
            const selectedPA = (getInputElement<HTMLSelectElement>('tipoPA-select')).value;

            if (selectedPA === 'TG') {
                if (isNaN(valorA1) || isNaN(valorR) || isNaN(valorN)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA1 + (valorN - 1) * valorR;
                conta = `Termo Geral: Aₙ = ${valorA1} + (${valorN} - 1) * ${valorR}`;

                if (inputValorAn.value === "") {
                    inputValorAn.value = resultado.toFixed(2);
                    inputValorAn.disabled = false;
                } else if (inputValorAk.value === "") {
                    inputValorAk.value = resultado.toFixed(2);
                    inputValorAk.disabled = false;
                }
            } else if (selectedPA === 'somaGeral') {
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
        } else if (TPselected === 'PG') {
            const selectedPG = (getInputElement<HTMLSelectElement>('tipoPG-select')).value;

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
            } else if (selectedPG === 'somaGeral') {
                if (isNaN(valorA13) || isNaN(valorQ) || isNaN(valorN3)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                if (valorQ === 1) {
                    resultado = valorA13 * valorN3;
                    conta = `Soma dos Termos: Sₙ = ${valorA13} * ${valorN3}`;
                } else {
                    resultado = valorA13 * (Math.pow(valorQ, valorN3) - 1) / (valorQ - 1);
                    conta = `Soma dos Termos: Sₙ = ${valorA13} * ((${valorQ}^${valorN3} - 1) / (${valorQ} - 1))`;
                }

                if (inputValorSn.value === "") {
                    inputValorSn.value = resultado.toFixed(2);
                    inputValorSn.disabled = false;
                }
            }
        }

        const resultStr =
            resultado !== null && !isNaN(resultado) ? resultado.toFixed(2) : "NaN";
        return { result: resultStr, conta };
    }

    static getInputFaltandoPaTg(): string | null {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAn"),
            getInputElement<HTMLInputElement>("valorA1"),
            getInputElement<HTMLInputElement>("valorN"),
            getInputElement<HTMLInputElement>("valorR"),
        ];
        return inputs.find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPaSg(): string | null {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAk"),
            getInputElement<HTMLInputElement>("valorAn1"),
            getInputElement<HTMLInputElement>("valorA11"),
            getInputElement<HTMLInputElement>("valorN1"),
        ];
        return inputs.find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPGTg(): string | null {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAn2"),
            getInputElement<HTMLInputElement>("valorA12"),
            getInputElement<HTMLInputElement>("valorN2"),
            getInputElement<HTMLInputElement>("valorQ2"),
        ];
        return inputs.find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPGSg(): string | null {
        const inputs = [
            getInputElement<HTMLInputElement>("valorSn"),
            getInputElement<HTMLInputElement>("valorA13"),
            getInputElement<HTMLInputElement>("valorqN"),
            getInputElement<HTMLInputElement>("valorN3"),
            getInputElement<HTMLInputElement>("valorQ"),
        ];
        return inputs.find(input => input.value === "")?.id || null;
    }

    static blockPaTg(): void {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAn"),
            getInputElement<HTMLInputElement>("valorA1"),
            getInputElement<HTMLInputElement>("valorN"),
            getInputElement<HTMLInputElement>("valorR"),
            getInputElement<HTMLInputElement>("valorAk"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 4) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }

    static blockPaSg(): void {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAn1"),
            getInputElement<HTMLInputElement>("valorA11"),
            getInputElement<HTMLInputElement>("valorN1"),
            getInputElement<HTMLInputElement>("valorS1"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }

    static blockPGTg(): void {
        const inputs = [
            getInputElement<HTMLInputElement>("valorAn2"),
            getInputElement<HTMLInputElement>("valorA12"),
            getInputElement<HTMLInputElement>("valorN2"),
            getInputElement<HTMLInputElement>("valorQ2"),
        ];
        inputs.forEach(input => (input.disabled = false));
        const filledInputs = inputs.filter(input => input.value !== "").length;
        if (filledInputs >= 3) {
            inputs.forEach(input => {
                input.disabled = input.value === "";
            });
        }
    }

    static blockPGSg(): void {
        const inputs = [
            getInputElement<HTMLInputElement>("valorSn"),
            getInputElement<HTMLInputElement>("valorA13"),
            getInputElement<HTMLInputElement>("valorqN"),
            getInputElement<HTMLInputElement>("valorN3"),
            getInputElement<HTMLInputElement>("valorQ"),
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