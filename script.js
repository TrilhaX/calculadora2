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

function calcular() {
    const activeDiv = document.querySelector('.calculo-div[style*="display: flex"]');
    let result, conta;

    if (activeDiv.id === 'eval-div') {
        const input = document.querySelector("#eval");
        const correctedInput = substituicao(input.value);
        
        try {
            result = evaluateExpression(correctedInput);
            conta = correctedInput;
        } catch (error) {
            input.value = "Error";
            result = undefined;
        }
    } else if (activeDiv.id === 'raiz-div') {
        let raiz1 = parseInt(document.querySelector("#raiz-input").value);
        let raiz2 = parseInt(document.querySelector("#numero-raiz").value);
        result = Math.pow(raiz2, 1 / raiz1);        
        conta = `Não tem como explicar.`;
    } else if (activeDiv.id === 'porcentagem-div') {
        const valor = parseFloat(activeDiv.querySelectorAll('input')[0].value);
        const percentual = parseFloat(activeDiv.querySelectorAll('input')[1].value);
        result = (valor * percentual) / 100;
        conta2 = valor * percentual
        conta = `${percentual}% de ${valor} <br> ${valor} * ${percentual}/100 <br> ${conta2}/100 <br> ${result} `;
    } else if (activeDiv.id === 'pitagoras-div') {
        const selectedOption = document.querySelector("#pitagorasSelect").value;
        const catetoA = parseFloat(document.querySelector("#catetoA").value) || 0;
        const catetoB = parseFloat(document.querySelector("#catetoB").value) || 0;
        const hipotenusa = parseFloat(document.querySelector("#hipotenusa").value) || 0;
        const cateto = parseFloat(document.querySelector("#cateto").value) || 0;

        if (selectedOption === 'hipotenusa') {
            result = Math.sqrt(catetoA ** 2 + catetoB ** 2);
            conta = `√(${catetoA}² + ${catetoB}²)`;
        } else if (selectedOption === 'cateto') {
            if (hipotenusa > 0 && cateto > 0) {
                result = Math.sqrt(hipotenusa ** 2 - cateto ** 2);
                conta = `√(${hipotenusa}² - ${cateto}²)`;
            } else {
                result = "Preencha os valores corretamente.";
                conta = "Dados insuficientes para calcular o cateto.";
            }
        }
    } else if (activeDiv.id === 'bhaskara-div') {
        const a = parseFloat(activeDiv.querySelectorAll('input')[0].value);
        const b = parseFloat(activeDiv.querySelectorAll('input')[1].value);
        const c = parseFloat(activeDiv.querySelectorAll('input')[2].value);
        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant < 0) {
            result = "Sem raízes reais";
            conta = `Δ = ${discriminant}`;
        } else {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            result = `x1 = ${root1}, x2 = ${root2}`;
            conta = `Δ = ${discriminant}`;
        }
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
    } else {
        calculoDiv.style.flexDirection = 'column';
    }

    calculoDiv.style.gap = '.5rem';
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

document.querySelector("#pitagorasSelect").addEventListener("change", function() {
    const hipotenusaDiv = document.querySelector(".hipotenusa");
    const catetoDiv = document.querySelector(".cateto");

    if (this.value === 'hipotenusa') {
        hipotenusaDiv.style.display = 'flex';
        hipotenusaDiv.style.flexDirection = 'column';
        hipotenusaDiv.style.gap = '.5rem';
        catetoDiv.style.display = 'none';
    } else {
        hipotenusaDiv.style.display = 'none';
        catetoDiv.style.display = 'flex';
        catetoDiv.style.gap = '.5rem';
        catetoDiv.style.flexDirection = 'column';
    }
});

const pitagorasSelect = document.querySelector("#pitagorasSelect");
pitagorasSelect.dispatchEvent(new Event("change"));