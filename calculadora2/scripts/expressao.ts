export class Expressao {
    static quantityNumbers(str: string, startChar: string, startCharIndex?: number): number {
        let stringValue = String(str);
        if (startCharIndex === undefined) startCharIndex = stringValue.indexOf(startChar);
    
        const blockedChars = ['+', '-', '*', '/'];
        let i;
        for (i = startCharIndex + 1; !blockedChars.includes(stringValue.charAt(i)) && i < stringValue.length; i++) { }
        return i - startCharIndex;
    }
    
    static substituicao(input: string): string {
        return input
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");
    }

    static evaluateExpression(expression: string): number {
        expression = this.handleSquareRoots(expression);
        return eval(expression);
    }
    
    static handleSquareRoots(expression: string): string {
        while (expression.includes('√')) {
            const rootIndex = expression.indexOf('√');
            const numbersQtd = this.quantityNumbers(expression, '√', rootIndex);
    
            expression = expression.substring(0, rootIndex) +
                "Math.sqrt(" + expression.substring(rootIndex + 1, rootIndex + numbersQtd) +
                ")" + expression.substring(rootIndex + numbersQtd);
        }
        return expression;
    }
    
    static calcularExpressao(): { result: number | null; conta: string; resultado2: string } {
        let resultado: number | undefined;
        let conta: string;
        const input: HTMLInputElement | null = document.querySelector("#eval");
        if (!input) {
            console.error("Elemento de entrada não encontrado!");
            return {
                result: null,
                conta: "Erro na expressão!",
                resultado2: ''
            };
        }
        const correctedInput = Expressao.substituicao(input.value);
        try {
            resultado = Expressao.evaluateExpression(correctedInput);
            conta = `${correctedInput} = ${resultado}`;
            conta = Expressao.substituicao(conta)
        } catch (error) {
            input.value = "Error";
            resultado = undefined;
            conta = "Erro na expressão!";
        }
        return {
            result: resultado !== undefined ? parseFloat(resultado.toFixed(2)) : null,
            conta,
            resultado2: ''
        };
    }
}