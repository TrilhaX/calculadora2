function getInputElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
export class Fatorial {
    static substituicao(input) {
        return input
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");
    }
    static calcularFatorial() {
        const nInput = getInputElement('#fatorial1');
        const n = parseInt(nInput.value, 10);
        let factorial = 1;
        let conta = `${n}! = `;
        if (n < 0) {
            return {
                result: "Fatorial não existe para números negativos",
                conta: `O cálculo do fatorial não é aplicável para ${n}`
            };
        }
        else {
            for (let i = n; i > 0; i--) {
                factorial *= i;
                conta += (i > 1) ? `${i} * ` : `${i}`;
            }
            conta += ` = ${factorial}`;
            conta = Fatorial.substituicao(conta);
            return { result: factorial.toFixed(2), conta };
        }
    }
}
