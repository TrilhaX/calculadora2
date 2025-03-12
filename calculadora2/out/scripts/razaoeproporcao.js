export class RazaoeProporcao {
    static calcularRazaoEProporcao() {
        const valorA = document.getElementById("valorAR").value;
        const valorB = document.getElementById("valorBR").value;
        const valorC = document.getElementById("valorCR").value;
        const valorD = document.getElementById("valorDR").value;
        const selected = document.getElementById("razaoeproporção-select").value;
        let resultado = "";
        let conta = "";
        const values = [valorA, valorB, valorC, valorD]
            .filter(value => value !== "")
            .map(value => parseFloat(value));
        if (selected === "proporção" && values.length === 3) {
            if (valorA && valorB && valorC) {
                const D = (valorB * valorC) / valorA;
                resultado = D.toFixed(2);
                conta = `<br>Proporção: ${valorA}/${valorB} = ${valorC}/${D.toFixed(2)}<br> Cálculo: D = (${valorB} x ${valorC}) / ${valorA} = ${D.toFixed(2)}`;
            }
            else if (valorA && valorB && valorD) {
                const C = (valorA * valorD) / valorB;
                resultado = C.toFixed(2);
                conta = `<br>Proporção: ${valorA}/${valorB} = ${C.toFixed(2)}/${valorD}<br> Cálculo: C = (${valorA} x ${valorD}) / ${valorB} = ${C.toFixed(2)}`;
            }
        }
        else if (selected === "razao" && values.length === 2) {
            const razao = values[0] / values[1];
            resultado = razao.toFixed(2);
            conta = `<br>Razão: ${values[0]} / ${values[1]} = ${razao.toFixed(2)}`;
        }
        return { result: resultado, conta };
    }
    static getInputFaltandoRazao() {
        var _a, _b;
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const razaoOuProporcao = document.getElementById("razaoeproporção-select").value;
        if (razaoOuProporcao === 'razao') {
            return ((_a = [valorA, valorB].find(input => input.value === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
        }
        else if (razaoOuProporcao === 'proporção') {
            const filledInputs = [valorA, valorB, valorC, valorD].filter(input => input.value !== "").length;
            if (filledInputs === 3) {
                return ((_b = [valorA, valorB, valorC, valorD].find(input => input.value === "")) === null || _b === void 0 ? void 0 : _b.id) || null;
            }
        }
        return null;
    }
    static blockRazaoEProporcao() {
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const selected = document.getElementById("razaoeproporção-select").value;
        valorA.disabled = false;
        valorB.disabled = false;
        valorC.disabled = false;
        valorD.disabled = false;
        const filledInputs = [valorA.value, valorB.value, valorC.value, valorD.value].filter(value => value !== "").length;
        if (selected === 'razao') {
            if (filledInputs === 2) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
            }
        }
        else if (selected === 'proporção') {
            if (filledInputs === 3) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        }
    }
}
