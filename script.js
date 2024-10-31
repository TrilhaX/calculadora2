const history = [];
let resposta = document.querySelector("#resultadoModificador");

function substituicao(input) {
    return input
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100");
}

function quantityNumbers(string, startChar, startCharIndex) {
    let str = String(string);
    if (startCharIndex === undefined) startCharIndex = str.indexOf(startChar);

    const blockedChars = ['+', '-', '*', '/'];
    let i;
    for (i = startCharIndex + 1; !blockedChars.includes(str.charAt(i)) && i < str.length; i++) {}
    return i - startCharIndex;
}

function calcularExpressao() {
    const input = document.querySelector("#eval");
    const correctedInput = substituicao(input.value);

    try {
        result = evaluateExpression(correctedInput);
        conta = `Não tenho como explicar`;
    } catch (error) {
        input.value = "Error";
        result = undefined;
    }

    return { result, conta };
}

function calcularRaiz() {
    const raiz1 = parseInt(document.querySelector("#raiz-input").value);
    const raiz2 = parseInt(document.querySelector("#numero-raiz").value);
    const result = Math.pow(raiz2, 1 / raiz1);
    const conta = `Não tenho como explicar`;

    return { result, conta };
}

function calcularPorcentagem() {
    const valor = parseFloat(document.querySelector('#valorPorcento').value);
    const percentual = parseFloat(document.querySelector('#percentual').value);
    const result = (valor * percentual) / 100;
    const conta2 = valor * percentual;
    const conta = `${percentual}% de ${valor} <br> ${valor} * ${percentual}/100 <br> ${conta2}/100 <br> ${result}`;

    return { result, conta };
}

function calcularBhaskara() {
    const a = parseFloat(document.querySelector('#viado1').value);
    const b = parseFloat(document.querySelector('#viado2').value);
    const c = parseFloat(document.querySelector('#viado3').value);
    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant < 0) {
        result = "Sem raízes reais";
        conta = `Δ = ${discriminant} <br> X1 e X2 = Não Existe`;
    } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        result = `x1 = ${root1}, x2 = ${root2}`;
        conta = `
            Δ = (${b})² - 4 * ${a} * ${c} <br>
            Δ = ${b**2} - (${-4 * a * c}) <br>
            Δ = ${discriminant} <br>
            <br>
            x1, x2 = (-${b} ± √${discriminant}) / (2 * ${a}) <br>
            <br>x1 = (-${b} + √${discriminant}) / ${2 * a} <br>
            x1 = ${root1} <br>
            <br>
            x2 = (-${b} - √${discriminant}) / ${2 * a} <br>
            x2 = ${root2}
        `;
    }

    return { result, conta };
}

function calcularFatorial() {
    const n = document.querySelector('#fatorial1').value;
    let factorial = 1;
    let conta = `${n}! = `;

    if (n < 0) {
        return {
            result: "Fatorial não existe para números negativos",
            conta: `O cálculo do fatorial não é aplicável para ${n}`
        };
    } else {
        for (let i = n; i > 0; i--) {
            factorial *= i;
            conta += (i > 1) ? `${i} * ` : `${i}`;
        }
        conta += ` = ${factorial}`;
        return { result: `${factorial}`, conta };
    }
}

function calcularDuploFatorial() {
    const n = document.querySelector('#fatorial2').value;
    let factorial = 1;
    let conta = `${n}!! = `;
    let firstTerm = true;

    if (n < 0) {
        return {
            result: "Duplo Fatorial não existe para números negativos",
            conta: `O cálculo do Duplo fatorial não é aplicável para ${n}`
        };
    } else {
        for (let i = n; i > 0; i -= 2) {
            factorial *= i;
            conta += (firstTerm ? `${i}` : ` x ${i}`);
            firstTerm = false;
        }
        conta += ` = ${factorial}`;
        return { result: `${factorial}`, conta };
    }
}

