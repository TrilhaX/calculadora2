export class Pitagoras {
    static getInputFaltandoTrigonometria(): string[] | null {
        const valorA = parseFloat((document.getElementById("valorA") as HTMLInputElement).value);
        const valorB = parseFloat((document.getElementById("valorB") as HTMLInputElement).value);
        const valorC = parseFloat((document.getElementById("valorC") as HTMLInputElement).value);
        const angulo = parseFloat((document.getElementById("angulo") as HTMLInputElement).value);
    
        const inputsFaltando: string[] = [];
    
        if (!valorA && valorB && angulo && valorC) {
            inputsFaltando.push("valorA");
        }
        if (!valorB && valorA && angulo && valorC) {
            inputsFaltando.push("valorB");
        }
        if (!angulo && valorA && valorB && valorC) {
            inputsFaltando.push("angulo");
        }
        if (!valorC && valorA && valorB && angulo) {
            inputsFaltando.push("valorC");
        }
    
        return inputsFaltando.length > 0 ? inputsFaltando : null;
    }

    static blockTrigonometria(): void {
        const valorAInput = document.getElementById("valorA") as HTMLInputElement;
        const valorBInput = document.getElementById("valorB") as HTMLInputElement;
        const valorCInput = document.getElementById("valorC") as HTMLInputElement;
        const anguloInput = document.getElementById("angulo") as HTMLInputElement;
        if (!valorAInput || !valorBInput || !valorCInput || !anguloInput) {
            console.error("Um ou mais elementos não foram encontrados.");
            return;
        }
        const valorA = parseFloat(valorAInput.value);
        const valorB = parseFloat(valorBInput.value);
        const valorC = parseFloat(valorCInput.value);
        const angulo = parseFloat(anguloInput.value);
        const inputs = [valorAInput, valorBInput, valorCInput, anguloInput];
        const filledInputs = inputs.filter(input => input.value.trim() !== "").length;
    
        if (filledInputs >= 2 && filledInputs <= 3) {
            inputs.forEach(input => {
                input.disabled = input.value.trim() === "";
            });
        } else {
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }

    static calcularTrigonometria(): { result: string; conta: string } {
        const valorAInput = document.getElementById("valorA") as HTMLInputElement;
        const valorBInput = document.getElementById("valorB") as HTMLInputElement;
        const valorCInput = document.getElementById("valorC") as HTMLInputElement;
        const anguloInput = document.getElementById("angulo") as HTMLInputElement;
    
        const valorA = parseFloat(valorAInput.value);
        const valorB = parseFloat(valorBInput.value);
        const valorC = parseFloat(valorCInput.value);
        const angulo = parseFloat(anguloInput.value);
    
        let result: string = '';
        let conta: string = '';
    
        if (valorA && angulo) {
            const catetoB = valorA * Math.tan(angulo * Math.PI / 180);
            const hipotenusa = valorA / Math.cos(angulo * Math.PI / 180);
            result = `<br>Cateto B: ${catetoB.toFixed(2)}<br> Hipotenusa: ${hipotenusa.toFixed(2)}`;
            conta = `<br>${valorA} * tan(${angulo})<br>${valorA} / cos(${angulo})<br>${catetoB.toFixed(2)}, ${hipotenusa.toFixed(2)}<br><br>`;
            valorBInput.value = catetoB.toFixed(2);
            valorCInput.value = hipotenusa.toFixed(2);
            valorBInput.disabled = false;
            valorCInput.disabled = false;
        } else if (valorB && angulo) {
            const catetoA = valorB / Math.tan(angulo * Math.PI / 180);
            const hipotenusa = valorB / Math.sin(angulo * Math.PI / 180);
            result = `<br>Cateto A: ${catetoA.toFixed(2)}<br> Hipotenusa: ${hipotenusa.toFixed(2)}`;
            conta = `<br>${valorB} / tan(${angulo})<br>${valorB} / sin(${angulo})<br>${catetoA.toFixed(2)}, ${hipotenusa.toFixed(2)}<br><br>`;
            valorAInput.value = catetoA.toFixed(2);
            valorCInput.value = hipotenusa.toFixed(2);
            valorAInput.disabled = false;
            valorCInput.disabled = false;
        } else if (valorA && valorB) {
            const anguloCalculado = Math.atan(valorB / valorA) * (180 / Math.PI);
            const hipotenusa = Math.sqrt(valorA ** 2 + valorB ** 2);
            result = `<br>Angulo: ${anguloCalculado.toFixed(2)}<br> Hipotenusa: ${hipotenusa.toFixed(2)}`;
            conta = `<br>atan(${valorB} / ${valorA})<br>√(${valorA}² + ${valorB}²)<br>${anguloCalculado.toFixed(2)}, ${hipotenusa.toFixed(2)}<br><br>`;
            anguloInput.value = anguloCalculado.toFixed(2);
            valorCInput.value = hipotenusa.toFixed(2);
            anguloInput.disabled = false;
            valorCInput.disabled = false;
        } else if (valorA && valorC) {
            const catetoB = Math.sqrt(valorC ** 2 - valorA ** 2);
            result = `<br>Cateto B: ${catetoB.toFixed(2)}`;
            conta = `<br>√(${valorC}² - ${valorA}²)<br>${catetoB.toFixed(2)}<br><br>`;
            valorBInput.value = catetoB.toFixed(2);
            valorBInput.disabled = false;
        } else if (valorB && valorC) {
            const catetoA = Math.sqrt(valorC ** 2 - valorB ** 2);
            result = `<br>Cateto A: ${catetoA.toFixed(2)}`;
            conta = `<br>√(${valorC}² - ${valorB}²)<br>${catetoA.toFixed(2)}<br><br>`;
            valorAInput.value = catetoA.toFixed(2);
            valorAInput.disabled = false;
        } else if (angulo && valorC) {
            const catetoA = valorC * Math.cos(angulo * Math.PI / 180);
            const catetoB = valorC * Math.sin(angulo * Math.PI / 180);
            result = `<br>Cateto A: ${catetoA.toFixed(2)}<br> Cateto B: ${catetoB.toFixed(2)}`;
            conta = `<br>${valorC} * cos(${angulo})<br>${valorC} * sin(${angulo})<br>${catetoA.toFixed(2)}, ${catetoB.toFixed(2)}<br><br>`;
            valorAInput.value = catetoA.toFixed(2);
            valorBInput.value = catetoB.toFixed(2);
            valorAInput.disabled = false;
            valorBInput.disabled = false;
        } else {
            result = 'Invalid input combination';
            conta = 'Invalid input combination';
        }
    
        return { result, conta };
    }
}