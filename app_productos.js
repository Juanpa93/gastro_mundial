var filtro = '';
var vConsulta = '';
var url = '';
var auxBA = '';
//var dominio = "http://127.0.0.1:5501";
var ingredientesConcatenados2 = "";
var dominio = "https://juanpa93.github.io/gastro_mundial"

//www.themealdb.com/api/json/v1/1/list.php?c=list
function did(id) {
  return document.getElementById(id);
}

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
  fnAddClick_btn_WA();
  fnAddClick_btn_des();
    //fnCompartir();

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
        ingredientesConcatenados2 = "";


for (var i = 1; i <= 20; i++) {
  var atributo = "strIngredient" + i;
  if (data.meals[0].hasOwnProperty(atributo)) {
    if(data.meals[0][atributo] != null && data.meals[0][atributo] != '') ingredientesConcatenados += ' ✔ ' + data.meals[0][atributo] + " <br> ";
    if(data.meals[0][atributo] != null && data.meals[0][atributo] != '') ingredientesConcatenados2 += ' - ' + data.meals[0][atributo];
  
  } 
}

ingredientesConcatenados = ingredientesConcatenados.slice(0, -1);

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
    //dqs('#div1_plato_v2').style.display = 'none'
    //dqs('#div2_plato_v2').style.display = 'none'
    //dqs('#div3_plato_v2').style.display = 'none'
    }else{
        alert("No se ha encontrado el plato con los valores proporcionados")
    }
  })
  .catch(function(error) {
    console.log("Error en la ejecución")
  });
  
 
  
  
  

    //setTimeout(function(){dqs('#div1_plato_v2').style.display = 'block'},400)
    //setTimeout(function(){dqs('#div2_plato_v2').style.display = 'block'},500)
    //setTimeout(function(){dqs('#div3_plato_v2').style.display = 'block'},600)

  document.getElementById('btn_home').addEventListener('click', function(){
    window.location.href = dominio + '/index.html?' +
    'consulta=' + encodeURIComponent(vConsulta) +  '&filtro=' + encodeURIComponent(filtro)
     + '&ba=' + encodeURIComponent(auxBA);
  });
  });


  async function generarPDF(mensaje, titulo){
    //alert("generar pdf")
    // Crear un nuevo documento PDF
  const pdfDoc = await PDFLib.PDFDocument.create();
  
  // Agregar una nueva página al documento
  const page = pdfDoc.addPage([800, 1200]);
  
  // Agregar contenido a la página

  const lineas = mensaje.replaceAll(/(?<!\d)\. /g, '\n').replaceAll(' - ',' \n - ').replaceAll('nes: ','nes: \n').replace('\n - The Meal',' - The Meal').split('\n');
  const posicionX = 50; 
  const posicionY = 1150;

lineas.forEach((linea, indice) => {
  const y = posicionY - (indice * 20); // Ajusta el espacio entre líneas según sea necesario
  page.drawText(linea, { x: posicionX, y: y, size: 12 });
});

  /*page.drawText(mensaje, {
    x: 30,
    y: 550,
    size: 11,
  });*/
  

  const pdfBytes = await pdfDoc.save();
  const pdfData = new Uint8Array(pdfBytes);
  
  const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(pdfBlob);
  link.download = titulo + '.pdf';
  link.click();
  }

 function fnAddClick_btn_des(){
  did('btn_des').addEventListener('click', function(){
    var receta = `Nombre del plato: ${did('titulo_plato_v2').innerHTML} \n
    Ingredientes: ${dqs('#div1_plato_v2 > p').innerHTML.toString().replace(/<br>/g,' ').replace(/✔/g, ' - ')} \n
    Instrucciones: ${dqs('#div2_plato_v2 > p').innerHTML} \n`;
  
  var mensaje = receta + `
    \n
    Gastro Mundial - The Meal DB API
  `;
  console.log(mensaje);
 
  generarPDF(mensaje, did('titulo_plato_v2').innerHTML +".pdf");
  })   
  }

  function fnAddClick_btn_WA(){
    did('btn_wa').addEventListener('click', function(){

    //const numeroTelefono = '57'+document.getElementById('input_numero_celular').value; // Reemplaza con tu número de teléfono en formato internacional sin espacios ni caracteres especiales
    const numeroTelefono = prompt("Ingresa el número de celular sin espacios (Válido para Colombia): ")
    console.log(numeroTelefono)
    if(numeroTelefono != null){
      if(numeroTelefono.length != '10'){
        alert('Ingresa un número válido')
        return false;
      }

    }else{
      return false;
    }
    
    var receta = `Nombre del plato: ${did('titulo_plato_v2').innerHTML} \n
    Ingredientes: ${dqs('#div1_plato_v2 > p').innerHTML.toString().replace(/<br>/g,' ')} \n
    Instrucciones: ${dqs('#div2_plato_v2 > p').innerHTML} \n`;
  
  var mensaje = receta + `
    \n
    Gastro Mundial - The Meal DB API
  `;
  console.log(mensaje);
  
        
        const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=57${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;

  
  window.open(enlaceWhatsApp, '_blank');


    });
  };