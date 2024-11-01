export class Raiz {
    static calcularRaiz() {
        const raiz1 = parseInt(document.querySelector("#raiz-input").value);
        const raiz2 = parseInt(document.querySelector("#numero-raiz").value);
        const result = Math.pow(raiz2, 1 / raiz1);
        const conta = `Não tenho como explicar`;
    
        return { result, conta };
    }
}