var filtro = '';
var vConsulta = '';
var filtro2 = '';
var vConsulta2 = '';
var url = '';
var categorias = '';
var areas = '';
var ingredientes = '';
var valorTemp = "";
var criterioTemp = "";
var banBA = "";

function did(id) {
  return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded', function () {
listarValores('p_categorias', 'https://www.themealdb.com/api/json/v1/1/list.php?c=list');
listarValores('p_ingredientes', 'https://www.themealdb.com/api/json/v1/1/list.php?i=list');
listarValores('p_areas', 'https://www.themealdb.com/api/json/v1/1/list.php?a=list');

var urlParams = new URLSearchParams(window.location.search);

vConsulta2 = urlParams.get('consulta');
filtro2 = urlParams.get('filtro');
banBA = urlParams.get('ba')

if (vConsulta2 != null && filtro2 != null) {
  document.getElementById('valor_consulta').value = vConsulta2
  document.getElementById('filtro').value = filtro2
  filtro = filtro2;
  if(banBA == 'si') did('ck_ba').checked = true;
  setTimeout(function(){
    document.getElementById('ctr_btns_3').click();
  },1000)
}

  did('ck_ba').addEventListener('input', function () {
    console.log(this.checked);
    if (this.checked) {
      //
      did('valor_consulta').value = '';
      did('container_platos_galeria').innerHTML = '';
      did('ctr_btns_3').style.display = 'none';
      did('filtro').value = "Nombre";
      did('filtro').setAttribute("readonly", true)
          filtro = "Nombre";
      did('valor_consulta').addEventListener('keyup', function(){
        if(did('valor_consulta').value != ''){
          did('ctr_btns_3').click()
        }
      })
    } else {
      did('ctr_btns_3').style.display = 'block';
      did('filtro').value = "";
          filtro = "";
          did('filtro').removeAttribute("readonly")
          did('valor_consulta').removeEventListener('keyup', function(){
            if(did('valor_consulta').value != ''){
              did('ctr_btns_3').click()
            }
          })
    }
  })

  did('ctr_btns_1').addEventListener('click', function () {
    did('valor_consulta').value = "";
    did('filtro').value = "";
    did('container_platos_galeria').innerHTML = "";
    filtro = "";
  })

  did('ctr_btns_3').addEventListener('click', function () {

    vConsulta = document.getElementById('valor_consulta').value
    console.log(vConsulta, "- ", filtro)

    if (vConsulta != '') {
      console.log('vConsulta: ', vConsulta)
    } else {
      alert('Ingrese un valor a consultar')
      return false;
    }
    
    if((filtro == 'Área' && !areas.includes(vConsulta))){
      alert("Ingrese un valor para Área permitido")
      vConsulta = valorTemp
      filtro = criterioTemp
      did('valor_consulta').value = valorTemp;
      did('filtro').value = criterioTemp; 
      return false;
    }

    if((filtro == 'Ingrediente principal' && !ingredientes.includes(vConsulta))){
      alert("Ingrese un valor para Ingrediente permitido")
      vConsulta = valorTemp
      filtro = criterioTemp
      did('valor_consulta').value = valorTemp;
      did('filtro').value = criterioTemp;
      return false;
    }

    if((filtro == 'Categoría' && !categorias.includes(vConsulta))){
      alert("Ingrese un valor para Categoría permitido")
      vConsulta = valorTemp
      filtro = criterioTemp
      did('valor_consulta').value = valorTemp;
      did('filtro').value = criterioTemp;
      return false;
    }

    if (filtro != '' && ['Nombre', 'Área', 'Ingrediente principal', 'Categoría'].includes(filtro)) {
      console.log('filtro: ', filtro)

      switch (filtro) {

        case 'Nombre':
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${vConsulta}`;
          fetch(url)
            .then(function (response) {

              if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
              }
              return response.json();
            })
            .then(function (data) {
              console.log('Datos recibidos:', data);

              if (data.meals != null) {
                if (data.meals.length == 1) {
                  var urlProductos = 'https://juanpa93.github.io/gastro_mundial/productos.html?nombre=' + encodeURIComponent(vConsulta);
                  + '&filtro=' + encodeURIComponent(filtro)
                  window.location.href = urlProductos

                } else {
                  renderizarProductos(data)
                }
                valorTemp = vConsulta
                criterioTemp = filtro
              } else {
                alert("No se ha encontrado el plato con los valores proporcionados")
              }
            })
            .catch(function (error) {
              console.log("Error en la ejecución")
            });
          break;

        case 'Ingrediente principal':
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${vConsulta}`;
          fetch(url)
            .then(function (response) {

              if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
              }
              return response.json();
            })
            .then(function (data) {
              console.log('Datos recibidos:', data);
              if (data.meals != null) {
                renderizarProductos(data);
              } else {
                alert("No se ha encontrado el plato con los valores proporcionados")
              }
            })
            .catch(function (error) {
              console.log("Error consultando al API")
            });
          break;
        case 'Categoría':
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${vConsulta}`;
          fetch(url)
            .then(function (response) {

              if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
              }
              return response.json();
            })
            .then(function (data) {
              console.log('Datos recibidos:', data);
              if (data.meals != null) {
                renderizarProductos(data);
              } else {
                alert("No se ha encontrado el plato con los valores proporcionados")
              }
            })
            .catch(function (error) {
              console.log("Error consultando al API")
            });
          break;

        case 'Área':
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${vConsulta}`;
          fetch(url)
            .then(function (response) {

              if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
              }
              return response.json();
            })
            .then(function (data) {
              console.log('Datos recibidos:', data);
              if (data.meals != null) {
                renderizarProductos(data);
              } else {
                alert("No se ha encontrado el plato con los valores proporcionados")
              }
            })
            .catch(function (error) {
              console.log("Error consultando al API")
            });
          break;
      }
    } else {
      alert('seleccione un filtro válido')
      return false;
    }

  })

 

  console.log("retorno: ", vConsulta2, " - ", filtro2)

  var inputElement = document.getElementById("filtro");


  inputElement.addEventListener("input", function (event) {
    filtro = inputElement.value;
    console.log(filtro);
  });
  setTimeout(function(){
    console.log('Categorias: ', categorias)
    console.log('Areas: ', areas)
    console.log('Ingredientes: ', ingredientes)
  },2500)

})

