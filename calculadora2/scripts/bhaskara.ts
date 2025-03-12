export class Bhaskara {
    static substituicao(input: string): string {
        return input
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");
    }

    static calcularBhaskara(): { result: string, conta: string } {
        const a: number = parseFloat((document.querySelector('#viado1') as HTMLInputElement).value);
        const b: number = parseFloat((document.querySelector('#viado2') as HTMLInputElement).value);
        const c: number = parseFloat((document.querySelector('#viado3') as HTMLInputElement).value);
        const discriminant = b ** 2 - 4 * a * c;
        let resultado: string, conta: string;

        if (discriminant < 0) {
            resultado = "Sem raízes reais";
            conta = `Δ = ${discriminant} <br> X1 e X2 = Não Existe`;
        } else {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

            resultado = `x1 = ${root1}, x2 = ${root2}`;
            conta = `
                Δ = (${b})² - 4 * ${a} * ${c} <br>
                Δ = ${b ** 2} - (${-4 * a * c}) <br>
                Δ = ${discriminant} <br>
                <br>
                x1, x2 = (-${b} ± √${discriminant}) / (2 * ${a}) <br>
                x1 = (-${b} + √${discriminant}) / ${2 * a} <br>
                x1 = ${root1} <br>
                x2 = (-${b} - √${discriminant}) / ${2 * a} <br>
                x2 = ${root2}
            `;
            conta = Bhaskara.substituicao(conta)
        }

        return { result: resultado, conta };
    }
}