function calcularPitagoras() {
    const catetoA = parseFloat(document.getElementById("catetoA").value) || 0;
    const catetoB = parseFloat(document.getElementById("catetoB").value) || 0;
    const hipotenusa = parseFloat(document.getElementById("Hipotenusa").value) || 0;

    if (catetoA && catetoB) {
        const hipotenusaCalculada = Math.sqrt(catetoA ** 2 + catetoB ** 2);
        const raizZuada = catetoA ** 2 + catetoB ** 2
        conta = `Hipotenusa (c) = √(${catetoA}² + ${catetoB}²)<br> Hipotenusa (c) = √(${catetoA ** 2} + ${catetoB ** 2})<br> Hipotenusa (c) = √${raizZuada} <br>Hipotenusa (c)  = ${hipotenusaCalculada.toFixed(2)}`;
        return { result: `${hipotenusaCalculada.toFixed(2)}`, conta };
    } else if (catetoA && hipotenusa) {
        const catetoBCalculado = Math.sqrt(hipotenusa ** 2 - catetoA ** 2);
        const raizZuada = hipotenusa ** 2 - catetoA ** 2
        conta = `Cateto B (b) = √(${hipotenusa}² - ${catetoA}²)<br> Cateto B (b) = √(${hipotenusa ** 2} - ${catetoA ** 2})<br> Cateto B (b) = √${raizZuada} <br>Cateto B (b) = ${catetoBCalculado.toFixed(2)}`;
        return { result: `${catetoBCalculado.toFixed(2)}`, conta };
    } else if (catetoB && hipotenusa) {
        const catetoACalculado = Math.sqrt(hipotenusa ** 2 - catetoB ** 2);
        const raizZuada = hipotenusa ** 2 - catetoB ** 2
        conta = `Cateto A (a) = √(${hipotenusa}² - ${catetoB}²)<br> Cateto A (a) = √(${hipotenusa ** 2} - ${catetoB ** 2})<br>Cateto A (a) = √${raizZuada} <br>Cateto A (a) = ${catetoACalculado.toFixed(2)}`;
        return { result: `${catetoACalculado.toFixed(2)}`, conta };
    } else {
        return { result: "Preencha dois valores.", conta};
    }
}

function calcularTrigonometria() {
    const valorA = parseFloat(document.getElementById("valorA").value) || 0;
    const valorB = parseFloat(document.getElementById("valorB").value) || 0;
    const valorC = parseFloat(document.getElementById("valorC").value) || 0;
    const angulo = parseFloat(document.getElementById("angulo").value) || 0;

    if (valorA && angulo) {
        const catetoBCalculado = valorA * Math.sin(angulo * Math.PI / 180);
        resultado = `${catetoBCalculado.toFixed(2)}`;
        conta = `Cateto B (b) = ${valorA} * sin(${angulo})<br>Cateto B (b) = ${resultado}`;
    } else if (valorB && angulo) {
        const catetoACalculado = valorB / Math.sin(angulo * Math.PI / 180);
        resultado = catetoACalculado.toFixed(2);
        conta = `Cateto A (a) = ${valorB} / sin(${angulo})<br>Cateto A (a) = ${resultado}`;
    } else if (valorA && valorB) {
        const anguloCalculado = Math.atan(valorB / valorA) * (180 / Math.PI);
        resultado = `${anguloCalculado.toFixed(2)}`;
        conta = `Ângulo = atan(${valorB} / ${valorA})<br>Ângulo = ${resultado}`;
    } else if (valorA && valorC) {
        const catetoBCalculado = Math.sqrt(valorC ** 2 - valorA ** 2);
        resultado = catetoBCalculado.toFixed(2);
        conta = `Cateto B (b) = √(${valorC}² - ${valorA}²)<br>Cateto B (b) = ${resultado}`;
    } else if (valorB && valorC) {
        const catetoACalculado = Math.sqrt(valorC ** 2 - valorB ** 2);
        resultado = catetoACalculado.toFixed(2);
        conta = `Cateto A (a) = √(${valorC}² - ${valorB}²)<br>Cateto A (a) = ${resultado}`;
    } else if (angulo && valorC) {
        const catetoA = valorC * Math.cos(angulo * Math.PI / 180);
        const catetoB = valorC * Math.sin(angulo * Math.PI / 180);
        resultado = `A: ${catetoA.toFixed(2)}, B: ${catetoB.toFixed(2)}`;
        conta = `Cateto A (a) = ${valorC} * cos(${angulo})<br>Cateto B (b) = ${valorC} * sin(${angulo})<br>Resultado = ${resultado}`;
    } else {
        return { result: "Preencha dois valores.", conta: "" };
    }

    return { result: resultado, conta };
}

