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

export class Funcao {
    static calcularFuncao(): CalculoResultado {
        const valoresX: number[] = [-2, -1, 0, 1, 2];

        const inputEquacao = getInputElement<HTMLInputElement>("#equação");
        let equacao: string = inputEquacao.value.replace("F(X) =", "").trim();

        const termoRegex: RegExp = /([+-]?\d*\.?\d*)?\s*\*?\s*x(?:\^(\d+))?|([+-]?\s*\d+\.?\d*)/gi;

        let termos: { coef: number; exp: number }[] = [];
        let constante: number = 0;

        equacao.replace(termoRegex, (match: string, coef: string | undefined, exp: string | undefined, constTerm: string | undefined): string => {
            if (constTerm !== undefined) {
                constante = parseFloat(constTerm.replace(/\s+/g, ''));
            } else {
                const coeficiente: number = coef ? parseFloat(coef) : (match.trim().startsWith('-') ? -1 : 1);
                const expoente: number = exp ? parseInt(exp) : 1;
                termos.push({ coef: coeficiente, exp: expoente });
            }
            return match;
        });

        termos.sort((a, b) => b.exp - a.exp);

        let resultados: number[] = valoresX.map(x =>
            termos.reduce((acc: number, term: { coef: number; exp: number }) => acc + term.coef * Math.pow(x, term.exp), constante)
        );

        const contas: string[] = valoresX.map((x: number, index: number) => {
            let expressao: string = termos
                .map(term => `(${term.coef} * ${x}^${term.exp})`)
                .join(" + ");
            return `f(${x}) = ${expressao} + ${constante} = ${resultados[index].toFixed(2)}`;
        });

        valoresX.forEach((x: number, index: number) => {
            const resultadoElement = document.querySelector<HTMLInputElement>(`#resultado${index + 1}`);
            const finalElement = document.querySelector<HTMLInputElement>(`#final${index + 1}`);
            const yElement = document.querySelector<HTMLInputElement>(`#y${index + 1}`);

            if (resultadoElement && finalElement && yElement) {
                resultadoElement.value = contas[index];
                finalElement.value = resultados[index].toFixed(2);
                yElement.value = resultados[index].toFixed(2);
            }
        });

        const resultadosFormatados: string = resultados
            .map((resultado, index) => `f(${valoresX[index]}) = ${resultado.toFixed(2)}`)
            .join('<br>');

        return {
            result: `<br>${resultadosFormatados}`,
            conta: `<br>${contas.join('<br>')}`
        };
    }
}