interface CalculoResultado {
    result: string;
    conta: string;
}

function getInputElement(id: string): HTMLInputElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento com id ${id} não encontrado.`);
    }
    return element as HTMLInputElement;
}

export class RazaoeProporcao {
    static calcularRazaoEProporcao(): CalculoResultado {
        const valorA = getInputElement("valorAR").value;
        const valorB = getInputElement("valorBR").value;
        const valorC = getInputElement("valorCR").value;
        const valorD = getInputElement("valorDR").value;
        const selected = (document.getElementById("razaoeproporção-select") as HTMLSelectElement).value;

        let resultado = "";
        let conta = "";

        const values: number[] = [valorA, valorB, valorC, valorD]
            .filter(value => value !== "")
            .map(value => parseFloat(value));

        if (selected === "proporção" && values.length === 3) {
            if (valorA && valorB && valorC) {
                const D = (parseFloat(valorB) * parseFloat(valorC)) / parseFloat(valorA);
                resultado = D.toFixed(2);
                conta = `<br>Proporção: ${valorA}/${valorB} = ${valorC}/${D.toFixed(2)}<br> Cálculo: D = (${valorB} x ${valorC}) / ${valorA} = ${D.toFixed(2)}`;
            } else if (valorA && valorB && valorD) {
                const C = (parseFloat(valorA) * parseFloat(valorD)) / parseFloat(valorB);
                resultado = C.toFixed(2);
                conta = `<br>Proporção: ${valorA}/${valorB} = ${C.toFixed(2)}/${valorD}<br> Cálculo: C = (${valorA} x ${valorD}) / ${valorB} = ${C.toFixed(2)}`;
            }
        } else if (selected === "razao" && values.length === 2) {
            const razao = values[0] / values[1];
            resultado = razao.toFixed(2);
            conta = `<br>Razão: ${values[0]} / ${values[1]} = ${razao.toFixed(2)}`;
        }

        return { result: resultado, conta };
    }

    static getInputFaltandoRazao(): string | null {
        const valorA = getInputElement("valorAR");
        const valorB = getInputElement("valorBR");
        const valorC = getInputElement("valorCR");
        const valorD = getInputElement("valorDR");
        const razaoOuProporcao = (document.getElementById("razaoeproporção-select") as HTMLSelectElement).value;

        if (razaoOuProporcao === 'razao') {
            return [valorA, valorB].find(input => input.value === "")?.id || null;
        } else if (razaoOuProporcao === 'proporção') {
            const inputs = [valorA, valorB, valorC, valorD];
            const filledInputs = inputs.filter(input => input.value !== "").length;
            if (filledInputs === 3) {
                return inputs.find(input => input.value === "")?.id || null;
            }
        }
        return null;
    }

    static blockRazaoEProporcao(): void {
        const valorA = getInputElement("valorAR");
        const valorB = getInputElement("valorBR");
        const valorC = getInputElement("valorCR");
        const valorD = getInputElement("valorDR");
        const selected = (document.getElementById("razaoeproporção-select") as HTMLSelectElement).value;

        [valorA, valorB, valorC, valorD].forEach(input => input.disabled = false);

        const filledInputsCount = [valorA.value, valorB.value, valorC.value, valorD.value]
            .filter(value => value !== "").length;

        if (selected === 'razao') {
            if (filledInputsCount === 2) {
                valorA.disabled = valorA.value !== "";
                valorB.disabled = valorB.value !== "";
            }
        } else if (selected === 'proporção') {
            if (filledInputsCount === 3) {
                [valorA, valorB, valorC, valorD].forEach(input => {
                    input.disabled = input.value !== "";
                });
            }
        }
    }
}