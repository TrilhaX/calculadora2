interface CalculoResultado {
    result: string;
    conta: string;
}

function getInputElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element as T;
}

function getNumberInputValue(selector: string): number {
    const input = getInputElement<HTMLInputElement>(selector);
    return parseFloat(input.value);
}

export class Logaritmo {
    static calcularLog(): CalculoResultado {
        const logaritmoValue = getNumberInputValue("#logaritmo") || 0;
        const logaritmandoValue = getNumberInputValue("#logaritmando") || 0;
        const baseValue = getNumberInputValue("#base") || 0;

        let resultado: number | undefined;
        let conta: string = "Invalid input";

        if (logaritmoValue && logaritmandoValue) {
            resultado = Math.pow(logaritmandoValue, 1 / logaritmoValue);
            conta = `Base = ${logaritmandoValue}^(1/${logaritmoValue})<br>Base = ${resultado.toFixed(2)}`;
        }
        else if (logaritmandoValue && baseValue) {
            resultado = Math.log(logaritmandoValue) / Math.log(baseValue);
            conta = `Logaritmo = log(${logaritmandoValue}) / log(${baseValue})<br>Logaritmo = ${resultado.toFixed(2)}`;
        }
        else if (logaritmoValue && baseValue) {
            resultado = Math.pow(baseValue, logaritmoValue);
            conta = `Logaritmando = ${baseValue}^${logaritmoValue}<br>Logaritmando = ${resultado.toFixed(2)}`;
        }

        const formattedResult = resultado !== undefined ? resultado.toFixed(2) : "NaN";
        return { result: formattedResult, conta };
    }

    static blockLogaritmo(): void {
        const logaritmoInput = getInputElement<HTMLInputElement>("#logaritmo");
        const logaritmandoInput = getInputElement<HTMLInputElement>("#logaritmando");
        const baseInput = getInputElement<HTMLInputElement>("#base");

        const inputs = [logaritmoInput, logaritmandoInput, baseInput];
        const filledInputs = inputs.filter(input => input.value.trim() !== "").length;

        if (filledInputs === 2) {
            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    input.disabled = true;
                }
            });
        } else {
            inputs.forEach(input => (input.disabled = false));
        }
    }

    static getInputFaltandoLog(): string | null {
        const logaritmoInput = getInputElement<HTMLInputElement>("#logaritmo");
        const logaritmandoInput = getInputElement<HTMLInputElement>("#logaritmando");
        const baseInput = getInputElement<HTMLInputElement>("#base");

        const inputs = [logaritmoInput, logaritmandoInput, baseInput];
        return inputs.find(input => input.value.trim() === "")?.id || null;
    }
}