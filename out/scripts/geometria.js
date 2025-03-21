export class Geometria {
    static getInputValue(id) {
        const input = document.getElementById(id);
        return parseFloat(input.value);
    }
    static perimetroCirculo() {
        const raio = this.getInputValue("raioCirculo");
        const pi = Math.PI;
        const result = 2 * pi * raio;
        const conta = `Perímetro do círculo = 2 * π * raio<br> Perímetro do círculo = 2 * ${pi} * ${raio}<br> Perímetro do círculo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaCirculo() {
        const raio = this.getInputValue("raioCirculo");
        const pi = Math.PI;
        const result = pi * Math.pow(raio, 2);
        const conta = `Área do círculo = π * raio²<br> Área do círculo = ${pi} * ${raio}²<br> Área do círculo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static volumeEsfera() {
        const raio = this.getInputValue("raioEsfera");
        const pi = Math.PI;
        const result = (4 / 3) * pi * Math.pow(raio, 3);
        const conta = `Volume da esfera = (4/3) * π * raio³<br> Volume da esfera = (4/3) * ${pi} * ${raio}³<br> Volume da esfera = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaEsfera() {
        const raio = this.getInputValue("raioEsfera");
        const pi = Math.PI;
        const result = 4 * pi * Math.pow(raio, 2);
        const conta = `Área da esfera = 4 * π * raio²<br> Área da esfera = 4 * ${pi} * ${raio}²<br> Área da esfera = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static perimetroRetangulo() {
        const largura = this.getInputValue("larguraRetangulo");
        const altura = this.getInputValue("alturaRetangulo");
        const result = 2 * (largura + altura);
        const conta = `Perímetro do retângulo = 2 * (largura + altura)<br> Perímetro do retângulo = 2 * (${largura} + ${altura})<br> Perímetro do retângulo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaRetangulo() {
        const largura = this.getInputValue("larguraRetangulo");
        const altura = this.getInputValue("alturaRetangulo");
        const result = largura * altura;
        const conta = `Área do retângulo = largura * altura<br> Área do retângulo = ${largura} * ${altura}<br> Área do retângulo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static perimetroTriangulo() {
        const ladoA = this.getInputValue("ladoATriangulo");
        const ladoB = this.getInputValue("ladoBTriangulo");
        const ladoC = this.getInputValue("ladoCTriangulo");
        const result = ladoA + ladoB + ladoC;
        const conta = `Perímetro do triângulo = ladoA + ladoB + ladoC<br> Perímetro do triângulo = ${ladoA} + ${ladoB} + ${ladoC}<br> Perímetro do triângulo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaTriangulo() {
        const base = this.getInputValue("baseTriangulo");
        const altura = this.getInputValue("alturaTriangulo");
        const result = (base * altura) / 2;
        const conta = `Área do triângulo = (base * altura) / 2<br> Área do triângulo = (${base} * ${altura}) / 2<br> Área do triângulo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaTrianguloHero() {
        const ladoA = this.getInputValue("ladoATriangulo");
        const ladoB = this.getInputValue("ladoBTriangulo");
        const ladoC = this.getInputValue("ladoCTriangulo");
        const s = (ladoA + ladoB + ladoC) / 2;
        const result = Math.sqrt(s * (s - ladoA) * (s - ladoB) * (s - ladoC));
        const conta = `Área do triângulo = √[s * (s - a) * (s - b) * (s - c)]<br> Área do triângulo = √[${s.toFixed(2)} * (${s.toFixed(2)} - ${ladoA}) * (${s.toFixed(2)} - ${ladoB}) * (${s.toFixed(2)} - ${ladoC})]<br> Área do triângulo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaTrapezio() {
        const baseMaior = this.getInputValue("baseMaiorTrapezio");
        const baseMenor = this.getInputValue("baseMenorTrapezio");
        const altura = this.getInputValue("alturaTrapezio");
        const result = ((baseMaior + baseMenor) * altura) / 2;
        const conta = `Área do trapézio = [(baseMaior + baseMenor) * altura] / 2<br> Área do trapézio = [(${baseMaior} + ${baseMenor}) * ${altura}] / 2<br> Área do trapézio = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaParalelogramo() {
        const base = this.getInputValue("baseParalelogramo");
        const altura = this.getInputValue("alturaParalelogramo");
        const result = base * altura;
        const conta = `Área do paralelogramo = base * altura<br> Área do paralelogramo = ${base} * ${altura}<br> Área do paralelogramo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaLosango() {
        const diagonalMenor = this.getInputValue("diagonalMenorLosango");
        const diagonalMaior = this.getInputValue("diagonalMaiorLosango");
        const result = (diagonalMenor * diagonalMaior) / 2;
        const conta = `Área do losango = (diagonalMenor * diagonalMaior) / 2<br> Área do losango = (${diagonalMenor} * ${diagonalMaior}) / 2<br> Área do losango = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static perimetroQuadrado() {
        const lado = this.getInputValue("ladoQuadrado");
        const result = 4 * lado;
        const conta = `Perímetro do quadrado = 4 * lado<br> Perímetro do quadrado = 4 * ${lado}<br> Perímetro do quadrado = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaQuadrado() {
        const lado = this.getInputValue("ladoQuadrado");
        const result = Math.pow(lado, 2);
        const conta = `Área do quadrado = lado²<br> Área do quadrado = ${lado}²<br> Área do quadrado = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static volumeCubo() {
        const lado = this.getInputValue("ladoCubo");
        const result = Math.pow(lado, 3);
        const conta = `Volume do cubo = lado³ = ${lado}³<br> Volume do cubo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static volumeParalelepipedo() {
        const comprimento = this.getInputValue("comprimentoParalelepipedo");
        const largura = this.getInputValue("larguraParalelepipedo");
        const altura = this.getInputValue("alturaParalelepipedo");
        const result = comprimento * largura * altura;
        const conta = `Volume do paralelepípedo = comprimento * largura * altura<br> Volume do paralelepípedo = ${comprimento} * ${largura} * ${altura}<br> Volume do paralelepípedo = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static volumeCilindro() {
        const raio = this.getInputValue("raioCilindro");
        const altura = this.getInputValue("alturaCilindro");
        const pi = Math.PI;
        const result = pi * Math.pow(raio, 2) * altura;
        const conta = `Volume do cilindro = π * raio² * altura<br> Volume do cilindro = ${pi} * ${raio}² * ${altura}<br> Volume do cilindro = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaCilindro() {
        const raio = this.getInputValue("raioCilindro");
        const altura = this.getInputValue("alturaCilindro");
        const pi = Math.PI;
        const result = 2 * pi * raio * (raio + altura);
        const conta = `Área do cilindro = 2 * π * raio * (raio + altura)<br> Área do cilindro = 2 * ${pi} * ${raio} * (${raio} + ${altura})<br> Área do cilindro = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static volumeCone() {
        const raio = this.getInputValue("raioCone");
        const altura = this.getInputValue("alturaCone");
        const pi = Math.PI;
        const result = (1 / 3) * pi * Math.pow(raio, 2) * altura;
        const conta = `Volume do cone = (1/3) * π * raio² * altura <br> Volume do cone = (1/3) * ${pi} * ${raio}² * ${altura} <br> Volume do cone = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
    static areaCone() {
        const raio = this.getInputValue("raioCone");
        const altura = this.getInputValue("alturaCone");
        const pi = Math.PI;
        const geratriz = Math.sqrt(Math.pow(raio, 2) + Math.pow(altura, 2));
        const result = pi * raio * (raio + geratriz);
        const conta = `Área do cone = π * raio * (raio + geratriz) <br> Área do cone = ${pi} * ${raio} * (${raio} + ${geratriz.toFixed(2)}) <br> Área do cone = ${result.toFixed(2)}`;
        return { result: result.toFixed(2), conta };
    }
}
