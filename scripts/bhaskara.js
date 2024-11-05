export class Bhaskara{
    static calcularBhaskara() {
        const a = parseFloat(document.querySelector('#viado1').value);
        const b = parseFloat(document.querySelector('#viado2').value);
        const c = parseFloat(document.querySelector('#viado3').value);
        const discriminant = b ** 2 - 4 * a * c;
        let result;
    
        if (discriminant < 0) {
            result = "Sem raízes reais";
            conta = `Δ = ${discriminant} <br> X1 e X2 = Não Existe`;
        } else {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
            result = `x1 = ${root1}, x2 = ${root2}`;
            conta = `
                Δ = (${b})² - 4 * ${a} * ${c} <br>
                Δ = ${b ** 2} - (${-4 * a * c}) <br>
                Δ = ${discriminant} <br>
                <br>
                x1, x2 = (-${b} ± √${discriminant}) / (2 * ${a}) <br>
                <br>x1 = (-${b} + √${discriminant}) / ${2 * a} <br>
                x1 = ${root1} <br>
                <br>
                x2 = (-${b} - √${discriminant}) / ${2 * a} <br>
                x2 = ${root2}
            `;
        }
    
        return { result, conta, resultado2: '' };
    }
}
