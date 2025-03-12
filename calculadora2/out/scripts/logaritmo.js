export class Logaritmo {
    static calcularLog() {
        const logaritmo = parseFloat(document.getElementById("logaritmo").value) || 0;
        const logaritmando = parseFloat(document.getElementById("logaritmando").value) || 0;
        const base = parseFloat(document.getElementById("base").value) || 0;
        let resultado;
        let conta = "Invalid input";
        if (logaritmo && logaritmando) {
            const baseCalculada = Math.pow(logaritmando, 1 / logaritmo);
            resultado = baseCalculada;
            conta = `Base = ${logaritmando}^(1/${logaritmo})<br> Base = ${resultado.toFixed(2)}`;
        }
        else if (logaritmando && base) {
            const logaritmoCalculado = Math.log(logaritmando) / Math.log(base);
            resultado = logaritmoCalculado;
            conta = `Logaritmo = log(${logaritmando}) / log(${base})<br> Logaritmo = ${resultado.toFixed(2)}`;
        }
        else if (logaritmo && base) {
            const logaritmandoCalculado = Math.pow(base, logaritmo);
            resultado = logaritmandoCalculado;
            conta = `Logaritmando = ${base}^${logaritmo}<br> Logaritmando = ${resultado.toFixed(2)}`;
        }
        const formattedResult = resultado !== undefined ? resultado.toFixed(2) : "NaN";
        return { result: formattedResult, conta };
    }
    static blockLogaritmo() {
        const logaritmo = document.getElementById("logaritmo");
        const logaritmando = document.getElementById("logaritmando");
        const base = document.getElementById("base");
        if (!logaritmo || !logaritmando || !base) {
            return;
        }
        const inputs = [logaritmo, logaritmando, base];
        const filledInputs = inputs.filter(input => input.value.trim() !== "").length;
        if (filledInputs === 2) {
            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    input.disabled = true;
                }
            });
        }
        else {
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }
    static getInputFaltandoLog() {
        var _a;
        const logaritmo = document.getElementById("logaritmo");
        const logaritmando = document.getElementById("logaritmando");
        const base = document.getElementById("base");
        if (!logaritmo || !logaritmando || !base) {
            return;
        }
        return ((_a = [logaritmo, logaritmando, base].find(input => input.value.trim() === "")) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
}
