export class Funcao {

    static calcularFuncao() {
        const valoresX = [-2, -1, 0, 1, 2];
        const inputEquacao = document.querySelector("#equação");
        let equacao = inputEquacao.value.replace("F(X) =", "").trim();
    
        const termoRegex = /([+-]?\d*\.?\d*)?\s*\*?\s*x(?:\^(\d+))?|([+-]?\s*\d+\.?\d*)/gi;
    
        let termos = [];
        let constante = 0;
    
        equacao.replace(termoRegex, (match, coef, exp, constTerm) => {
            if (constTerm !== undefined) {
                constante = parseFloat(constTerm.replace(/\s+/g, ''));
            } else {
                coef = coef ? parseFloat(coef) : (match.trim().startsWith('-') ? -1 : 1);
                exp = exp ? parseInt(exp) : 1;
                termos.push({ coef, exp });
            }
        });        
    
        termos.sort((a, b) => b.exp - a.exp);
    
        let resultados = valoresX.map(x => {
            return termos.reduce((acc, term) => acc + term.coef * Math.pow(x, term.exp), constante);
        });
    
        const contas = valoresX.map((x, index) => {
            let expressao = termos.map(term => `(${x})^${term.exp}`).join(" + ");
            return `f(${x}) = ${expressao} + ${constante} = ${resultados[index].toFixed(2)}`;
        });
        
        valoresX.forEach((x, index) => {
            document.querySelector(`#resultado${index + 1}`).value = contas[index];
            document.querySelector(`#final${index + 1}`).value = resultados[index].toFixed(2);
            document.querySelector(`#y${index + 1}`).value = resultados[index].toFixed(2);
        });
        
        return { result: parseFloat(resultados).toFixed(2), conta: contas.join('<br>') };
    }          
}