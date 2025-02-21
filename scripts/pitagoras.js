export class Pitagoras {
    static getInputFaltandoTrigonometria() {
        const valorA = parseFloat(document.getElementById("valorA").value) || null;
        const valorB = parseFloat(document.getElementById("valorB").value) || null;
        const valorC = parseFloat(document.getElementById("valorC").value) || null;
        const angulo = parseFloat(document.getElementById("angulo").value) || null;

        if (valorA === null && valorB !== null && angulo !== null) {
            return "valorA";
        }
        if (valorB === null && valorA !== null && angulo !== null) {
            return "valorB";
        }
        if (angulo === null && valorA !== null && valorB !== null) {
            return "angulo";
        }
        if (valorA !== null && valorC !== null && valorB === null) {
            return "valorB";
        }
        if (valorB !== null && valorC !== null && valorA === null) {
            return "valorA";
        }
        if (valorC === null && valorA !== null && valorB !== null) {
            return "valorC";
        }
        if (angulo === null && valorC !== null) {
            return "angulo";
        }

        return null;
    }

    static blockTrigonometria() {
        const valorA = document.getElementById("valorA");
        const valorB = document.getElementById("valorB");
        const valorC = document.getElementById("valorC");
        const angulo = document.getElementById("angulo");

        const filledInputs = [valorA.value, valorB.value, valorC.value, angulo.value].filter(value => value !== "").length;

        if (filledInputs >= 2 && filledInputs <= 3) {
            if (valorA.value === "") {
                valorA.disabled = true;
            }
            if (valorB.value === "") {
                valorB.disabled = true;
            }
            if (valorC.value === "") {
                valorC.disabled = true;
            }
            if (angulo.value === "") {
                angulo.disabled = true;
            }
        } else {
            valorA.disabled = false;
            valorB.disabled = false;
            valorC.disabled = false;
            angulo.disabled = false;
        }
    }

    static calcularTrigonometria() {
        const valorA = parseFloat(document.getElementById("valorA").value) || 0;
        const valorB = parseFloat(document.getElementById("valorB").value) || 0;
        const valorC = parseFloat(document.getElementById("valorC").value) || 0;
        const angulo = parseFloat(document.getElementById("angulo").value) || 0;

        let resultado, resultado2;
        let result;
        let conta;

        if (valorA && angulo) {
            const catetoB = valorA * Math.tan(angulo * Math.PI / 180);
            const hipotenusa = valorA / Math.cos(angulo * Math.PI / 180);
            resultado = catetoB.toFixed(2);
            resultado2 = hipotenusa.toFixed(2);
            result = `<br>Cateto B: ${resultado}<br> Hipotenusa: ${resultado2}`;
            conta = `<br>${valorA} * tan(${angulo})<br>${valorA} / cos(${angulo})<br>${resultado}, ${resultado2}<br><br>`;
        } else if (valorB && angulo) {
            const catetoA = valorB / Math.tan(angulo * Math.PI / 180);
            const hipotenusa = valorB / Math.sin / (angulo * Math.PI / 180);
            resultado = catetoA.toFixed(2);
            resultado2 = hipotenusa.toFixed(2);
            result = `<br>Cateto A: ${resultado}<br> Hipotenusa: ${resultado2}`;
            conta = `<br>${valorB} / tan(${angulo})<br>${valorB} / sin(${angulo})<br>${resultado}, ${resultado2}<br><br>`;
        } else if (valorA && valorB) {
            const anguloCalculado = Math.atan(valorB / valorA) * (180 / Math.PI);
            const hipotenusa = Math.sqrt(valorA ** 2 + valorB ** 2);
            resultado = anguloCalculado.toFixed(2);
            resultado2 = hipotenusa.toFixed(2);
            result = `<br>Angulo: ${resultado}<br> Hipotenusa: ${resultado2}`;
            conta = `<br>atan(${valorB} / ${valorA})<br>√(${valorA}² + ${valorB}²)<br>${resultado}, ${resultado2}<br><br>`;
        } else if (valorA && valorC) {
            const catetoB = Math.sqrt(valorC ** 2 - valorA ** 2);
            resultado = catetoB.toFixed(2);
            resultado2 = "";
            result = `<br>Cateto B: ${resultado}`;
            conta = `<br>√(${valorC}² - ${valorA}²)<br>${resultado}<br><br>`;
        } else if (valorB && valorC) {
            const catetoA = Math.sqrt(valorC ** 2 - valorB ** 2);
            resultado = catetoA.toFixed(2);
            resultado2 = "";
            result = `<br>Cateto A: ${resultado}`;
            conta = `<br>√(${valorC}² - ${valorB}²)<br>${resultado}<br><br>`;
        } else if (angulo && valorC) {
            const catetoA = valorC * Math.cos(angulo * Math.PI / 180);
            const catetoB = valorC * Math.sin(angulo * Math.PI / 180);
            resultado = catetoA.toFixed(2);
            resultado2 = catetoB.toFixed(2);
            result = `<br>Cateto A: ${resultado}<br> Cateto B: ${resultado2}`;
            conta = `<br>${valorC} * cos(${angulo})<br>${valorC} * sin(${angulo})<br>${resultado}, ${resultado2}<br><br>`;
        }

        return { result, resultado2, conta, resultado1: resultado };
    }
}