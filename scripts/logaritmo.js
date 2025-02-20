export class Logaritmo {
    static calcularLog() {
        const logaritmo = parseFloat(document.getElementById("logaritmo").value) || 0;
        const logaritmando = parseFloat(document.getElementById("logaritmando").value) || 0;
        const base = parseFloat(document.getElementById("base").value) || 0;
        let conta, resultado;
    
        if (logaritmo && logaritmando) {
            const baseCalculada = Math.pow(logaritmando, 1 / logaritmo);
            resultado = baseCalculada.toFixed(2);
            conta = `Base = ${logaritmando}^(1/${logaritmo})<br> Base = ${resultado}`;
        }
        else if (logaritmando && base) {
            const logaritmoCalculado = Math.log(logaritmando) / Math.log(base);
            resultado = logaritmoCalculado.toFixed(2);
            conta = `Logaritmo = log(${logaritmando}) / log(${base})<br> Logaritmo = ${resultado}`;
        }
        else if (logaritmo && base) {
            const logaritmandoCalculado = Math.pow(base, logaritmo);
            resultado = logaritmandoCalculado.toFixed(2);
            conta = `Logaritmando = ${base}^${logaritmo}<br> Logaritmando = ${resultado}`;
        } else {
            return { result: "Preencha dois valores.", conta: "" };
        }
    
        return { result: parseFloat(resultado).toFixed(2), conta, resultado2: '' };
    
    }

    static blockLogaritmo() {
        const logaritmo = document.getElementById("logaritmo");
        const logaritmando = document.getElementById("logaritmando");
        const base = document.getElementById("base");
    
        const filledInputs = [logaritmo.value, logaritmando.value, base.value].filter(value => value !== "").length;
    
        if (filledInputs === 2) {
            if (logaritmo.value === "") {
                logaritmo.disabled = true;
            }
            if (logaritmando.value === "") {
                logaritmando.disabled = true;
            }
            if (base.value === "") {
                base.disabled = true;
            }
        } else {
            logaritmo.disabled = false;
            logaritmando.disabled = false;
            base.disabled = false;
        }
    }

    static getInputFaltandoLog() {
        const logaritmo = document.getElementById("logaritmo");
        const logaritmando = document.getElementById("logaritmando");
        const base = document.getElementById("base");
    
    
        return [logaritmo, logaritmando, base].find(input => input.value === "")?.id || null;
    }
}