function calcularLog() {
    const logaritmo = parseFloat(document.getElementById("logaritmo").value) || 0;
    const logaritmando = parseFloat(document.getElementById("logaritmando").value) || 0;
    const base = parseFloat(document.getElementById("base").value) || 0;

    if (logaritmo && logaritmando) {
        const baseCalculada = Math.pow(logaritmando, 1 / logaritmo);
        resultado = baseCalculada.toFixed(2);
        conta = `Base = ${logaritmando}^(1/${logaritmo})<br> Base = ${resultado}`;
    }
    else if (logaritmando && base) {
        const logaritmoCalculado = Math.log(logaritmando) / Math.log(base);
        resultado = logaritmoCalculado.toFixed(2);
        conta = `Logaritmo = log(${logaritmando}) / log(${base})<br> Logaritmo = ${resultado}`;
    }
    else if (logaritmo && base) {
        const logaritmandoCalculado = Math.pow(base, logaritmo);
        resultado = logaritmandoCalculado.toFixed(2);
        conta = `Logaritmando = ${base}^${logaritmo}<br> Logaritmando = ${resultado}`;
    } else {
        return { result: "Preencha dois valores.", conta: "" };
    }

    return { result: resultado, conta };

}

function calcularRazaoEProporcao() {
    const valorA = parseFloat(document.getElementById("valorAR").value) || 0;
    const valorB = parseFloat(document.getElementById("valorBR").value) || 0;
    const valorC = parseFloat(document.getElementById("valorCR").value) || 0;
    const valorD = parseFloat(document.getElementById("valorDR").value) || 0;
    const selected = document.getElementById("razaoeproporção-select").value;

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

    return { result: resultado, conta };
}

function funcaoExponencial() {
    const valoresX = [-3, -2, -1, 0, 1, 2, 3];
    const inputA = document.querySelector(".funcaoExponencialInput");
    const a = parseFloat(inputA.value);
    
    if (isNaN(a)) {
        return { result: "Valor de 'a' inválido.", conta: "" };
    } else {
        const resultados = valoresX.map(x => Math.pow(a, x));
        const contas = valoresX.map((x, index) => `f(${x}) = ${resultados[index].toFixed(2)}`).join('<br>');
        return { result: resultado, conta };
    }
}

function funcaoQuadratica() {
    const A3 = parseFloat(document.querySelector(".BA").value);
    const B3 = parseFloat(document.querySelector(".BB").value);
    const C2 = parseFloat(document.querySelector(".BC").value);
    const delta2 = B3 * B3 - 4 * A3 * C2;

    if (isNaN(A3) || isNaN(B3) || isNaN(C2)) {
        resultado = "Valores inválidos para a função quadrática."
        conta = "";
    }

    if (delta2 < 0) {
        resultado = "Delta negativo, sem raízes reais."
        conta = '';
    } else {
        const x1 = (-B3 + Math.sqrt(delta2)) / (2 * A3);
        const x2 = (-B3 - Math.sqrt(delta2)) / (2 * A3);
        const Xv = -B3 / (2 * A3);
        const Yv = -delta2 / (4 * A3);
        const EY = C2;
    }

    return { result: resultado, conta };
}

