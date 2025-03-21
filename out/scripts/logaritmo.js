function getInputElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
function getNumberInputValue(selector) {
    const input = getInputElement(selector);
    return parseFloat(input.value);
}
export class Logaritmo {
    static calcularLog() {
        const logaritmoValue = getNumberInputValue("#logaritmo") || 0;
        const logaritmandoValue = getNumberInputValue("#logaritmando") || 0;
        const baseValue = getNumberInputValue("#base") || 0;
        let resultado;
        let conta = "Invalid input";
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
    static blockLogaritmo() {
        const logaritmoInput = getInputElement("#logaritmo");
        const logaritmandoInput = getInputElement("#logaritmando");
        const baseInput = getInputElement("#base");
        const inputs = [logaritmoInput, logaritmandoInput, baseInput];
        const filledInputs = inputs.filter(input => input.value.trim() !== "").length;
        if (filledInputs === 2) {
            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    input.disabled = true;
                }
            });
        }
        else {
            inputs.forEach(input => (input.disabled = false));
        }
    }
    static getInputFaltandoLog() {
        var _a;
        const logaritmoInput = getInputElement("#logaritmo");
        const logaritmandoInput = getInputElement("#logaritmando");
        const baseInput = getInputElement("#base");
        const inputs = [logaritmoInput, logaritmandoInput, baseInput];
        return ((_a = inputs.find(input => input.value.trim() === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
}
