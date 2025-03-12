export class Fatorial {
    static substituicao(input: string): string {
        return input
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");
    }

    static calcularFatorial(): {result:string, conta:string} {
        const n: number = parseInt((document.querySelector('#fatorial1') as HTMLInputElement).value, 10);
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
            conta = Fatorial.substituicao(conta)
            return { result: `${factorial.toFixed(2)}`, conta};
        }
    }
}