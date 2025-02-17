export class Funcao {
    static funcaoExponencial() {
        const valoresX = [-3, -2, -1, 0, 1, 2, 3];
        const inputA = document.querySelector("#equação");
        const a = parseFloat(inputA.value);
    
        if (isNaN(a)) {
            return { result: "Valor de 'a' inválido.", conta: "" };
        } else {
            const resultados = valoresX.map(x => Math.pow(a, x));
            const contas = valoresX.map((x, index) => `f(${x}) = ${resultados[index].toFixed(2)}`).join('<br>');
            return { result: resultados, contas, resultado2: '' };
        }
    }
    
    static funcaoQuadratica() {
        const A3 = parseFloat(document.querySelector(".BA").value);
        const B3 = parseFloat(document.querySelector(".BB").value);
        const C2 = parseFloat(document.querySelector(".BC").value);
        const delta2 = B3 * B3 - 4 * A3 * C2;
    
        if (isNaN(A3) || isNaN(B3) || isNaN(C2)) {
            resultado = "Valores inválidos para a função quadrática."
            conta = "";
        }
    
        if (delta2 < 0) {
            resultado = "Delta negativo, sem raízes reais."
            conta = '';
        } else {
            const x1 = (-B3 + Math.sqrt(delta2)) / (2 * A3);
            const x2 = (-B3 - Math.sqrt(delta2)) / (2 * A3);
            const Xv = -B3 / (2 * A3);
            const Yv = -delta2 / (4 * A3);
            const EY = C2;
        }
    
        return { result: resultado, conta, resultado2: '' };
    }
}