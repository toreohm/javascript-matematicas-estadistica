//Analisis personal de Juanita
//Intentemos sacar una mediana de cuanto a tenido de salario "Juanita" en todos estos años.

function encontrarPersona(nombre) {
  return salarios.find((obj) => {return obj.name === nombre;});
}

function medianaPorPersona(nombrePersona) {
  const trabajos = encontrarPersona(nombrePersona).trabajos;
  const salarios = trabajos.map(elem => elem.salario);
  return PlatziMath.calcularMediana(salarios);
}

function proyeccionPorPersona(nombrePersona) {
  const trabajos = encontrarPersona(nombrePersona).trabajos;
  let porcentajesCrecimiento = [];

  for (let i = 1; i < trabajos.length; i++) {
    const salarioActual = trabajos[i].salario;
    const salarioPasado = trabajos[i - 1].salario;
    const crecimiento = salarioActual - salarioPasado;
    const porcentajeCrecimiento = crecimiento / salarioPasado;
    porcentajesCrecimiento.push(porcentajeCrecimiento);
  }
  const medianaPorcentajesCrecimiento = PlatziMath.calcularMediana(porcentajesCrecimiento);
  const ultimoSalario = trabajos[trabajos.length - 1].salario;
  const aumentoSalario = ultimoSalario * medianaPorcentajesCrecimiento;
  const nuevoSalario = ultimoSalario + aumentoSalario;
  return parseFloat(nuevoSalario.toFixed(2));
}

//Analisis empresarial - RETO PLATZI
//Se asume que "salarios" es una variable global y que se tiene acceso a ella desde salarios.js

function obtenerListaDeEmpresas() {
  // Sacamos la lista de todas las empresas/years. Esto da un array de array de empresas
  let listaEmpresas = salarios.map((obj) => {
    let trabajos = obj.trabajos;
    let temporal = [];
    for(let trabajo of trabajos) {
      if (!temporal.includes(trabajo["empresa"])) {
         temporal.push(trabajo["empresa"]);
        }
     }
     return temporal; 
  });
  //Convertimos a una lista de empresas sin arrays dentro de arrays.
  listaEmpresas = listaEmpresas.flat();
  
  //Quitamos empresas repetidas
  listaEmpresas = listaEmpresas.reduce((col, valor) => {
    if(!col.includes(valor)) {
      col.push(valor);
    }
    return col;
  }, []);

  return listaEmpresas;
}

function filtrarInfoPorEmpresa(empresa) {
  let listInfo = salarios.reduce((lista, obj)=> {
  let trabajos = obj.trabajos;
    for(let trabajo of trabajos) {
      if(trabajo.empresa === empresa) {
        lista.push(trabajo);
      }
    }
    return lista;
  }, []); 
  return listInfo;
}

function obtenerSalariosPorYear(year, listEmpresas) {
  const listaConYear = listEmpresas.filter(obj => obj.year === year);
  return listaConYear.map(obj=>obj.salario);
}

function obtenerYearsSinRepetir(listEmpresas) {
  let listYears = listEmpresas.reduce((col, obj) => {
    let year = obj.year;
    if(!col.includes(year)) {
      col.push(year);
    }
    return col;
  }, []);
  return listYears;
}

function crearObjSalariosYear(empresa) {
  let listEmpresas = filtrarInfoPorEmpresa(empresa);
  let listYears = obtenerYearsSinRepetir(listEmpresas);
  let objSalarios = listYears.reduce((obj, year)=> {
    obj[year] = obtenerSalariosPorYear(year, listEmpresas);
    return obj;
  }, {});
  return objSalarios;
}

function crearEstructuraDeDatos() {
  let listaEmpresas = obtenerListaDeEmpresas();
  let estructuraDeDatos = listaEmpresas.reduce((obj, empresa) => {
    obj[empresa] = crearObjSalariosYear(empresa);
    return obj;
  }, {});
  return estructuraDeDatos;
}

//crearEstructuraDeDatos();
// Fin del reto

//Solución al reto Platzi de JuanDC (el profesor)
const empresas = {};

for (let persona of salarios) {
  for(let trabajo of persona.trabajos) {
    if(!empresas[trabajo.empresa]) {
      empresas[trabajo.empresa] = {};
    }

    if(!empresas[trabajo.empresa][trabajo.year]) {
      empresas[trabajo.empresa][trabajo.year] = [];
    }

    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
  }
}

//Reto Platzi - Obtener la Mediana por año por empresa

function obtenerMedianaEmpresa(empresa, year) {
  if((!empresas[empresa]) || (!empresas[empresa][year])) {
    return false;
  }
  const lista = empresas[empresa][year];
  return PlatziMath.calcularMediana(lista);
}

//Obtener la proyección por empresa

function proyeccionPorEmpresa(nombre) {
  if(!empresas[nombre]) {
    return false;
  }
  //Obtenemos todos los años en los cuales la empresa ha tenido salarios.
  const years = Object.keys(empresas[nombre]);
  //Sacamos la mediana de salarios de cada año, y los ponemos en una lista
  const listaMedianaYears = years.map((year) => {
    return obtenerMedianaEmpresa(nombre, year);
  });

  let porcentajesCrecimiento = [];

  for (let i = 1; i < listaMedianaYears.length; i++) {
    const salarioActual = listaMedianaYears[i];
    const salarioPasado = listaMedianaYears[i - 1];
    const crecimiento = salarioActual - salarioPasado;
    const porcentajeCrecimiento = crecimiento / salarioPasado;
    porcentajesCrecimiento.push(porcentajeCrecimiento);
  }
  const medianaPorcentajesCrecimiento = PlatziMath.calcularMediana(porcentajesCrecimiento);

  const ultimaMediana = listaMedianaYears[listaMedianaYears.length - 1];
  const aumento = ultimaMediana * medianaPorcentajesCrecimiento;
  const nuevaMediana = ultimaMediana + aumento;
  return parseFloat(nuevaMediana.toFixed(2));
}

//Análisis general
function medianaGeneral() {
  const listaMedianas = salarios.map(persona => medianaPorPersona(persona.name));
  const mediana = PlatziMath.calcularMediana(listaMedianas);
  return mediana;
}

function medianaTop10() {
  const listaMedianas = salarios.map(persona => medianaPorPersona(persona.name));
  listaMedianas.sort((a,b) => {return a-b;});
  const top10Porciento = Math.round(listaMedianas.length / 10);

  //Sacamos los valores más altos de la listaMedianas, en este caso el 10% (top 10)
  let listaMedianasTop10 = [];
  for(let i = 0; i < top10Porciento; i++) {
    let mediana = listaMedianas[listaMedianas.length-1-i];
    listaMedianasTop10.push(mediana);
    }

   //Otra manera de hacerlo con slice()
  {
    const limite = listaMedianas.length - top10Porciento;
    const result = listaMedianas.slice(limite);
    console.log("slice",{result});
  }
   //----------------------------------------
    //Otra manera de hacerlo con splice() Pero Muta el array original
  /*
  {
    const limite = listaMedianas.length - top10Porciento;
    const result = listaMedianas.splice(limite,top10Porciento);
    console.log("splice",{result});
  }
   */  
  //----------------------------------------

  return PlatziMath.calcularMediana(listaMedianasTop10);
}