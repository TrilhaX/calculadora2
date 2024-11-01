export class Fatorial {
    static calcularFatorial() {
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
            return { result: `${factorial}`, conta, resultado2: '' };
        }
    }
}