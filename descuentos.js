function calcularDescuento() {
  const precioInput = document.getElementById("precio");
  const descuentoInput = document.getElementById("descuento");
  const cuponInput = document.querySelector("#cupon");
  const div = document.querySelector("#resultado");
  const p = div.children[1];

  let cupon = cuponInput.value.toLowerCase().trim();
  cupon = obtenerValorCupon(cupon);
  let precio = precioInput.value === '' ? false :  parseFloat(precioInput.value);
  let descuento = descuentoInput.value === '' ? false : parseFloat(descuentoInput.value);
  let total = (!precio || !(descuento!=false)) ? false : (precio * (100 - (descuento + cupon))) / 100;
  total = (total !== false) ? parseFloat(total.toFixed(2)) : false;

  //funcion para validar datos
  function validarDatos() {
    if(!precio || descuento===false) {    
      return "empty";
    }
    if(descuento > 100 || (descuento + cupon) > 100) {
      return "discount";
    }
    return true;
  }

  switch(validarDatos()) {
    case "empty": precioInput.classList.add("border-red");
                  descuentoInput.classList.add("border-red");
                  cuponInput.classList.add("border-red");
                  return;
    case "discount": p.classList.add("error-message");
                     p.innerHTML = `<strong>Error</strong><br><br>El descuento no puede ser mayor a 100`;
                     div.style.display="inline-block";
                     precioInput.classList.remove("border-red");
                     return;
    default:  //mostrar Resultado
    p.innerHTML = `<strong>Precio: </strong>${precio}<br>
                   <strong>Descuento: </strong>${descuento}<br>
                   <strong>Cupon: </strong>${cuponInput.value}<br>
                   <strong>Descuento del Cupon: </strong>${cupon}<br>
                   <strong>Descuento Total: </strong>${descuento + cupon}<br>
                   <strong>Total a pagar: </strong>${total} `;
    div.style.display="inline-block";
    precioInput.classList.remove("border-red");
    descuentoInput.classList.remove("border-red");
    cuponInput.classList.remove("border-red");
    p.classList.remove("error-message");
    return;
  }
}

function obtenerValorCupon(cupon) {
  const cuponesList = [
    {"amigotopo":10},
    {"princesaleonor":50},
    {"alexandrabotez":20},
    {"banana":5},
    {"apple":15},
    {"princesalucy":3}
  ];
  let elementoCupon = cuponesList.find((elemento) => {return elemento[cupon]});
  return elementoCupon ? elementoCupon[cupon] : 0;
}

