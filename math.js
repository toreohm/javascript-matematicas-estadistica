console.group('Cuadrado');

const ladoCuadrado = 5;
const perimetroCuadrado = ladoCuadrado * 4;
const areaCuadrado = ladoCuadrado * ladoCuadrado;

console.log({
  ladoCuadrado,
  perimetroCuadrado,
  areaCuadrado
});

function calcularCuadrado(lado) {
  return {
    perimetro: lado * 4,
    area: lado * lado
  };
}

console.groupEnd('Cuadrado');
console.group('Triangulo');

const ladoTriangulo1 = 6;
const ladoTriangulo2 = 6;
const ladoTrianguloBase = 4;
const alturaTriangulo = 5.5;

const perimetroTriangulo = ladoTriangulo1 + ladoTriangulo2 + ladoTrianguloBase;
const areaTriangulo = (ladoTrianguloBase * alturaTriangulo) / 2;

console.log({
  ladoTriangulo1,
  ladoTriangulo2,
  ladoTrianguloBase,
  alturaTriangulo,
  perimetroTriangulo,
  areaTriangulo
});

function calcularTriangulo(lado1, lado2, base, altura) {
  return {
    perimetro: lado1 + lado2 + base,
    area: (base * altura) / 2
  };
}

console.groupEnd('Triangulo');

console.group("circle");
const radioCirculo = 3;
const diametroCirculo = radioCirculo * 2;
const PI = Math.PI;

const circunferencia = diametroCirculo * PI;
const areaCirculo = (radioCirculo ** 2) * PI;

console.log({
  radioCirculo,
  diametroCirculo,
  PI,
  circunferencia,
  areaCirculo  
});

function calcularCirculo(radio) {
  const diametro = radio * 2;
  const radioCuadrado = Math.pow(radio,2);
  return {
    circunferencia: diametro * PI,
    area: radioCuadrado * PI
  };
}

console.groupEnd("circle");

console.group("triangulo isosceles");
/*Un triangulo isosceles tienes dos lados iguales y uno desigual
Formula: h = √(a**2) - (b**2)/4 
h = altura, a = lado1, b = base*/ 

function calcularAlturaTriangulo(lado1, base) {
  if(lado1 === base) {
    console.error("Este no es un triangulo isosceles.");
  } else {
    //h = raizcuadrada(lado1 ** 2 - (b**2)/4);
    return Math.sqrt((lado1**2) - ((base**2)/4));
  }
}
console.groupEnd("triangulo isosceles");

//RETO PLATZI Sabiendo lo que miden los 3 lados, encuentra la ALTURA.
//Debe ser un triangulo escaleno (todos los lados diferentes)
/*FORMULA:  */
console.group("Triangulo escaleno");
function calcularAlturaTrianguloEscaleno(lado1, lado2, lado3) {
  if(lado1 == lado2 || lado1 == lado3 || lado2 == lado3) {
    return false;
  } 
  //formulas
  const semiPerimetro = (lado1 + lado2 + lado3) / 2;
  const raizCuadrada =  Math.sqrt(semiPerimetro * ((semiPerimetro - lado1) * (semiPerimetro - lado2) * (semiPerimetro - lado3)));
  return Math.round((2/lado1) * raizCuadrada);
}
console.groupEnd("Triangulo escaleno");
