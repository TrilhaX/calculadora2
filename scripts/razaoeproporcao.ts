export class RazaoeProporcao{
    static calcularRazaoEProporcao(event: string): { result: string; conta: string } {
        const valorA = document.getElementById("valorAR") as HTMLInputElement | null;
        const valorB = document.getElementById("valorBR") as HTMLInputElement | null;
        const valorC = document.getElementById("valorCR") as HTMLInputElement | null;
        const valorD = document.getElementById("valorDR") as HTMLInputElement | null;
        const selected = document.getElementById("razaoeproporção-select") as HTMLSelectElement | null;

        if (!selected || !valorA || !valorB || !valorC || !valorD) {
            return {
                result: "NaN",
                conta: "Entrada inválida: campos ou seleção não encontrados." 
            };
        }

        const values = [valorA.value, valorB.value, valorC.value, valorD.value]
            .filter(value => value !== "")
            .map(value => parseFloat(value));
    
        let resultado: number | undefined;
        let conta: string = "Invalid input";
    
        if (selected.value === "proporção" && values.length === 3) {
            const ratio = values[0] * values[2];
            const teuPai = ratio / values[1];
            resultado = teuPai;
            conta = `<br>Proporção = ${values[0]} x ${values[2]}:${values[1]}<br> Proporção = ${ratio} / ${values[1]}<br> Proporção = ${teuPai.toFixed(2)}`;
        } else if (selected.value === "razao" && values.length === 2) {
            const proportion = values[0] / values[1];
            resultado = proportion;
            conta = `<br>Razão = ${values[0]}:${values[1]}<br> Razão = ${proportion.toFixed(2)}`;
        }
        const result = resultado !== undefined ? resultado.toFixed(2) : "NaN";
        return { result, conta };
    }

    static getInputFaltandoRazao(): string {
        const valorA = document.getElementById("valorAR") as HTMLInputElement | null;
        const valorB = document.getElementById("valorBR") as HTMLInputElement | null;
        const valorC = document.getElementById("valorCR") as HTMLInputElement | null;
        const valorD = document.getElementById("valorDR") as HTMLInputElement | null;
        const razaoOuProporcao = document.getElementById("razaoeproporção-select") as HTMLSelectElement | null;

        if (!razaoOuProporcao || !valorA || !valorB || !valorC || !valorD) {
            return "";
        }

        if (razaoOuProporcao.value === 'razao') {
            const emptyInput = [valorA, valorB, valorC, valorD].find(input => input.value === "");
            return emptyInput ? emptyInput.id : "";
        } else if (razaoOuProporcao.value === 'proporção') {
            const filledInputs = [valorA, valorB, valorC, valorD].filter(input => input.value !== "").length;
            if (filledInputs === 3) {
                const emptyInput = [valorA, valorB, valorC, valorD].find(input => input.value === "");
                return emptyInput ? emptyInput.id : "";
            }
        }
        return "";
    }

    static blockRazaoEProporcao() {
        const valorA = document.getElementById("valorAR") as HTMLInputElement;
        const valorB = document.getElementById("valorBR") as HTMLInputElement;
        const valorC = document.getElementById("valorCR") as HTMLInputElement;
        const valorD = document.getElementById("valorDR") as HTMLInputElement;
        const selected = document.getElementById("razaoeproporção-select") as HTMLSelectElement;
    
        if (!selected || !valorA || !valorB ||  !valorC || !valorD){
            return ;
        }
        valorA.disabled = false;
        valorB.disabled = false;
        valorC.disabled = false;
        valorD.disabled = false;
    
        const filledInputs = [valorA.value, valorB.value, valorC.value, valorD.value].filter(value => value !== "").length;
    
        if (selected.value === 'razao') {
            if (filledInputs === 3) {
                valorA.disabled = valorA.value === "";
                valorB.disabled = valorB.value === "";
                valorC.disabled = valorC.value === "";
                valorD.disabled = valorD.value === "";
            }
        } else if (selected.value === 'proporção') {
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