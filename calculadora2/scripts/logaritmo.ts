export class Logaritmo {
    static calcularLog(): { result: string; conta: string } {
        const logaritmo = parseFloat((document.getElementById("logaritmo") as HTMLInputElement).value) || 0;
        const logaritmando = parseFloat((document.getElementById("logaritmando") as HTMLInputElement).value) || 0;
        const base = parseFloat((document.getElementById("base") as HTMLInputElement).value) || 0;
    
        let resultado: number | undefined;
        let conta: string = "Invalid input";
    
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
        const logaritmo = document.getElementById("logaritmo") as HTMLInputElement | null;
        const logaritmando = document.getElementById("logaritmando") as HTMLInputElement | null;
        const base = document.getElementById("base") as HTMLInputElement | null;
    
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
        } else {
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }

    static getInputFaltandoLog() {
        const logaritmo = document.getElementById("logaritmo") as HTMLInputElement | null;
        const logaritmando = document.getElementById("logaritmando") as HTMLInputElement | null;
        const base = document.getElementById("base") as HTMLInputElement | null;
    
        if (!logaritmo || !logaritmando || !base) {
            return;
        }
        return [logaritmo, logaritmando, base].find(input => input.value.trim() === "")?.id || null;
    }
}