function renderizarProductos(data) {
  var contenedor = document.getElementById("container_platos_galeria");
  contenedor.innerHTML = ''
  var name = '';
  console.log("rec en fn: ", data)
  var iteraciones = (data.meals.length <= 18) ? data.meals.length - 1 : 17;
  for (var i = 0; i <= iteraciones; i++) {
    var nuevoDiv = document.createElement("button");


    nuevoDiv.classList.add('platos')
    var vIdentificador = data.meals[i].strMeal.replaceAll(' ', '-')
    name = data.meals[i].strMeal;
    nuevoDiv.id = `card_${vIdentificador}`
    nuevoDiv.innerHTML = `
  <h5 id="h2_${vIdentificador}">${data.meals[i].strMeal}</h5>
  <img id="img_${vIdentificador}" style="height: 100px;" src="${data.meals[i].strMealThumb}" alt="">`;
    console.log(nuevoDiv)



    nuevoDiv.addEventListener('click', function (event) {
      var auxBA = did('ck_ba').checked ? 'si' : 'no' 
      console.log(event.target.id)
      var vValorConsulta = event.target.id.replaceAll('-', ' ').replace('card_', '').replace('h2_', '').replace('img_', '')
      var urlProductos2 = 'https://juanpa93.github.io/gastro_mundial/productos.html?nombre=' + encodeURIComponent(vValorConsulta) +
        '&consulta=' + encodeURIComponent(vConsulta) + '&filtro=' + encodeURIComponent(filtro) + '&ba=' + encodeURIComponent(auxBA)
      console.log(i, ": ", urlProductos2)
      window.location.href = urlProductos2;
     
    })
    contenedor.appendChild(nuevoDiv);
    valorTemp = vConsulta
    criterioTemp = filtro
    console.log("redner: ", valorTemp, criterioTemp)
  }

}

function listarValores(elemento, url){
  var valores = '';
  fetch(url)

  .then(function(response) {

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue exitosa');
    }
    return response.json();
  })
  .then(function(data) {
    console.log('lista recibida:', data);
    switch(elemento){
      case 'p_categorias':
        data.meals.forEach(element => {
          valores += element.strCategory +', '
        });
        categorias = valores.split(', ')
        break;
        case 'p_ingredientes':
        data.meals.forEach(element => {
          valores += element.strIngredient +', '
        });
        ingredientes = valores.split(', ')
        break;
        case 'p_areas':
        data.meals.forEach(element => {
          valores += element.strArea +', '
        });
        areas = valores.split(', ')
        break;

    }
    
    did(elemento).innerText = valores.slice(0,-2).split(',').sort().join(', ') + '.'
  })
  .catch(function(error) {
    console.log("Error en la ejecución")
  });
}

