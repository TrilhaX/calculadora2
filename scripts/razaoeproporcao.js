export class RazaoeProporcao{
    static calcularRazaoEProporcao() {
        const valorA = parseFloat(document.getElementById("valorAR").value) || 0;
        const valorB = parseFloat(document.getElementById("valorBR").value) || 0;
        const valorC = parseFloat(document.getElementById("valorCR").value) || 0;
        const valorD = parseFloat(document.getElementById("valorDR").value) || 0;
        const selected = document.getElementById("razaoeproporção-select").value;

        let resultado, conta
    
        const values = [valorA, valorB, valorC, valorD].filter(value => !isNaN(value) && value !== 0);
    
        if (selected === "razao" && values.length === 3) {
            const ratio = (values[0] * values[2]);
            const teuPai = ratio / values[1];
            resultado = teuPai.toFixed(2);
            conta = `Razão = ${values[0]} x ${values[2]}:${values[1]}<br> Razão = ${ratio}/ ${values[1]}<br> Razão = ${teuPai.toFixed(2)}`;
        } else if (selected === "proporção" && values.length === 2) {
            const proportion = values[0] / values[1];
            resultado = proportion.toFixed(2);
            conta = `Proporção = ${values[0]}:${values[1]}<br> Proporção = ${resultado}`;
        }
    
        return { result: resultado, conta, resultado2: '' };
    }

    static getInputFaltandoRazao() {
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const razaoOuProporcao = document.getElementById("razaoeproporção-select").value;
    
        if (razaoOuProporcao === 'razao') {
            return [valorA, valorB, valorC, valorD].find(input => input.value === "")?.id;
        } else if (razaoOuProporcao === 'proporção') {
            const filledInputs = [valorA, valorB, valorC, valorD].filter(input => input.value !== "").length;
            if (filledInputs === 2) {
                return [valorA, valorB, valorC, valorD].find(input => input.value === "")?.id;
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
            if (filledInputs === 3) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        } else if (selected === 'proporção') {
            if (filledInputs === 2) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        }
    }
}