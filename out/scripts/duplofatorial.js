function getInputElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
export class DuploFatorial {
    static calcularDuploFatorial() {
        const nInput = getInputElement('#fatorial2');
        const n = parseInt(nInput.value, 10);
        let factorial = 1;
        let conta = `${n}!! = `;
        let firstTerm = true;
        if (n < 0) {
            return {
                result: "Duplo Fatorial não existe para números negativos",
                conta: `O cálculo do duplo fatorial não é aplicável para ${n}`
            };
        }
        else {
            for (let i = n; i > 0; i -= 2) {
                factorial *= i;
                conta += firstTerm ? `${i}` : ` x ${i}`;
                firstTerm = false;
            }
            conta += ` = ${factorial}`;
            return { result: factorial.toFixed(2), conta };
        }
    }
}
