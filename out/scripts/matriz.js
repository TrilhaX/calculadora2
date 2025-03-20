function getInputElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com seletor "${selector}" não encontrado.`);
    }
    return element;
}
function getNumberInputValue(selector) {
    const input = getInputElement(selector);
    return parseFloat(input.value);
}
export class Matriz {
    static matriz2x2() {
        const aa = getNumberInputValue("#aa");
        const ab = getNumberInputValue("#ab");
        const ba = getNumberInputValue("#ba");
        const bb = getNumberInputValue("#bb");
        const r1 = getNumberInputValue("#r1");
        const r2 = getNumberInputValue("#r2");
        const determinante = (aa * bb) - (ab * ba);
        const Dx = (r1 * bb) - (r2 * ab);
        const Dy = (aa * r2) - (ba * r1);
        const X = Dx / determinante;
        const Y = Dy / determinante;
        let conta = `Det(A) = (${aa} · ${bb}) - (${ab} · ${ba}) = ${determinante}<br>` +
            `Dx = (${r1} · ${bb}) - (${r2} · ${ab}) = ${Dx}<br>` +
            `Dy = (${aa} · ${r2}) - (${ba} · ${r1}) = ${Dy}<br>` +
            `X = ${Dx} / ${determinante} = ${X.toFixed(2)}<br>` +
            `Y = ${Dy} / ${determinante} = ${Y.toFixed(2)}`;
        let resultado;
        if (determinante !== 0) {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SPD`;
        }
        else if (determinante === 0 && Dx === 0 && Dy === 0) {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SPI`;
        }
        else {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SI`;
        }
        return { result: resultado, conta };
    }
    static matriz3x3() {
        const a1 = getNumberInputValue("#aa2") || 0;
        const a2 = getNumberInputValue("#ab2") || 0;
        const a3 = getNumberInputValue("#ac2") || 0;
        const a4 = getNumberInputValue("#ba2") || 0;
        const a5 = getNumberInputValue("#bb2") || 0;
        const a6 = getNumberInputValue("#bc2") || 0;
        const a7 = getNumberInputValue("#ca2") || 0;
        const a8 = getNumberInputValue("#cb2") || 0;
        const a9 = getNumberInputValue("#cc2") || 0;
        const r1 = getNumberInputValue("#r12") || 0;
        const r2 = getNumberInputValue("#r22") || 0;
        const r3 = getNumberInputValue("#r32") || 0;
        const determinante = (a1 * a5 * a9) + (a2 * a6 * a7) + (a3 * a4 * a8)
            - (a3 * a5 * a7) - (a1 * a6 * a8) - (a2 * a4 * a9);
        const Dx = (r1 * a5 * a9) + (a2 * a6 * r3) + (a3 * r2 * a8)
            - (a3 * a5 * r2) - (r1 * a6 * a8) - (a2 * r3 * a9);
        const Dy = (a1 * r2 * a9) + (r1 * a6 * a7) + (a3 * a4 * r3)
            - (a3 * a6 * a7) - (a1 * a4 * r3) - (r1 * a5 * a9);
        const Dz = (a1 * a5 * r3) + (a2 * r2 * a7) + (r1 * a4 * a8)
            - (r1 * a5 * a8) - (a1 * a7 * r2) - (a2 * a4 * r3);
        let conta = `Det(A) = (${a1} · ${a5} · ${a9}) + (${a2} · ${a6} · ${a7}) + (${a3} · ${a4} · ${a8}) - ` +
            `(${a3} · ${a5} · ${a7}) - (${a1} · ${a6} · ${a8}) - (${a2} · ${a4} · ${a9}) = ${determinante}<br>` +
            `Dx = (${r1} · ${a5} · ${a9}) + (${a2} · ${a6} · ${r3}) + (${a3} · ${r2} · ${a8}) - ` +
            `(${a3} · ${a5} · ${r2}) - (${r1} · ${a6} · ${a8}) - (${a2} · ${r3} · ${a9}) = ${Dx}<br>` +
            `Dy = (${a1} · ${r2} · ${a9}) + (${r1} · ${a6} · ${a7}) + (${a3} · ${a4} · ${r3}) - ` +
            `(${a3} · ${a6} · ${a7}) - (${a1} · ${a4} · ${r3}) - (${r1} · ${a5} · ${a9}) = ${Dy}<br>` +
            `Dz = (${a1} · ${a5} · ${r3}) + (${a2} · ${r2} · ${a7}) + (${r1} · ${a4} · ${a8}) - ` +
            `(${r1} · ${a5} · ${a8}) - (${a1} · ${a7} · ${r2}) - (${a2} · ${a4} · ${r3}) = ${Dz}`;
        let resultado;
        if (determinante !== 0) {
            const X = Dx / determinante;
            const Y = Dy / determinante;
            const Z = Dz / determinante;
            resultado = `Determinante: ${determinante.toFixed(2)}<br>` +
                `X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}, Z: ${Z.toFixed(2)}<br>`;
            conta += `<br>X = ${Dx} / ${determinante} = ${X.toFixed(2)}<br>` +
                `Y = ${Dy} / ${determinante} = ${Y.toFixed(2)}<br>` +
                `Z = ${Dz} / ${determinante} = ${Z.toFixed(2)}`;
        }
        else {
            resultado = "O sistema não tem uma solução única.";
        }
        return { result: resultado, conta };
    }
}
