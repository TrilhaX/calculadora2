export class Expressao{

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
        expression = handleSquareRoots(expression);
    
        return eval(expression);
    }
    
    static handleSquareRoots(expression) {
        while (expression.includes('√')) {
            const rootIndex = expression.indexOf('√');
            const numbersQtd = quantityNumbers(expression, '√', rootIndex);
    
            expression = expression.substring(0, rootIndex) +
                "Math.sqrt(" + expression.substring(rootIndex + 1, rootIndex + numbersQtd) +
                ")" + expression.substring(rootIndex + numbersQtd);
        }
        return expression;
    }
    static calcularExpressao() {
        const input = document.querySelector("#eval");
        const correctedInput = substituicao(input.value);
    
        try {
            result = evaluateExpression(correctedInput);
            conta = `Não tenho como explicar`;
        } catch (error) {
            input.value = "Error";
            result = undefined;
        }
    
        return { result, conta, resultado2: '' };
    }
}