function calcularProgressao() {
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

    const filledInputs = [valorA1, valorR, valorN, valorAn, valorAk].filter(value => value !== null).length;

    let selected = document.getElementById('tipoPA-select').value;

    if (TPselected === 'PA') {
        if (selected === 'TG'){
            if (filledInputs === 4) {
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
            if (filledInputs === 3) {
                if (valorN1 !== null && valorA11 !== null && (valorAn1 !== null || valorS !== null)) {
                    if (valorAn1 !== null) {
                        resultado = (valorN1 / 2) * (valorA11 + valorAn1);
                        conta = `S_N = N/2 * (A1 + Ak) = ${valorN1}/2 * (${valorA11} + ${valorAn1}) = ${resultado.toFixed(2)}`;
                    } else if (valorS !== null) {
                        resultado = (valorN1 / 2) * (2 * valorA11 + (valorN1 - 1) * valorS);
                        conta = `S_N = N/2 * (2A1 + (N-1)R) = ${valorN1}/2 * (2 * ${valorA11} + (${valorN1} - 1) * ${valorS}) = ${resultado.toFixed(2)}`;
                    }
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
    } else if (TPselected === 'PH') {
    }

    return { result: resultado.toFixed(2), conta };
}

function calcular() {
    const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
    let errorMessage = document.querySelector('#erroMensagem');
    let result, conta;

    errorMessage.innerHTML = "";

    if (!activeDiv) {
        errorMessage.innerHTML = "Nenhuma operação selecionada.";
        return { result, conta };
    }

    switch (activeDiv.id) {
        case 'eval-div':
            ({ result, conta } = calcularExpressao());
            break;
        case 'raiz-div':
            ({ result, conta } = calcularRaiz());
            break;
        case 'porcentagem-div':
            ({ result, conta } = calcularPorcentagem());
            break;
        case 'bhaskara-div':
            ({ result, conta } = calcularBhaskara());
            break;
        case 'fatorial-div':
            ({ result, conta } = calcularFatorial());
            break;
        case 'duplofatorial-div':
            ({ result, conta } = calcularDuploFatorial());
            break;
        case 'pitagoras-div':
            ({ result, conta } = calcularPitagoras());
            break;
        case 'trigonometria-div':
            ({ result, conta } = calcularTrigonometria());
            break;
        case 'logaritmo-div':
            ({ result, conta } = calcularLog());
            break;
        case 'razaoeproporção-div':
            ({ result, conta } = calcularRazaoEProporcao());
            break;
        case 'progressão-div':
            ({ result, conta } = calcularProgressao());
            break;
        default:
            errorMessage.innerHTML = "Operação não reconhecida ou inválida";
            return { result, conta };
    }
    
    return { result, conta };
}

function evaluateExpression(expression) {
    expression = handleSquareRoots(expression);
    
    return eval(expression);
}

function handleSquareRoots(expression) {
    while (expression.includes('√')) {
        const rootIndex = expression.indexOf('√');
        const numbersQtd = quantityNumbers(expression, '√', rootIndex);
        
        expression = expression.substring(0, rootIndex) + 
            "Math.sqrt(" + expression.substring(rootIndex + 1, rootIndex + numbersQtd) + 
            ")" + expression.substring(rootIndex + numbersQtd);
    }
    return expression;
}

function mostrarCalculo(calculoId) {
    const divs = document.querySelectorAll('.calculo-div');
    let resposta = document.querySelector("#resultado");
    resposta.innerHTML = ''    
    
    divs.forEach(div => {
        div.style.display = 'none';
    });

    const calculoDiv = document.getElementById(calculoId);
    calculoDiv.style.display = 'flex';

    if (calculoId === 'raiz-div') {
        const raizDiv = document.getElementById('raiz');
        raizDiv.style.display = 'flex';
        raizDiv.style.flexDirection = 'row';
        raizDiv.style.gap = '.5rem';
        raizDiv.style.alignItems = 'center';
        calculoDiv.style.flexDirection = 'column';
    } else if (calculoId === 'bhaskara-div') {
        calculoDiv.style.display = 'flex';
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.gap = '.5rem';
    } else if (calculoId === 'fatorial-div' || calculoId === 'porcentagem-div'){
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.alignItems = 'center'
        calculoDiv.style.justifyContent = 'center'
    } else if (calculoId === 'duplofatorial-div'){
        calculoDiv.style.flexDirection = 'row';
        calculoDiv.style.alignItems = 'center'
        calculoDiv.style.justifyContent = 'center'
    } else {
        calculoDiv.style.flexDirection = 'column';
    }

    calculoDiv.style.gap = '.5rem';
}

function blockPitagoras() {
    const catetoA = document.getElementById("catetoA");
    const catetoB = document.getElementById("catetoB");
    const hipotenusa = document.getElementById("Hipotenusa");

    const filledInputs = [catetoA.value, catetoB.value, hipotenusa.value].filter(value => value !== "").length;

    if (filledInputs === 2) {
        if (catetoA.value === "") {
            catetoA.disabled = true;
        }
        if (catetoB.value === "") {
            catetoB.disabled = true;
        }
        if (hipotenusa.value === "") {
            hipotenusa.disabled = true;
        }
    } else {
        catetoA.disabled = false;
        catetoB.disabled = false;
        hipotenusa.disabled = false;
    }
}

function blockTrigonometria() {
    const valorA = document.getElementById("valorA");
    const valorB = document.getElementById("valorB");
    const angulo = document.getElementById("angulo");

    const filledInputs = [valorA.value, valorB.value, angulo.value].filter(value => value !== "").length;

    if (filledInputs === 2) {
        if (valorA.value === "") {
            valorA.disabled = true;
        }
        if (valorB.value === "") {
            valorB.disabled = true;
        }
        if (valorC.value === "") {
            valorC.disabled = true;
        }
        if (angulo.value === "") {
            angulo.disabled = true;
        }
    } else {
        valorA.disabled = false;
        valorB.disabled = false;
        valorC.disabled = false;
        angulo.disabled = false;
    }
}

function blockLogaritmo() {
    const logaritmo = document.getElementById("logaritmo");
    const logaritmando = document.getElementById("logaritmando");
    const base = document.getElementById("base");

    const filledInputs = [logaritmo.value, logaritmando.value, base.value].filter(value => value !== "").length;

    if (filledInputs === 2) {
        if (logaritmo.value === "") {
            logaritmo.disabled = true;
        }
        if (logaritmando.value === "") {
            logaritmando.disabled = true;
        }
        if (base.value === "") {
            base.disabled = true;
        }
    } else {
        logaritmo.disabled = false;
        logaritmando.disabled = false;
        base.disabled = false;
    }
}

function blockRazaoEProporcao() {
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

function blockPA() {
    const inputs = [
        document.getElementById("valorAn"),
        document.getElementById("valorA1"),
        document.getElementById("valorN"),
        document.getElementById("valorR"),
        document.getElementById("valorAk"),
    ];

    const filledInputsCount = inputs.filter(input => input.value !== "").length;

    inputs.forEach(input => {
        input.disabled = filledInputsCount >= 4 && input.value === "";
    });
}

function getInputFaltandoRazao() {
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

function getInputFaltandoPitagoras() {
    const catetoA = document.getElementById("catetoA");
    const catetoB = document.getElementById("catetoB");
    const hipotenusa = document.getElementById("Hipotenusa");

    return [catetoA, catetoB, hipotenusa].find(input => input.value === "")?.id || null;
}

function getInputFaltandoPA() {
    const valorAn = document.getElementById("valorAn");
    const valorA1 = document.getElementById("valorA1");
    const valorN = document.getElementById("valorN");
    const valorR = document.getElementById("valorR");
    const valorAk = document.getElementById("valorAk");
    const valorAn1 = document.getElementById("valorAn1");
    const valorA11 = document.getElementById("valorA11");
    const valorN1 = document.getElementById("valorN1");

    return [valorAn, valorA1, valorN, valorR, valorAk, valorAn1, valorA11, valorN1]
        .find(input => input.value === "")?.id || null;
}


function getInputFaltandoPA() {
    const inputs = [
        document.getElementById("valorAn"),
        document.getElementById("valorA1"),
        document.getElementById("valorN"),
        document.getElementById("valorR"),
        document.getElementById("valorAk"),
        document.getElementById("valorAn1"),
        document.getElementById("valorA11"),
        document.getElementById("valorN1"),
    ];

    return [logaritmo, logaritmando, base].find(input => input.value === "")?.id || null;
}

function getInputFaltandoTrigonometria() {
    const valorA = parseFloat(document.getElementById("valorA").value) || null;
    const valorB = parseFloat(document.getElementById("valorB").value) || null;
    const valorC = parseFloat(document.getElementById("valorC").value) || null;
    const angulo = parseFloat(document.getElementById("angulo").value) || null;

    if (valorA === null && valorB !== null && angulo !== null) {
        return "valorA";
    } else if (valorB === null && valorA !== null && angulo !== null) {
        return "valorB";
    } else if (angulo === null && valorA !== null && valorB !== null) {
        return "angulo";
    } else if (valorA !== null && valorC !== null && valorB === null) {
        return "valorB";
    } else if (valorB !== null && valorC !== null && valorA === null) {
        return "valorA";
    } else if (valorC === null && valorA !== null && valorB !== null) {
        return "valorC";
    } else if (angulo === null && valorC !== null) {
        return "angulo";
    }

    return null;
}

function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
            deleteCalculo()
        });
    });
}

window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
    updateHistory();
};

