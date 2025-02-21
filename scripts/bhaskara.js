export class Bhaskara{
    static calcularBhaskara() {
        const a = parseFloat(document.querySelector('#viado1').value);
        const b = parseFloat(document.querySelector('#viado2').value);
        const c = parseFloat(document.querySelector('#viado3').value);
        const discriminant = b ** 2 - 4 * a * c;
        let resultado, conta;
    
        if (discriminant < 0) {
            resultado = "Sem raízes reais";
            conta = `Δ = ${discriminant} <br> X1 e X2 = Não Existe`;
        } else {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
            resultado = `x1 = ${root1}, x2 = ${root2}`;
            conta = `<br>
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
        }
    
        return { result: resultado, conta };
    }
}