export class Raiz {
    static calcularRaiz(): {result: string, conta: string} {
        const raiz1: number = parseInt((document.querySelector("#raiz-input") as HTMLInputElement).value, 10);
        const raiz2: number = parseInt((document.querySelector("#numero-raiz") as HTMLInputElement).value, 10);
        const resultado: number = Math.pow(raiz2, 1 / raiz1);
        const conta: string = `Não tenho como explicar`;
    
        return { result: resultado.toFixed(2), conta };
    }
}