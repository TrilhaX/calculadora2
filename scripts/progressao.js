export class Progressao{
    static calcularProgressao() {
        const TPselected = document.getElementById('tipoProgressão-select').value;
    
        const valorA1 = parseFloat(document.getElementById('valorA1').value) || null;
        const valorR = parseFloat(document.getElementById('valorR').value) || null;
        const valorN = parseFloat(document.getElementById('valorN').value) || null;
        const valorAn = parseFloat(document.getElementById('valorAn').value) || null;
        const valorAk = parseFloat(document.getElementById('valorAk').value) || null;
        const valorA11 = parseFloat(document.getElementById('valorA11').value) || null;
        const valorN1 = parseFloat(document.getElementById('valorN1').value) || null;
        const valorAn1 = parseFloat(document.getElementById('valorAn1').value) || null;
        const valorS = parseFloat(document.getElementById('valorS1').value) || null;
    
        const filledInputs1 = [valorA1, valorR, valorN, valorAn, valorAk].filter(value => value !== null).length;
        const filledInputs2 = [valorA11, valorAn1, valorN1, valorS].filter(value => value !== null).length;
    
        let selected = document.getElementById('tipoPA-select').value;
        
        let resultado, conta
    
        if (TPselected === 'PA') {
            if (selected === 'TG') {
                if (filledInputs1 === 4) {
                    if (valorN === null) {
                        resultado = (valorAk - valorA1) / valorR + 1;
                        conta = `N = (Ak - A1) / R + 1<br> N = (${valorAk} - ${valorA1}) / ${valorR} + 1<br> N = ${(valorAk - valorA1)}/${valorR} + 1<br> N = ${resultado}`;
                    } else if (valorR === null) {
                        resultado = (valorAk - valorA1) / (valorN - 1);
                        conta = `R = (Ak - A1) / (N - 1)<br> R = (${valorAk} - ${valorA1}) / (${valorN} - 1)<br> R = ${(valorAk - valorA1)}/${valorN - 1}<br> R = ${resultado.toFixed(2)}`;
                    } else if (valorA1 === null) {
                        resultado = valorAk - (valorN - 1) * valorR;
                        conta = `A1 = Ak - (N - 1) * R<br> A1 = ${valorAk} - (${valorN} - 1) * ${valorR}<br> A1 = ${valorAk} - ${(valorN - 1) * valorR}<br> A1 = ${resultado.toFixed(2)}`;
                    } else if (valorAk === null) {
                        resultado = valorA1 + (valorN - 1) * valorR;
                        conta = `Ak = A1 + (N - 1) * R<br> Ak = ${valorA1} + (${valorN} - 1) * ${valorR}<br> Ak = ${valorA1} + ${(valorN - 1) * valorR}<br> Ak = ${resultado.toFixed(2)}`;
                    }
                }
            } else if (selected === 'somaGeral') {
                if (filledInputs2 === 3) {
                    if (valorS === null) {
                        resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                        conta = `S = N/2 * (A1 + Ak)<br> S = ${valorN1}/2 * (${valorA11} + ${valorAn1})<br> S = ${resultado.toFixed(2)}`;
                    } else if (valorAn1 === null) {
                        resultado = (valorN1 / 2) * (2 * valorA11 + (valorN1 - 1) * valorS);
                        conta = `S = N/2 * (2A1 + (N-1)R)<br> S = ${valorN1}/2 * (2 * ${valorA11} + (${valorN1} - 1) * ${valorS})<br> S = ${resultado.toFixed(2)}`;
                    } else if (valorN1 === null) {
                        resultado = (valorS * 2) / (valorA11 + valorAn1)
                        let conta1 = valorS * 2
                        let conta2 = valorA11 + valorAn1
                        conta = `N = ${valorS} x 2/${valorA11} + ${valorAn1}<br> N = ${conta1}/${conta2}<br> N = ${resultado.toFixed(2)} `
                    }
                }
            }
        } else if (TPselected === 'PG') {
            if (filledInputs === 3) {
                if (valorN === null) {
                    resultado = valorA1 * Math.pow(valorR, valorAk - 1);
                    conta = `An = A1 * R^(N-1) = ${valorA1} * ${valorR}^(${valorAk} - 1)`;
                } else if (valorAk === null) {
                    resultado = valorA1 * Math.pow(valorR, valorN - 1);
                    conta = `Ak = A1 * R^(N-1) = ${valorA1} * ${valorR}^(${valorN} - 1)`;
                } else if (valorA1 === null) {
                    resultado = valorAn / Math.pow(valorR, valorN - 1);
                    conta = `A1 = An / R^(N-1) = ${valorAn} / ${valorR}^(${valorN} - 1)`;
                } else if (valorR === null) {
                    resultado = Math.pow(valorAn / valorA1, 1 / (valorN - 1));
                    conta = `R = (An / A1)^(1/(N-1)) = (${valorAn} / ${valorA1})^(1/(${valorN} - 1))`;
                }
            } else {
                return { result: "Preencha dois valores.", conta: "" };
            }
        }
    
        return { result: resultado.toFixed(2), conta, resultado2: '' };
    }

    static getInputFaltandoPaTg() {
        const valorAn = document.getElementById("valorAn");
        const valorA1 = document.getElementById("valorA1");
        const valorN = document.getElementById("valorN");
        const valorR = document.getElementById("valorR");
    
        return [valorAn, valorA1, valorN, valorR]
            .find(input => input.value === "")?.id || null;
    }
    
    static getInputFaltandoPaSg() {
        const valorAk = document.getElementById("valorAk");
        const valorAn1 = document.getElementById("valorAn1");
        const valorA11 = document.getElementById("valorA11");
        const valorN1 = document.getElementById("valorN1");
    
        return [valorAk, valorAn1, valorA11, valorN1]
            .find(input => input.value === "")?.id || null;
    }

    
static blockPaTg() {
    const inputs = [
        document.getElementById("valorAn"),
        document.getElementById("valorA1"),
        document.getElementById("valorN"),
        document.getElementById("valorR"),
        document.getElementById("valorAk"),
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

static blockPaSg() {
    const inputs = [
        document.getElementById("valorAn1"),
        document.getElementById("valorA11"),
        document.getElementById("valorN1"),
        document.getElementById("valorS1"),
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
}