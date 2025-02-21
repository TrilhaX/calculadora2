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

        let selectedPA = document.getElementById('tipoPA-select').value;
        let selectedPG = document.getElementById('tipoPG-select').value;

        let resultado, conta;

        if (TPselected === 'PA') {
            if (selectedPA === 'TG') {
                if (filledInputs1 === 4) {
                    if (valorN === null) {
                        resultado = (valorAk - valorA1) / valorR + 1;
                        conta = `N = (Ak - A1) / R + 1`;
                    } else if (valorR === null) {
                        resultado = (valorAk - valorA1) / (valorN - 1);
                        conta = `R = (Ak - A1) / (N - 1)`;
                    } else if (valorA1 === null) {
                        resultado = valorAk - (valorN - 1) * valorR;
                        conta = `A1 = Ak - (N - 1) * R`;
                    } else if (valorAk === null) {
                        resultado = valorA1 + (valorN - 1) * valorR;
                        conta = `Ak = A1 + (N - 1) * R`;
                    }
                }
            } else if (selectedPA === 'somaGeral') {
                console.log("Calculando Soma Geral da PA...");
                if (filledInputs2 === 3) {
                    if (valorS === null) {
                        resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                        conta = `S = N/2 * (A1 + Ak)`;
                    } else if (valorAn1 === null) {
                        resultado = (valorN1 / 2) * (2 * valorA11 + (valorN1 - 1) * valorS);
                        conta = `S = N/2 * (2A1 + (N-1)R)`;
                    } else if (valorN1 === null) {
                        resultado = (valorS * 2) / (valorA11 + valorAn1);
                        conta = `N = S * 2 / (A1 + Ak)`;
                    }
                }
            }
        } else if (TPselected === 'PG') {
            if (selectedPG === 'somaGeral') {
                const valorSn = parseFloat(document.getElementById('valorSn').value) || null;
                const valorA13 = parseFloat(document.getElementById('valorA13').value) || null;
                const valorN3 = parseFloat(document.getElementById('valorN3').value) || null;
                const valorQ = parseFloat(document.getElementById('valorQ').value) || null;
                const valorqN = parseFloat(document.getElementById('valorQ').value) || null;

                const filledInputsPG2 = [valorSn, valorA13, valorqN, valorN3, valorQ].filter(value => value !== null).length;
                if (filledInputsPG2 === 4) {
                    if (valorSn === null) {
                        if (valorQ !== 1) {
                            resultado = valorA13 * (Math.pow(valorQ, valorN3) - 1) / (valorQ - 1);
                            conta = `${valorSn} = ${valorA13.toFixed(2)} × (${valorqN}^${valorN3} – 1)/(${valorQ} – 1)`;
                        } else {
                            resultado = valorN3 * valorA13;
                            conta = `${valorSn} = n × ${valorA13}`;
                        }
                    } else if (valorA13 === null) {
                        if (valorQ !== 1) {
                            resultado = valorSn * (valorQ - 1) / (Math.pow(valorQ, valorN3) - 1);
                            conta = `${valorA13} = ${valorSn} × (${valorQ} – 1)/(${valorQ}${valorN3} – 1)`;
                        } else {
                            resultado = valorSn / valorN3;
                            conta = `${valorA13} = ${valorSn} / n`;
                        }
                    } else if (valorN3 === null) {
                        if (valorQ !== 1) {
                            resultado = Math.log((valorSn * (valorQ - 1) / valorA13) + 1) / Math.log(valorQ);
                            conta = `${valorN3} = log((${valorSn}×(${valorQ}–1)/${valorA13}) + 1) / log(${valorQ})`;
                        } else {
                            resultado = valorSn / valorA13;
                            conta = `${valorN3} = ${valorSn} / ${valorA13}`;
                        }
                    } else if (valorQ === null) {
                        conta = `A equação ${valorSn} = ${valorA13}×(${valorqN}${valorN3} – 1)/(${valorQ} – 1) não permite isolar ${valorQ} de forma simples.`;
                        resultado = NaN;
                    }
                }
            } else if(selectedPG === 'TG'){
                const valorA12 = parseFloat(document.getElementById('valorA12').value) || null; // A1
                const valorAn2 = parseFloat(document.getElementById('valorAn2').value) || null;   // Aₙ
                const valorN2  = parseFloat(document.getElementById('valorN2').value) || null;    // n
                const valorQ2  = parseFloat(document.getElementById('valorQ2').value) || null;    // q

                const filledInputsPGTG = [valorA12, valorAn2, valorN2, valorQ2].filter(value => value !== null).length;
                
                if (filledInputsPGTG === 3) {
                    if (valorA12 === null) {
                        if (valorQ2 !== 0) {
                            resultado = valorAn2 / Math.pow(valorQ2, (valorN2 - 1));
                            conta = `A1 = ${valorAn2} / (${valorQ2}^(${valorN2}-1))`;
                        } else {
                            resultado = NaN;
                            conta = `Valor de q não pode ser 0.`;
                        }
                    } else if (valorAn2 === null) {
                        resultado = valorA12 * Math.pow(valorQ2, (valorN2 - 1));
                        conta = `Aₙ = ${valorA12} × (${valorQ2}^(${valorN2}-1))`;
                    } else if (valorN2 === null) {
                        if (valorA12 !== 0 && valorQ2 > 0 && valorQ2 !== 1) {
                            resultado = Math.log(valorAn2 / valorA12) / Math.log(valorQ2) + 1;
                            conta = `n = log(${valorAn2}/${valorA12}) / log(${valorQ2}) + 1`;
                        } else {
                            resultado = NaN;
                            conta = `Não é possível isolar n com os valores fornecidos.`;
                        }
                    } else if (valorQ2 === null) {
                        if (valorN2 !== 1 && valorA12 !== 0) {
                            resultado = Math.pow(valorAn2 / valorA12, 1 / (valorN2 - 1));
                            conta = `q = (${valorAn2}/${valorA12})^(1/(${valorN2}-1))`;
                        } else {
                            resultado = NaN;
                            conta = `Não é possível isolar q com os valores fornecidos.`;
                        }
                    }
                }
            }
        }
        return { result: parseFloat(resultado).toFixed(2), conta };
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

    static getInputFaltandoPGTg() {
        const valorAn2 = document.getElementById("valorAn2");
        const valorA12 = document.getElementById("valorA12");
        const valorN2 = document.getElementById("valorN2");
        const valorQ2 = document.getElementById("valorQ2");
    
        return [valorAn2, valorA12, valorN2, valorQ2]
            .find(input => input.value === "")?.id || null;
    }
    
    static getInputFaltandoPGSg() {
        const valorSn = document.getElementById("valorSn");
        const valorA13 = document.getElementById("valorA13");
        const valorqN = document.getElementById("valorqN");
        const valorN3 = document.getElementById("valorN3");
        const valorQ = document.getElementById("valorQ");
    
        return [valorSn, valorA13, valorqN, valorN3, valorQ]
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

    static blockPGTg() {
        const inputs = [
            document.getElementById("valorAn2"),
            document.getElementById("valorA12"),
            document.getElementById("valorN2"),
            document.getElementById("valorQ2"),
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

    static blockPGSg() {
        const inputs = [
            document.getElementById("valorSn"),
            document.getElementById("valorA13"),
            document.getElementById("valorqN"),
            document.getElementById("valorN3"),
            document.getElementById("valorQ"),
        ];

        const filledInputsPG2 = inputs.filter(input => input.value !== "").length;

        console.log(filledInputsPG2)
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