function updateHistory() {
    const historyDiv = document.querySelector('.history');
    historyDiv.innerHTML = '<h3>Histórico</h3>';
    
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];

    if (savedHistory.length === 0) {
        const p = document.createElement('p');
        p.innerHTML = "Sem registros no histórico.";
        historyDiv.appendChild(p);
        return;
    }

    savedHistory.forEach(entry => {
        const p = document.createElement('p');
        p.style.color = "black";
        p.innerHTML = entry;
        historyDiv.appendChild(p);
    });
}

function clearHistory() {
    localStorage.removeItem('history');
    updateHistory();
}

function mostrarResultado() {
    let { result } = calcular();
    let resposta = document.querySelector("#resultado");
    const calculoSelecionado = document.querySelector('.calculo-div[style*="display: flex"]').id;
    let razaoOuProporcao = document.querySelector("#razaoeproporção-select");

    let inputFaltando = null;

    if (calculoSelecionado === 'razaoeproporção-div' && razaoOuProporcao.value === 'razao') {
        inputFaltando = getInputFaltandoRazao();
    } else if (calculoSelecionado === 'pitagoras-div') {
        inputFaltando = getInputFaltandoPitagoras();
    } else if (calculoSelecionado === 'trigonometria-div') {
        inputFaltando = getInputFaltandoTrigonometria();
    }else if(calculoSelecionado === 'logaritmo-div'){
        inputFaltando = getInputFaltandoLog();
    }else if(calculoSelecionado === 'progressão-div'){
        inputFaltando = getInputFaltandoPA();   
    }

    if (inputFaltando && result !== undefined) {
        document.getElementById(inputFaltando).value = result;
        document.getElementById(inputFaltando).disabled = false;
    }

    resposta.innerHTML = result !== undefined ? `Resultado: ${result}` : "";

    if (result !== undefined && !isNaN(result)) {
        const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
        savedHistory.push(result);
        localStorage.setItem('history', JSON.stringify(savedHistory));
        updateHistory();
    }
}

