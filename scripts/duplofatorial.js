export class DuploFatorial{
    static calcularDuploFatorial() {
        const n = document.querySelector('#fatorial2').value;
        let factorial = 1;
        let conta = `${n}!! = `;
        let firstTerm = true;
    
        if (n < 0) {
            return {
                result: "Duplo Fatorial não existe para números negativos",
                conta: `O cálculo do Duplo fatorial não é aplicável para ${n}`
            };
        } else {
            for (let i = n; i > 0; i -= 2) {
                factorial *= i;
                conta += (firstTerm ? `${i}` : ` x ${i}`);
                firstTerm = false;
            }
            conta += ` = ${factorial}`;
            return { result: `${parseFloat(factorial).toFixed(2)}`, conta };
        }
    }
}