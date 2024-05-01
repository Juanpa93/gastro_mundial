var filtro = '';
var vConsulta = '';
var url = '';
var auxBA = '';

//www.themealdb.com/api/json/v1/1/list.php?c=list
function dqs(qs) {
  return document.querySelector(qs);
}

document.addEventListener('DOMContentLoaded', function(){

  var urlParams = new URLSearchParams(window.location.search);
  var nombre = urlParams.get('nombre');
  vConsulta = urlParams.get('consulta');
  auxBA = urlParams.get('ba');
  filtro = urlParams.get('filtro');
    console.log("Nombre recibido: ", nombre)

  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`;
  fetch(url)

  .then(function(response) {

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue exitosa');
    }
    return response.json();
  })
  .then(function(data) {
    console.log('Datos recibidos:', data);

    if(data.meals != null){
        var contenedor = document.getElementById("container_platos");

        var nuevoDiv = document.createElement("div");

        var ingredientesConcatenados = "";


for (var i = 1; i <= 20; i++) {
  var atributo = "strIngredient" + i;
  if (data.meals[0].hasOwnProperty(atributo)) {
    if(data.meals[0][atributo] != null && data.meals[0][atributo] != '') ingredientesConcatenados += ' ✔ ' + data.meals[0][atributo] + " <br> ";
  } 
}

ingredientesConcatenados = ingredientesConcatenados.slice(0, -2);

console.log("Ingredientes concatenados:", ingredientesConcatenados);

    nuevoDiv.classList.add('platos')
        nuevoDiv.innerHTML = `
        <h2 id='titulo_plato_v2'>${data.meals[0].strMeal}</h2>
        <img id='img_plato_v2' style="height: 150px;" src="${data.meals[0].strMealThumb}" alt="">
            <div id='div1_plato_v2'><h3>Ingredientes: </h3> <p>${ingredientesConcatenados}</p></div>
            <div id='div2_plato_v2'><h3>Instrucciones: </h3> <p>${data.meals[0].strInstructions}</p></div>
            <div id='div3_plato_v2'><h3>Etiquetas: </h3> <p>${(data.meals[0].strTags == null) ?'No disponibles': data.meals[0].strTags}</p></div>`;
    console.log(nuevoDiv)
    
    contenedor.appendChild(nuevoDiv);
    dqs('#div1_plato_v2').style.display = 'none'
    dqs('#div2_plato_v2').style.display = 'none'
    dqs('#div3_plato_v2').style.display = 'none'
    }else{
        alert("No se ha encontrado el plato con los valores proporcionados")
    }
  })
  .catch(function(error) {
    console.log("Error en la ejecución")
  });
  
 
  
  
  

    setTimeout(function(){dqs('#div1_plato_v2').style.display = 'block'},400)
    setTimeout(function(){dqs('#div2_plato_v2').style.display = 'block'},500)
    setTimeout(function(){dqs('#div3_plato_v2').style.display = 'block'},600)
  document.getElementById('btn_home').addEventListener('click', function(){
    window.location.href = 'https://juanpa93.github.io/gastro_mundial/index.html?' +
    'consulta=' + encodeURIComponent(vConsulta) +  '&filtro=' + encodeURIComponent(filtro)
     + '&ba=' + encodeURIComponent(auxBA);
  });
  });

