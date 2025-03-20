interface CalculoResultado {
    result: string;
    conta: string;
}

function getInputElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element as T;
}

export class DuploFatorial {
    static calcularDuploFatorial(): CalculoResultado {
        const nInput = getInputElement<HTMLInputElement>('#fatorial2');
        const n = parseInt(nInput.value, 10);
        let factorial = 1;
        let conta = `${n}!! = `;
        let firstTerm = true;

        if (n < 0) {
            return {
                result: "Duplo Fatorial não existe para números negativos",
                conta: `O cálculo do duplo fatorial não é aplicável para ${n}`
            };
        } else {
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