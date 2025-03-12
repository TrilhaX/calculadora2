export class Raiz {
    static calcularRaiz() {
        const raiz1 = parseInt(document.querySelector("#raiz-input").value, 10);
        const raiz2 = parseInt(document.querySelector("#numero-raiz").value, 10);
        const resultado = Math.pow(raiz2, 1 / raiz1);
        const conta = `Não tenho como explicar`;
        return { result: resultado.toFixed(2), conta };
    }
}