function mostrarConta(){
    let {conta} = calcular();
    let conta1 = document.querySelector("#conta1");
    let conta2 = document.querySelector(".contas");
    conta1.innerHTML = conta!== undefined? `${conta}` : "";
    conta2.style.display = "flex"
}

function deleteCalculo(){
    let conta2 = document.querySelector(".contas");
    conta2.style.display = "none"
}

function deleteResultado(){
    const result = document.querySelector("#resultado");
    result.innerHTML = '';
}

document.getElementById("razaoeproporção-select").addEventListener("change", blockRazaoEProporcao);
document.querySelector("#calcularButton").addEventListener("click", mostrarResultado);
document.getElementById("mostrarCalculo").addEventListener("click", mostrarConta);
document.querySelector("#deletarResult").addEventListener("click", deleteResultado);
document.getElementById("buttonDeleteCal").addEventListener("click", deleteCalculo);
document.querySelector(".clearHistory").addEventListener("click", clearHistory);

document.getElementById('dropdownCalculos').addEventListener('click', function() {
    const calculoSection = document.getElementById('calculoContainer');
    
    if (calculoSection.style.display === 'none' || calculoSection.style.display === '') {
        calculoSection.style.display = 'flex';
        calculoSection.style.flexDirection = 'column';
    } else {
        calculoSection.style.display = 'none';
    }
});

