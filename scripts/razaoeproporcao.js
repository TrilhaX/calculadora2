export class RazaoeProporcao {
    static calcularRazaoEProporcao(event) {
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const selected = document.getElementById("razaoeproporção-select");
        // Verifica se a seleção é válida
        if (selected.value !== "proporção" && selected.value !== "razão") {
            return {
                result: "NaN",
                conta: "Seleção inválida."
            };
        }
        // Validação dos campos com base na seleção
        if (selected.value === "proporção") {
            if (!valorA || !valorB || !valorC || !valorD || valorA.value === "" || valorB.value === "" || valorC.value === "" || valorD.value === "") {
                return {
                    result: "NaN",
                    conta: "Entrada inválida: todos os campos devem ser preenchidos para proporção."
                };
            }
        }
        else if (selected.value === "razão") {
            if (!valorA || !valorC || valorA.value === "" || valorC.value === "") {
                return {
                    result: "NaN",
                    conta: "Entrada inválida: os campos A e C devem ser preenchidos para razão."
                };
            }
        }
        // Converte os valores para números
        const valorANum = parseFloat((valorA === null || valorA === void 0 ? void 0 : valorA.value) || "NaN");
        const valorBNum = parseFloat((valorB === null || valorB === void 0 ? void 0 : valorB.value) || "NaN");
        const valorCNum = parseFloat((valorC === null || valorC === void 0 ? void 0 : valorC.value) || "NaN");
        const valorDNum = parseFloat((valorD === null || valorD === void 0 ? void 0 : valorD.value) || "NaN");
        let resultado;
        let conta = "Entrada inválida";
        // Lógica para proporção
        if (selected.value === "proporção") {
            const produtoExtremos = valorANum * valorDNum;
            const produtoMeios = valorBNum * valorCNum;
            resultado = produtoExtremos / produtoMeios;
            conta = `<br>Proporção = ${valorANum} x ${valorDNum} : ${valorBNum} x ${valorCNum}<br> Proporção = ${produtoExtremos} / ${produtoMeios}<br> Proporção = ${resultado.toFixed(2)}`;
        }
        // Lógica para razão
        else if (selected.value === "razão") {
            resultado = valorANum / valorCNum; // A / C
            conta = `<br>Razão = ${valorANum} : ${valorCNum}<br> Razão = ${resultado.toFixed(2)}`;
        }
        const result = resultado !== undefined && !isNaN(resultado) ? resultado.toFixed(2) : "NaN";
        return { result, conta };
    }
    static getInputFaltandoRazao() {
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const razaoOuProporcao = document.getElementById("razaoeproporção-select");
        if (!razaoOuProporcao || !valorA || !valorB || !valorC || !valorD) {
            return "";
        }
        if (razaoOuProporcao.value === 'razão') {
            const emptyInput = [valorA, valorC].find(input => input.value === "");
            return emptyInput ? emptyInput.id : "";
        }
        else if (razaoOuProporcao.value === 'proporção') {
            const emptyInput = [valorA, valorB, valorC, valorD].find(input => input.value === "");
            return emptyInput ? emptyInput.id : "";
        }
        return "";
    }
    static blockRazaoEProporcao() {
        const valorA = document.getElementById("valorAR");
        const valorB = document.getElementById("valorBR");
        const valorC = document.getElementById("valorCR");
        const valorD = document.getElementById("valorDR");
        const selected = document.getElementById("razaoeproporção-select");
        if (!selected || !valorA || !valorB || !valorC || !valorD) {
            return;
        }
        // Habilita todos os campos inicialmente
        valorA.disabled = false;
        valorB.disabled = false;
        valorC.disabled = false;
        valorD.disabled = false;
        const filledInputs = [valorA.value, valorB.value, valorC.value, valorD.value].filter(value => value !== "").length;
        if (selected.value === 'razão') {
            // Para razão, apenas A e C são necessários
            valorB.disabled = true;
            valorD.disabled = true;
        }
        else if (selected.value === 'proporção') {
            // Para proporção, todos os campos são necessários
            if (filledInputs === 4) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        }
    }
}
