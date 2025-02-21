export class Porcentagem {
    static calcularPorcentagem() {
        const valor = parseFloat(document.querySelector('#valorPorcento').value);
        const percentual = parseFloat(document.querySelector('#percentual').value);
        const result = (valor * percentual) / 100;
        const conta2 = valor * percentual;
        const conta = `${percentual}% de ${valor} <br> ${valor} * ${percentual}/100 <br> ${conta2}/100 <br> ${result}`;
    
        return { result, conta, resultado2: '' };
    }
}