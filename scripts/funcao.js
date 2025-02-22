export class Funcao {
    static calcularFuncao() {
        const valoresX = [-2, -1, 0, 1, 2];
        const inputEquacao = document.querySelector("#equação");
        if (!inputEquacao) {
            throw new Error("Elemento #equação não encontrado.");
        }
        let equacao = inputEquacao.value.replace("F(X) =", "").trim();
        const termoRegex = /([+-]?\d*\.?\d*)?\s*\*?\s*x(?:\^(\d+))?|([+-]?\s*\d+\.?\d*)/gi;
        let termos = [];
        let constante = 0;
        equacao.replace(termoRegex, (match, coef, exp, constTerm) => {
            if (constTerm !== undefined) {
                constante = parseFloat(constTerm.replace(/\s+/g, ''));
            }
            else {
                const coeficiente = coef ? parseFloat(coef) : (match.trim().startsWith('-') ? -1 : 1);
                const expoente = exp ? parseInt(exp) : 1;
                termos.push({ coef: coeficiente, exp: expoente });
            }
            return match;
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
            const resultadoElement = document.querySelector(`#resultado${index + 1}`);
            const finalElement = document.querySelector(`#final${index + 1}`);
            const yElement = document.querySelector(`#y${index + 1}`);
            if (resultadoElement && finalElement && yElement) {
                resultadoElement.value = contas[index]; // Já é uma string
                finalElement.value = resultados[index].toFixed(2); // Convertendo para string
                yElement.value = resultados[index].toFixed(2); // Convertendo para string
            }
        });
        return { result: resultados[0].toFixed(2), conta: contas.join('<br>') };
    }
}
