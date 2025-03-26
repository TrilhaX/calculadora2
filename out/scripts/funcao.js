const canvas = document.getElementById("graficoCanvas");
const ctx = canvas.getContext("2d");
function getInputElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
export class Funcao {
    static calcularFuncao() {
        const valoresX = [-2, -1, 0, 1, 2];
        const inputEquacao = getInputElement("#equação");
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
        let resultados = valoresX.map(x => termos.reduce((acc, term) => acc + term.coef * Math.pow(x, term.exp), constante));
        const contas = valoresX.map((x, index) => {
            let expressao = termos
                .map(term => `(${term.coef} * ${x}^${term.exp})`)
                .join(" + ");
            return `f(${x}) = ${expressao} + ${constante} = ${resultados[index].toFixed(2)}`;
        });
        valoresX.forEach((x, index) => {
            const resultadoElement = document.querySelector(`#resultado${index + 1}`);
            const finalElement = document.querySelector(`#final${index + 1}`);
            const yElement = document.querySelector(`#y${index + 1}`);
            if (resultadoElement && finalElement && yElement) {
                resultadoElement.value = contas[index];
                finalElement.value = resultados[index].toFixed(2);
                yElement.value = resultados[index].toFixed(2);
            }
        });
        const resultadosFormatados = resultados
            .map((resultado, index) => `f(${valoresX[index]}) = ${resultado.toFixed(2)}`)
            .join('<br>');
        return {
            result: `<br>${resultadosFormatados}`,
            conta: `<br>${contas.join('<br>')}`
        };
    }
    static criarFuncao(equacaoStr) {
        let equacao = equacaoStr.replace(/F\(X\)\s*=/i, "").trim();
        const termoRegex = /([+-]?\d*\.?\d*)\s*\*?\s*x(?:\^(\d+))?|([+-]?\s*\d+\.?\d*)/gi;
        let termos = [];
        let constante = 0;
        equacao.replace(termoRegex, (match, coef, exp, constTerm) => {
            if (constTerm !== undefined && constTerm.trim() !== "") {
                constante = parseFloat(constTerm.replace(/\s+/g, ''));
            }
            else if (match.trim() !== "") {
                const coeficiente = coef && coef.trim() !== "" ? parseFloat(coef) : (match.trim().startsWith('-') ? -1 : 1);
                const expoente = exp ? parseInt(exp) : 1;
                termos.push({ coef: coeficiente, exp: expoente });
            }
            return match;
        });
        termos.sort((a, b) => b.exp - a.exp);
        return (x) => {
            return termos.reduce((acc, term) => acc + term.coef * Math.pow(x, term.exp), constante);
        };
    }
    static desenharEixos(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;
        ctx.moveTo(centroX, 0);
        ctx.lineTo(centroX, canvas.height);
        ctx.fillText("Y", centroX + 10, 10);
        ctx.moveTo(0, centroY);
        ctx.lineTo(canvas.width, centroY);
        ctx.fillText("X", canvas.width - 10, centroY - 10);
        ctx.stroke();
        const scale = 50;
        for (let i = -Math.floor(centroX / scale); i <= Math.floor(centroX / scale); i++) {
            const posX = centroX + i * scale;
            if (i !== 0) {
                ctx.fillText(i.toString(), posX - 5, centroY + 15);
            }
        }
        for (let i = -Math.floor(centroY / scale); i <= Math.floor(centroY / scale); i++) {
            const posY = centroY - i * scale;
            if (i !== 0) {
                ctx.fillText(i.toString(), centroX + 5, posY + 3);
            }
        }
    }
    static desenharFuncao(ctx, canvas, funcao, cor) {
        ctx.beginPath();
        ctx.strokeStyle = cor;
        const scale = 50;
        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;
        for (let pixelX = 0; pixelX <= canvas.width; pixelX++) {
            const x = (pixelX - centroX) / scale;
            const y = funcao(x);
            const pixelY = centroY - y * scale;
            if (pixelX === 0) {
                ctx.moveTo(pixelX, pixelY);
            }
            else {
                ctx.lineTo(pixelX, pixelY);
            }
        }
        ctx.stroke();
    }
    static atualizarGrafico() {
        const canvas = getInputElement("#graficoCanvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Não foi possível obter o contexto 2D do canvas.");
        }
        const inputEquacao = getInputElement("#equação");
        const equacaoStr = inputEquacao.value;
        const funcaoMat = Funcao.criarFuncao(equacaoStr);
        Funcao.desenharEixos(ctx, canvas);
        Funcao.desenharFuncao(ctx, canvas, funcaoMat, "red");
    }
}
