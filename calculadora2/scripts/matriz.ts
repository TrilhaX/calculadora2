export class Matriz {
    static matriz2x2(): { result: string, conta: string } {
        let aa = parseFloat((document.querySelector("#aa") as HTMLInputElement).value);
        let ab = parseFloat((document.querySelector("#ab") as HTMLInputElement).value);
        let ba = parseFloat((document.querySelector("#ba") as HTMLInputElement).value);
        let bb = parseFloat((document.querySelector("#bb") as HTMLInputElement).value);
        let r1 = parseFloat((document.querySelector("#r1") as HTMLInputElement).value);
        let r2 = parseFloat((document.querySelector("#r2") as HTMLInputElement).value);
        let resultado: string, conta: string;

        let determinante = (aa * bb) - (ab * ba);
        let Dx = r1 * bb - r2 * ab;
        let Dy = aa * r2 - ba * r1;
        let X = Dx / determinante;
        let Y = Dy / determinante;

        conta = `Det(A) = (${aa}·${bb}) - (${ab}·${ba}) = ${determinante}<br>` +
                `Dx = (${r1}·${bb}) - (${r2}·${ab}) = ${Dx}<br>` +
                `Dy = (${aa}·${r2}) - (${ba}·${r1}) = ${Dy}<br>` +
                `X = ${Dx} / ${determinante} = ${X.toFixed(2)}<br>` +
                `Y = ${Dy} / ${determinante} = ${Y.toFixed(2)}`;

        if (determinante !== 0) {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SPD`;
        } else if (determinante === 0 && Dx === 0 && Dy === 0) {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SPI`;
        } else {
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}<br>Classificação: SI`;
        }
        
        return { result: resultado, conta };
    }

    static matriz3x3(): { result: string, conta: string } {
        let a1 = parseFloat((document.querySelector("#aa2") as HTMLInputElement).value) || 0;
        let a2 = parseFloat((document.querySelector("#ab2") as HTMLInputElement).value) || 0;
        let a3 = parseFloat((document.querySelector("#ac2") as HTMLInputElement).value) || 0;
        let a4 = parseFloat((document.querySelector("#ba2") as HTMLInputElement).value) || 0;
        let a5 = parseFloat((document.querySelector("#bb2") as HTMLInputElement).value) || 0;
        let a6 = parseFloat((document.querySelector("#bc2") as HTMLInputElement).value) || 0;
        let a7 = parseFloat((document.querySelector("#ca2") as HTMLInputElement).value) || 0;
        let a8 = parseFloat((document.querySelector("#cb2") as HTMLInputElement).value) || 0;
        let a9 = parseFloat((document.querySelector("#cc2") as HTMLInputElement).value) || 0;
        let r1 = parseFloat((document.querySelector("#r12") as HTMLInputElement).value) || 0;
        let r2 = parseFloat((document.querySelector("#r22") as HTMLInputElement).value) || 0;
        let r3 = parseFloat((document.querySelector("#r32") as HTMLInputElement).value) || 0;
        let resultado: string, conta: string;

        let determinante = (a1 * a5 * a9) + (a2 * a6 * a7) + (a3 * a4 * a8) - (a3 * a5 * a7) - (a1 * a6 * a8) - (a2 * a4 * a9);
        
        let Dx = (r1 * a5 * a9) + (a2 * a6 * r3) + (a3 * r2 * a8) - (a3 * a5 * r2) - (r1 * a6 * a8) - (a2 * r3 * a9);
        let Dy = (a1 * r2 * a9) + (r1 * a6 * a7) + (a3 * a4 * r3) - (a3 * a6 * a7) - (a1 * a4 * r3) - (r1 * a5 * a9);
        let Dz = (a1 * a5 * r3) + (a2 * r2 * a7) + (r1 * a4 * a8) - (r1 * a5 * a8) - (a1 * a7 * r2) - (a2 * a4 * r3);

        conta = `Det(A) = (${a1}·${a5}·${a9}) + (${a2}·${a6}·${a7}) + (${a3}·${a4}·${a8}) - (${a3}·${a5}·${a7}) - (${a1}·${a6}·${a8}) - (${a2}·${a4}·${a9}) = ${determinante}<br>` +
                `Dx = (${r1}·${a5}·${a9}) + (${a2}·${a6}·${r3}) + (${a3}·${r2}·${a8}) - (${a3}·${a5}·${r2}) - (${r1}·${a6}·${a8}) - (${a2}·${r3}·${a9}) = ${Dx}<br>` +
                `Dy = (${a1}·${r2}·${a9}) + (${r1}·${a6}·${a7}) + (${a3}·${a4}·${r3}) - (${a3}·${a6}·${a7}) - (${a1}·${a4}·${r3}) - (${r1}·${a5}·${a9}) = ${Dy}<br>` +
                `Dz = (${a1}·${a5}·${r3}) + (${a2}·${r2}·${a7}) + (${r1}·${a4}·${a8}) - (${r1}·${a5}·${a8}) - (${a1}·${a7}·${r2}) - (${a2}·${a4}·${r3}) = ${Dz}`;

        if (determinante !== 0) {
            let X = Dx / determinante;
            let Y = Dy / determinante;
            let Z = Dz / determinante;
            resultado = `Determinante: ${determinante.toFixed(2)}<br>X: ${X.toFixed(2)}, Y: ${Y.toFixed(2)}, Z: ${Z.toFixed(2)}`;
            conta += `<br>X = ${Dx} / ${determinante} = ${X.toFixed(2)}<br>` +
                     `Y = ${Dy} / ${determinante} = ${Y.toFixed(2)}<br>` +
                     `Z = ${Dz} / ${determinante} = ${Z.toFixed(2)}`;
        } else {
            resultado = "O sistema não tem uma solução única.";
        }
    
        return { result: resultado, conta };
    }        
}