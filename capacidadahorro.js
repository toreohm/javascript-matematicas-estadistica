/* CAPACIDAD DE AHORRO */
/*La capacidad de ahorro es la posibilidad que tienen las personas de separar un porcentaje de sus ingresos y reservarlo para su uso en el futuro; siempre y cuando hacerlo no signifique desmejorar la calidad de vida o vivir “con las justas”.
La capacidad de ahorro solo existe si los egresos familiares son inferiores a los ingresos. Es decir, si mensualmente gastas menos de lo que ganas. Esto te dará la certeza que estás en posibilidad de comenzar a ahorrar. */

/*FORMULAS
La regla 50/30/20: una fórmula sencilla para lograr ahorrar y controlar gastos
Ejemplo: Ingresos: 1000, 

Entonces 50% a los gastos fijo (gastos básicos: hipoteca, facturas, despensa) -> gastoFijo: 500

30% para gastos personales (ocio, cine, salir a cenar) -> gastosPersonales: 300

20% para el ahorro -> ahorro:200

IMPORTANTE: Si de ese 50% o 30% sobra algo, el dinero siempre tendrá que ir a parar a la parte del 20% de ahorro. */ 

const ingresosInput = document.querySelector("#ingresos");
const resultadoInput = document.querySelector("#result");
const botonCalcular = document.querySelector("#calcular");
const mensajeErrorP = document.querySelector("#mensaje");
const mensajeErrorDiv = document.querySelector(".error-message");
const botonError = document.querySelector("#botonError");

function validarDatos() {
  let ingresos = ingresosInput.value;
  if(ingresos.trim() === "") {
    return [false, "Tienes que especificar los ingresos."];
  }
  if(parseFloat(ingresos) <= 0) {
    return [false, "Tus ingresos deben ser mayor a cero."];
  }
  return [true];
}

function calcularCapacidadAhorro() {
  let respuesta = validarDatos();
  if(respuesta[0]) {
    let ingresos = parseFloat(ingresosInput.value);
    let gastoFijo = parseFloat((ingresos * 0.5).toFixed(2));
    let gastosPersonales = parseFloat((ingresos * 0.3).toFixed(2));
    let ahorro = parseFloat((ingresos * 0.2).toFixed(2));
  
    //Mostrar resultado.
    resultadoInput.value = `Desglose de ingresos:
    
Gasto fijo (50%): $${gastoFijo}
Gastos personales (30%): $${gastosPersonales}
Ahorro (20%): $${ahorro}`;
  } else {
    mensajeErrorP.innerText = respuesta[1];
    mensajeErrorDiv.classList.remove("inactive");
  }
  
}

botonCalcular.addEventListener("click", calcularCapacidadAhorro);
botonError.addEventListener("click", () => {mensajeErrorDiv.classList.add("inactive");});