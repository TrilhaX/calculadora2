export class Progressao {
    static calcularProgressao(): { result: string; conta: string } {
        const TPselected = (document.getElementById('tipoProgressão-select') as HTMLSelectElement).value;
        const valorA1 = parseFloat((document.getElementById('valorA1') as HTMLInputElement).value);
        const valorR = parseFloat((document.getElementById('valorR') as HTMLInputElement).value);
        const valorN = parseFloat((document.getElementById('valorN') as HTMLInputElement).value);
        const valorAn = document.getElementById('valorAn') as HTMLInputElement;
        const valorAk = document.getElementById('valorAk') as HTMLInputElement;
        const valorA11 = parseFloat((document.getElementById('valorA11') as HTMLInputElement).value);
        const valorN1 = parseFloat((document.getElementById('valorN1') as HTMLInputElement).value);
        const valorAn1 = parseFloat((document.getElementById('valorAn1') as HTMLInputElement).value);
        const valorS = document.getElementById('valorS1') as HTMLInputElement;
        const valorAn2 = document.getElementById('valorAn2') as HTMLInputElement;
        const valorA12 = parseFloat((document.getElementById('valorA12') as HTMLInputElement).value);
        const valorN2 = parseFloat((document.getElementById('valorN2') as HTMLInputElement).value);
        const valorQ2 = parseFloat((document.getElementById('valorQ2') as HTMLInputElement).value);
        const valorSn = document.getElementById('valorSn') as HTMLInputElement;
        const valorA13 = parseFloat((document.getElementById('valorA13') as HTMLInputElement).value);
        const valorqN = parseFloat((document.getElementById('valorqN') as HTMLInputElement).value);
        const valorN3 = parseFloat((document.getElementById('valorN3') as HTMLInputElement).value);
        const valorQ = parseFloat((document.getElementById('valorQ') as HTMLInputElement).value);

        let resultado: number | null = null;
        let conta: string = '';

        if (TPselected === 'PA') {
            const selectedPA = (document.getElementById('tipoPA-select') as HTMLSelectElement).value;

            if (selectedPA === 'TG') {
                if (isNaN(valorA1) || isNaN(valorR) || isNaN(valorN)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                resultado = valorA1 + (valorN - 1) * valorR;
                conta = `Termo Geral: Aₙ = ${valorA1} + (${valorN} - 1) * ${valorR}`;
                if (valorAn.value === "") {
                    valorAn.value = resultado.toFixed(2);
                    valorAn.disabled = false;
                } else if (valorAk.value === "") {
                    valorAk.value = resultado.toFixed(2);
                    valorAk.disabled = false;
                }
            } else if (selectedPA === 'somaGeral') {
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
        } else if (TPselected === 'PG') {
            const selectedPG = (document.getElementById('tipoPG-select') as HTMLSelectElement).value;

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
            } else if (selectedPG === 'somaGeral') {
                if (isNaN(valorA13) || isNaN(valorQ) || isNaN(valorN3)) {
                    return { result: "NaN", conta: "Entrada inválida" };
                }
                if (valorQ === 1) {
                    resultado = valorA13 * valorN3;
                    conta = `Soma dos termos: Sₙ = ${valorA13} * ${valorN3}`;
                } else {
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

    static getInputFaltandoPaTg(): string | null {
        const valorAn = document.getElementById("valorAn") as HTMLInputElement;
        const valorA1 = document.getElementById("valorA1") as HTMLInputElement;
        const valorN = document.getElementById("valorN") as HTMLInputElement;
        const valorR = document.getElementById("valorR") as HTMLInputElement;

        return [valorAn, valorA1, valorN, valorR]
            .find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPaSg(): string | null {
        const valorAk = document.getElementById("valorAk") as HTMLInputElement;
        const valorAn1 = document.getElementById("valorAn1") as HTMLInputElement;
        const valorA11 = document.getElementById("valorA11") as HTMLInputElement;
        const valorN1 = document.getElementById("valorN1") as HTMLInputElement;

        return [valorAk, valorAn1, valorA11, valorN1]
            .find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPGTg(): string | null {
        const valorAn2 = document.getElementById("valorAn2") as HTMLInputElement;
        const valorA12 = document.getElementById("valorA12") as HTMLInputElement;
        const valorN2 = document.getElementById("valorN2") as HTMLInputElement;
        const valorQ2 = document.getElementById("valorQ2") as HTMLInputElement;

        return [valorAn2, valorA12, valorN2, valorQ2]
            .find(input => input.value === "")?.id || null;
    }

    static getInputFaltandoPGSg(): string | null {
        const valorSn = document.getElementById("valorSn") as HTMLInputElement;
        const valorA13 = document.getElementById("valorA13") as HTMLInputElement;
        const valorqN = document.getElementById("valorqN") as HTMLInputElement;
        const valorN3 = document.getElementById("valorN3") as HTMLInputElement;
        const valorQ = document.getElementById("valorQ") as HTMLInputElement;

        return [valorSn, valorA13, valorqN, valorN3, valorQ]
            .find(input => input.value === "")?.id || null;
    }

    static blockPaTg(): void {
        const inputs = [
            document.getElementById("valorAn") as HTMLInputElement,
            document.getElementById("valorA1") as HTMLInputElement,
            document.getElementById("valorN") as HTMLInputElement,
            document.getElementById("valorR") as HTMLInputElement,
            document.getElementById("valorAk") as HTMLInputElement,
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

    static blockPaSg(): void {
        const inputs = [
            document.getElementById("valorAn1") as HTMLInputElement,
            document.getElementById("valorA11") as HTMLInputElement,
            document.getElementById("valorN1") as HTMLInputElement,
            document.getElementById("valorS1") as HTMLInputElement,
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

    static blockPGTg(): void {
        const inputs = [
            document.getElementById("valorAn2") as HTMLInputElement,
            document.getElementById("valorA12") as HTMLInputElement,
            document.getElementById("valorN2") as HTMLInputElement,
            document.getElementById("valorQ2") as HTMLInputElement,
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

    static blockPGSg(): void {
        const inputs = [
            document.getElementById("valorSn") as HTMLInputElement,
            document.getElementById("valorA13") as HTMLInputElement,
            document.getElementById("valorqN") as HTMLInputElement,
            document.getElementById("valorN3") as HTMLInputElement,
            document.getElementById("valorQ") as HTMLInputElement,
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