document.getElementById("funcoes-select").addEventListener("change", function() {
    const quadraticaDiv = document.querySelector(".quadratica");
    const exponencialDiv = document.querySelector(".exponencial");
    
    quadraticaDiv.style.display = "flex";
    exponencialDiv.style.display = "none";

    if (this.value === "quadratica") {
        quadraticaDiv.style.display = "flex";
    } else if (this.value === "exponencial") {
        exponencialDiv.style.display = "flex";
    }
});

document.getElementById("razaoeproporção-select").addEventListener("change", function() {
    const valorA = document.getElementById("valorAR");
    const valorB = document.getElementById("valorBR");
    const valorC = document.getElementById("valorCR");
    const valorD = document.getElementById("valorDR");
    valorA.value = '';
    valorB.value = '';
    valorC.value = '';
    valorD.value = '';
});

document.getElementById("tipoProgressão-select").addEventListener("change", function() {
    const PAD = document.querySelector("#PAD");
    const PGD = document.querySelector("#PGD");
    const PHD = document.querySelector("#PHD");
    const PADS = document.querySelector('#tipoPA-select');

    PAD.style.display = "none";
    PGD.style.display = "none";
    PHD.style.display = "none";

    if (this.value === "PA") {
        PAD.style.display = "block";
        PADS.style.display = "flex";
    } else if (this.value === "PG") {
        PGD.style.display = "block";
    } else if (this.value === "PH") {
        PHD.style.display = "block";
    } else {
        let errorMessage = document.querySelector('#erroMensagem');
        errorMessage.innerHTML = 'Selecione um cálculo válido';
    }
});

document.getElementById("tipoPA-select").addEventListener("change", function() {
    const TG = document.querySelector("#TG");
    const somaGeral = document.querySelector("#somaGeral");

    TG.style.display = "none";
    somaGeral.style.display = "none";

    if (this.value === "TG") {
        TG.style.display = "flex";
    } else if (this.value === "somaGeral") {
        somaGeral.style.display = "flex";
    }
});

document.getElementById("catetoA").addEventListener("input", () => {
    blockPitagoras();
});
document.getElementById("catetoB").addEventListener("input", () => {
    blockPitagoras();
});
document.getElementById("Hipotenusa").addEventListener("input", () => {
    blockPitagoras();
});
document.getElementById("valorA").addEventListener("input", () => {
    blockTrigonometria();
});

document.getElementById("valorB").addEventListener("input", () => {
    blockTrigonometria();
});
document.getElementById("valorC").addEventListener("input", () => {
    blockTrigonometria();
});
document.getElementById("angulo").addEventListener("input", () => {
    blockTrigonometria();
});
document.getElementById("logaritmo").addEventListener("input", () => {
    blockLogaritmo();
});

document.getElementById("logaritmando").addEventListener("input", () => {
    blockLogaritmo();
});

document.getElementById("base").addEventListener("input", () => {
    blockLogaritmo();
});

document.getElementById("valorAR").addEventListener("input", () => {
    blockRazaoEProporcao();
});

document.getElementById("valorBR").addEventListener("input", () => {
    blockRazaoEProporcao();
});

document.getElementById("valorCR").addEventListener("input", () => {
    blockRazaoEProporcao();
});

document.getElementById("valorDR").addEventListener("input", () => {
    blockRazaoEProporcao();
});

document.getElementById("valorAn").addEventListener("input", () => {
    blockPA();
});

document.getElementById("valorA1").addEventListener("input", () => {
    blockPA();
});

document.getElementById("valorN").addEventListener("input", () => {
    blockPA();
});
document.getElementById("valorR").addEventListener("input", () => {
    blockPA();
});
document.getElementById("valorAk").addEventListener("input", () => {
    blockPA();
});
document.getElementById("valorAn1").addEventListener("input", () => {
    blockPA();
});

document.getElementById("valorA11").addEventListener("input", () => {
    blockPA();
});

document.getElementById("valorN1").addEventListener("input", () => {
    blockPA();
});