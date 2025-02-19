export class Expressao {
    static quantityNumbers(string, startChar, startCharIndex) {
        let str = String(string);
        if (startCharIndex === undefined) startCharIndex = str.indexOf(startChar);
    
        const blockedChars = ['+', '-', '*', '/'];
        let i;
        for (i = startCharIndex + 1; !blockedChars.includes(str.charAt(i)) && i < str.length; i++) { }
        return i - startCharIndex;
    }
    
    static substituicao(input) {
        return input
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");
    }

    static evaluateExpression(expression) {
        expression = this.handleSquareRoots(expression);
        return eval(expression);
    }
    
    static handleSquareRoots(expression) {
        while (expression.includes('√')) {
            const rootIndex = expression.indexOf('√');
            const numbersQtd = this.quantityNumbers(expression, '√', rootIndex);
    
            expression = expression.substring(0, rootIndex) +
                "Math.sqrt(" + expression.substring(rootIndex + 1, rootIndex + numbersQtd) +
                ")" + expression.substring(rootIndex + numbersQtd);
        }
        return expression;
    }
    
    static calcularExpressao() {
        let result;
        let conta;
        
        const input = document.querySelector("#eval").value;
        const correctedInput = Expressao.substituicao(input);
    
        try {
            result = Expressao.evaluateExpression(correctedInput);
            conta = `${input} = ${result}`;
        } catch (error) {
            input.value = "Error";
            result = undefined;
            conta = "Erro na expressão!";
        }
    
        return { result, conta, resultado2: '' };
    }
}