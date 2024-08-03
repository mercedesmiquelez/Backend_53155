const suma = (...nums) => {
    if (nums.length === 0) return 0; //medimos la longitud del array
  
    if (!nums.every((num) => typeof num === "number")) return null;  //metodo que verifica si todos los elementos del array cumplen con la condicion que pasamos por callback da true
  
    return nums.reduce((acc, num) => acc + num, 0); //el reduce es un acumulador (hace la suma de todos los numeros que tenemos). Usamos el callback, en el primer param tenemos el acumulador y en el segundo param tenemos el num de cada elemento del array.
  };
  
  let testsPasados = 0;
  //la funcion suma debe devolver un null si algun parametro no es un numero:
  console.log("Test 1: La función suma debe devolver un null si algún parámetro no es un número");
  let resultTest1 = suma("30", 3);
  
  if (resultTest1 === null) {
    console.log("Test 1 pasado");
    testsPasados++;
  } else {
    console.log(`Test 1 fallado, se recibió: ${resultTest1}, se esperaba: null`);
  }
  
  //la funcion suma debe devolver 0 si no se le pasa ningun parametro
  console.log("Test 2: La función suma debe devolver 0 si no se le pasa ningún parámetro");
  let resultTest2 = suma();
  
  if (resultTest2 === 0) {
    console.log("Test 2 pasado");
    testsPasados++;
  } else {
    console.log(`Test 2 fallado, se recibió: ${resultTest2}, se esperaba: 0`);
  }
  console.log("Test 3: La función suma debe poder sumar dos números correctamente");
  
  //la funcion suma debe poder sumar dos numeros correctamente
  let resultTest3 = suma(10, 5);
  
  if (resultTest3 === 15) {
    console.log("Test 3 pasado");
    testsPasados++;
  } else {
    console.log(`Test 3 fallado, se recibió: ${resultTest3}, se esperaba: 15`);
  }
  
  //La función suma debe poder sumar debe poder hacer la suma de varios númer
  console.log("Test 4: La función suma debe poder sumar debe poder hacer la suma de varios números");
  
  let resultTest4 = suma(10, 5, 2, 5);
  
  if (resultTest4 === 22) {
    console.log("Test 4 pasado");
    testsPasados++;
  } else {
    console.log(`Test 4 fallado, se recibió: ${resultTest4}, se esperaba: 22`);
  }
  
  //verificamos si pasaron todos los tests
  console.log("");
  if (testsPasados === 4) {
    console.log("Todos los test pasaron");
  } else {
    console.log(`Tests pasado ${testsPasados} de 4`);
  }
  
  console.log("");
  console.log("Find de los test");