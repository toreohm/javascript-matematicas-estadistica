/*Media aritmetica (promedio): (venta1 + venta2 + venta3)/cantidadDeVentas*/ 

/*La mediana es el número intermedio de un grupo de números; El grupo de numeros se ordena de menor a mayor o de mayor a menor.
Ejemplo 1: [450, 500, 600] -> La mediana es 500
Ejemplo 2: [450, 500, 600, 100000000] -> La mediana es (500 + 600) / 2 */

/*La moda es el valor que aparece con mayor frecuencia en un conjunto de datos.
Ejemplo: [1,10,14,3,24,14,10,35,13,14] -> La moda es 14 porque se repite 3 veces.
La moda no solo es con numeros, puede soportar cualquier tipo de información.*/

//Reto platzi: calcular el promedio
const sueldos = [760, 800, 450, 500, 1000, 650, 680, 460];

//Objetos, clases y métodos estáticos

const PlatziMath = {};


PlatziMath.calcularPromedio = function (lista) {
  let numElementos = lista.length;
  let total = 0;
  lista.forEach((num)=> {total += num;});
  return total/numElementos;
}

//Reto platzi: funcion para saber si una lista es par o impar.

PlatziMath.listaEsPar = function (lista) {
  return (lista.length % 2) === 0;
}
//Calcular la Mediana de una lista impar y par
PlatziMath.calcularMediana = function (lista) {
  if(this.listaEsPar(lista)) {
    lista.sort((a,b) => a-b);
    let indice1 = (lista.length/2) - 1;
    let indice2 = indice1 + 1;
    return (lista[indice1] + lista[indice2]) / 2;
  } else {
    lista.sort((a,b) => a-b);
    const indice = Math.ceil(lista.length/2) - 1;
    return lista[indice];
  }
}

//Calcular la moda de una lista
let ejemplo = [1,2,3,4,1,'a','abc',13,'abc','abc'];

PlatziMath.calcularModa = function (lista) {
  const listaCount = {};

  for(let i = 0; i < lista.length; i++) {
    const elemento = lista[i];
    if(listaCount[elemento]) {
      listaCount[elemento] += 1;
    } else {
      listaCount[elemento] = 1;
    }
  }
  const listaArray = Object.entries(listaCount);
  this.ordenarListaBidimensional(listaArray, 1);
  //Se regresa el valor que se repite más veces: La moda
  return listaArray[listaArray.length - 1][0];
}

PlatziMath.ordenarListaBidimensional = function (lista, indice) {
  return lista.sort((a,b) =>a[indice] - b[indice]);
}


