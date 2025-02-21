export class RazaoeProporcao{
    static calcularRazaoEProporcao() {
        const valorA = document.getElementById("valorAR").value;
        const valorB = document.getElementById("valorBR").value;
        const valorC = document.getElementById("valorCR").value;
        const valorD = document.getElementById("valorDR").value;        
        const selected = document.getElementById("razaoeproporção-select").value;

        let resultado, conta;
    
        const values = [valorA, valorB, valorC, valorD]
        .filter(value => value !== "" )
        .map(value => parseFloat(value));    
    
        if (selected === "proporção" && values.length === 3) {
            const ratio = (values[0] * values[2]);
            const teuPai = ratio / values[1];
            resultado = teuPai.toFixed(2);
            conta = `<br>Proporção = ${values[0]} x ${values[2]}:${values[1]}<br> Proporção = ${ratio}/ ${values[1]}<br> Proporção = ${teuPai.toFixed(2)}`;
        } else if (selected === "razao" && values.length === 3) {
            const proportion = values[0] / values[1];
            resultado = proportion.toFixed(2);
            conta = `<br>Razão = ${values[0]}:${values[1]}<br> Razão = ${resultado}`;
        }
    
        return { result: parseFloat(resultado).toFixed(2), conta };
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
            if (filledInputs === 3) {
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
            if (filledInputs === 4) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        }
    }
}
//Beta Release