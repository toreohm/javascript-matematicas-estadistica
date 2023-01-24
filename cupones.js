const precioInput = document.getElementById("precio");
const cuponInput = document.getElementById("cupon");
const botonCalcular = document.querySelector("#calculoFinal");
const botonReset = document.querySelector("#reset");
const pResultado = document.querySelector("#resultado");

let cuponList = [];
fillCuponList();

function cupon(name, discount) {
  this.name = name;
  this.discount = discount;
}

function fillCuponList() {
  for(let i = 0; i < 50; i++) {
    cuponList.push(new cupon("A" + i, 1 + i));
  }
}

function validarDatos() {
  if(precioInput.value==='' || parseFloat(precioInput.value) < 0) {
    precioInput.classList.add("border-red");
    return false;
  }
  if(cuponInput.value.trim()==='') {
    cuponInput.classList.add("border-red");
    return false;
  }
  return true;
}

function obtenerDescuentoCupon(cuponValue) {
  let cuponInfo = cuponList.find((elemento)=> {return cuponValue === elemento.name});
  if(cuponInfo) {
    return cuponInfo.discount;
  } else {
    return false;
  }
}

function calcularPrecioConDescuento() {
  if(!validarDatos()) {
    return;
  }
  const cuponValue = cuponInput.value.trim();
  const precio = parseFloat(precioInput.value);
  const descuento = obtenerDescuentoCupon(cuponValue);
  const total = parseFloat(((precio * (100 - descuento)) / 100).toFixed(2));

  if(descuento === false) {
    pResultado.innerHTML = `<h3>Error</h3>Cupon invalido: <mark>${cuponValue}</mark>, no se puede realizar el calculo.`
    pResultado.style.display="inline-block";
    return;
  } else {
    pResultado.innerHTML = `<h3>Resultado</h3>Cupon: ${cuponValue}<br>Descuento de cupon: ${descuento}%<br>Total a pagar: ${total}`
    pResultado.style.display="inline-block";
    cuponInput.classList.remove("border-red");
    precioInput.classList.remove("border-red");
    return;
  }
}

botonCalcular.addEventListener("click", calcularPrecioConDescuento);
botonReset.addEventListener("click", ()=> {
  pResultado.style.display="none";
  cuponInput.classList.remove("border-red");
  precioInput.classList.remove("border-red");
});
