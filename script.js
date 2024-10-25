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
    let result, conta;

    try {
        result = evaluateExpression(correctedInput);
        conta = correctedInput;
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
    const conta = `${raiz1}√${raiz2}`;

    return { result, conta };
}

function calcularPorcentagem() {
    const valor = parseFloat(document.querySelectorAll('.porcentagem-div input')[0].value);
    const percentual = parseFloat(document.querySelectorAll('.porcentagem-div input')[1].value);
    const result = (valor * percentual) / 100;
    const conta2 = valor * percentual;
    const conta = `${percentual}% de ${valor} <br> ${valor} * ${percentual}/100 <br> ${conta2}/100 <br> ${result}`;

    return { result, conta };
}

function calcularBhaskara() {
    const a = parseFloat(document.querySelectorAll('.bhaskara-div input')[0].value);
    const b = parseFloat(document.querySelectorAll('.bhaskara-div input')[1].value);
    const c = parseFloat(document.querySelectorAll('.bhaskara-div input')[2].value);
    const discriminant = b ** 2 - 4 * a * c;
    let result, conta;

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
            x1 = (-${b} + √${discriminant}) / ${2 * a} <br>
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
    const valorA = document.getElementById("valorA").value || 0;
    const valorB = document.getElementById("valorB").value || 0;
    const valorC = document.getElementById("valorC").value || 0;
    const angulo = document.getElementById("angulo").value || 0;

    if (valorA && angulo) {
        const catetoBCalculado = valorA * Math.sin(angulo * Math.PI / 180);
        conta = `Cateto B (b) = ${valorA} * sin(${angulo}) = ${catetoBCalculado.toFixed(2)}`;
        return { result: `${catetoBCalculado.toFixed(2)}`, conta };
    } else if (valorB && angulo) {
        const catetoACalculado = valorB / Math.sin(angulo * Math.PI / 180);
        conta = `Cateto A (a) = ${valorB} / sin(${angulo}) = ${catetoACalculado.toFixed(2)}`;
        return { result: `${catetoACalculado.toFixed(2)}`, conta };
    } else if (valorA && valorB) {
        const anguloCalculado = Math.atan(valorB / valorA) * (180 / Math.PI);
        conta = `Ângulo = atan(${valorB} / ${valorA}) = ${anguloCalculado.toFixed(2)}°`;
        return { result: `${anguloCalculado.toFixed(2)}°`, conta };
    } else if (valorA && valorC) {
        const catetoBCalculado = Math.sqrt(valorC ** 2 - valorA ** 2);
        conta = `Cateto B (b) = √(${valorC}² - ${valorA}²) = ${catetoBCalculado.toFixed(2)}`;
        return { result: `${catetoBCalculado.toFixed(2)}`, conta };
    } else if (valorB && valorC) {
        const catetoACalculado = Math.sqrt(valorC ** 2 - valorB ** 2);
        conta = `Cateto A (a) = √(${valorC}² - ${valorB}²) = ${catetoACalculado.toFixed(2)}`;
        return { result: `${catetoACalculado.toFixed(2)}`, conta };
    } else if (angulo && valorC) {
        const catetoA = valorC * Math.cos(angulo * Math.PI / 180);
        const catetoB = valorC * Math.sin(angulo * Math.PI / 180);
        conta = `Cateto A (a) = ${valorC} * cos(${angulo}) = ${catetoA.toFixed(2)}<br>Cateto B (b) = ${valorC} * sin(${angulo}) = ${catetoB.toFixed(2)}`;
        return { result: `A: ${catetoA.toFixed(2)}, B: ${catetoB.toFixed(2)}`, conta };
    } else {
        return { result: "Preencha dois valores.", conta: "" };
    }
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


function calcular() {
    const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
    let result, conta;

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
            ({resposta, conta } = calcularTrigonometria());
            break;
        case 'logaritmo-div':
            ({ result, conta } = calcularLog());
            break;
        default:
            result = "Cálculo não reconhecido.";
            conta = "";
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

function mostrarResultado() {
    let { result, conta } = calcular();
    let resposta = document.querySelector("#resultado");
    resposta.innerHTML = result !== undefined ? `Resultado: ${result}<br><br>Conta:<br> ${conta}` : "";
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
    } else {
        calculoDiv.style.flexDirection = 'column';
    }

    calculoDiv.style.gap = '.5rem';
}

function deleteCalculo(){
    const resposta = document.querySelector("#resultado");
    resposta.innerHTML = '';
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


function configurarBotoes() {
    const botoes = document.querySelectorAll('#calculoLista button');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            mostrarCalculo(botao.value + '-div');
        });
    });
}

window.onload = () => {
    configurarBotoes();
    mostrarCalculo('eval-div');
};

document.getElementById("buttonDeleteCal").addEventListener("click", deleteCalculo);
document.querySelector("#calcularButton").addEventListener("click", mostrarResultado);

document.getElementById('dropdownCalculos').addEventListener('click', function() {
    const calculoSection = document.getElementById('calculoContainer');
    
    if (calculoSection.style.display === 'none' || calculoSection.style.display === '') {
        calculoSection.style.display = 'flex';
        calculoSection.style.flexDirection = 'column';
    } else {
        calculoSection.style.display = 'none';
    }
});

document.getElementById("catetoA").addEventListener("input", () => {
    blockPitagoras();
    calcularPitagoras();
});
document.getElementById("catetoB").addEventListener("input", () => {
    blockPitagoras();
    calcularPitagoras();
});
document.getElementById("Hipotenusa").addEventListener("input", () => {
    blockPitagoras();
    calcularPitagoras();
});
document.getElementById("valorA").addEventListener("input", () => {
    blockTrigonometria();
    calcularTrigonometria();
});

document.getElementById("valorB").addEventListener("input", () => {
    blockTrigonometria();
    calcularTrigonometria();
});
document.getElementById("valorC").addEventListener("input", () => {
    blockTrigonometria();
    calcularTrigonometria();
});
document.getElementById("angulo").addEventListener("input", () => {
    blockTrigonometria();
    calcularTrigonometria();
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