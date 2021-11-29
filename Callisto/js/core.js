var usuario = "";
var inventarioSelec = "";
var familiaSelec = "";

function volver(pag) {
  switch (pag) {
    case 1:
      // code block
      document.getElementById("pagina-1").style.display = "inline";
      document.getElementById("pagina-2").style.display = "none";
      break;
    case 2:
      document.getElementById("pagina-2").style.display = "inline";
      document.getElementById("pagina-3").style.display = "none";
      break;
      case 3:
        document.getElementById("pagina-3").style.display = "inline";
        document.getElementById("pagina-4").style.display = "none";
        break;
      case 4:
          document.getElementById("pagina-4").style.display = "inline";
          document.getElementById("pagina-5").style.display = "none";
          break;
    default:
    // code block
  }
}

function irPagina2() {
  document.getElementById("txtNivel2").innerText = usuario;
  document.getElementById("pagina-1").style.display = "none";
  document.getElementById("pagina-2").style.display = "inline";
}
function elegirUsuario(u) {
  usuario = u.trim();
  irPagina2();
}

function mostrarInventarios(){
  const accion = 1;
  const urlAccion = 
  "https://script.google.com/macros/s/AKfycbzxBDBc3tYiOH_i6aRdN0S-aaKocbOeA04jJNyE7jTbCZ78AbBSw4ns0b4KZ5y7G6tc5g/exec?action=" 
  + accion;
  var inventarios = [];
  inventarios = loadDoc(urlAccion);

  if (inventarios.length===0) {
    alert('No hay información para mostrar.');
    return;
  }

  document.getElementById("menu-inv").innerHTML="";

  inventarios.sort( (a,b) => {
    if (a.estado > b.estado)
      return 1;
    else if (a.estado < b.estado)
    return -1;
    return 0;
  });

inventarios.map(value => {
  var iDiv = document.createElement('div');
  iDiv.id = value.codInventario;
  iDiv.textContent = value.comentario;
  if (value.estado === "CERRADO")
  iDiv.className = 'm-item-largo color5';
  else iDiv.className = 'm-item-largo color8';
  iDiv.setAttribute('onclick',"mostrarFamilias(id,'" +value.estado + "')");
  document.getElementById("menu-inv").appendChild(iDiv);
  irPagina3();
});
}

function irPagina3() {
  document.getElementById("txtNivel3").innerText = usuario;
  document.getElementById("pagina-2").style.display = "none";
  document.getElementById("pagina-3").style.display = "inline";
}

function mostrarFamilias(codinventario, estado){
  familiaSelec = "";
  if (estado ==='CERRADO'){
    alert('Este inventario está cerrado y no se puede modificar.');
    return;
  }
  const accion = 2;
  inventarioSelec = codinventario;
  const urlAccion = 
  "https://script.google.com/macros/s/AKfycbzxBDBc3tYiOH_i6aRdN0S-aaKocbOeA04jJNyE7jTbCZ78AbBSw4ns0b4KZ5y7G6tc5g/exec?action=" + 
  accion +  "&codinventario=" + inventarioSelec;
  var familias = loadDoc(urlAccion);
  if (familias.length===0) {
    alert('No hay información para mostrar.');
    return;
  }

  familias.push({
    codinventario: codinventario,
    familia: "TODAS",
    estado: "ABIERTO"
    });

    document.getElementById("menu-familias").innerHTML="";
  familias.map(value => {
    var iDiv = document.createElement('div');
    iDiv.id = value.familia;
    iDiv.textContent = value.familia;
    iDiv.className = 'm-item-largo color4';
    iDiv.setAttribute('onclick',"mostrarProductos(id)");
    document.getElementById("menu-familias").appendChild(iDiv);
  });
  irPagina4();
}

function irPagina4() {
  document.getElementById("txtNivel4").innerText = usuario;
  document.getElementById("pagina-3").style.display = "none";
  document.getElementById("pagina-4").style.display = "inline";
}

function mostrarProductos(familia){
familiaSelec = familia;
const accion = 3;
const familiaConsulta = familia ==="TODAS"? "" : familia;
const urlAccion = 
"https://script.google.com/macros/s/AKfycbzxBDBc3tYiOH_i6aRdN0S-aaKocbOeA04jJNyE7jTbCZ78AbBSw4ns0b4KZ5y7G6tc5g/exec?action=" + 
accion +  "&codinventario=" + inventarioSelec + "&familia=" + familiaConsulta;
var productos = loadDoc(urlAccion);
if (productos.length===0) {
  alert('No hay información para mostrar.');
  return;
}

document.getElementById("menu-productos").innerHTML="";

productos.sort( (a,b) => {
  if (a.estado > b.estado)
    return 1;
  else if (a.estado < b.estado)
  return -1;
  return 0;
});

  productos.map(value => {
    var iDiv = document.createElement('div');
    iDiv.id = value.codFadrisac;
    iDiv.textContent = value.codBando;
    iDiv.className = value.estado === 'ABIERTO'? 'm-item-largo color3':'m-item-largo color8'
    iDiv.setAttribute('onclick',"irPagina5_1(id,textContent," + value.stockConteo + ")");
    document.getElementById("menu-productos").appendChild(iDiv);
  });
  irPagina5();

}

function irPagina5() {
  document.getElementById("txtNivel5").innerText = usuario;
  document.getElementById("pagina-4").style.display = "none";
  document.getElementById("pagina-5").style.display = "inline";
}
function irPagina5_1(codFadrisac,codBando,stockConteo) {
  document.getElementById("txtNivel5_1").innerText = codFadrisac;
  document.getElementById("codigoConteo").innerText = codBando;
  document.getElementById("cantidadConteo").innerText = stockConteo;
  document.getElementById("pagina-5").style.display = "none";
  document.getElementById("pagina-5_1").style.display = "inline";
}
function cerrarPagina5_1() {
  document.getElementById("txtNivel5").innerText = usuario;
  document.getElementById("pagina-5_1").style.display = "none";
  document.getElementById("pagina-5").style.display = "inline";
  mostrarProductos(familiaSelec);
}


function loadDoc(dirUrl) {
  var xhttp = new XMLHttpRequest();
  var temp = "";
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        temp = JSON.parse(this.responseText);
          return JSON.parse(this.responseText);
     }
  };
  xhttp.open("GET", dirUrl, false);
  xhttp.send();
  return temp;
  
}


function teclear(t){
  var temp_cant=document.getElementById("nuevaCantidad").value;
  if(t=="."){
    if(temp_cant.indexOf(".")==-1){
      temp_cant=temp_cant+t;
    }else if(temp_cant.indexOf(".")>-1){
      
    }
  }else if(t!="."){
    if(temp_cant.indexOf(".")>-1){
      temp_cant=temp_cant+t;
    }else{
      temp_cant=temp_cant+t;
      temp_cant=temp_cant*1;
    }
  }
  document.getElementById("nuevaCantidad").value=temp_cant;
}
function borrar(){
document.getElementById("nuevaCantidad").value="";
}

function enviarConteo(tipo){
  //alert("aquí se debe enviar el conteo al servicio");
  var stockConteo = 0;
  if (tipo==="AGREGAR") {
  var cantidad_previa = document.getElementById("cantidadConteo").textContent;
  stockConteo = cantidad_previa === ""? 0:parseFloat(cantidad_previa);
  }
  
  stockConteo += parseFloat(document.getElementById("nuevaCantidad").value);

  const codfadrisac = document.getElementById("txtNivel5_1").textContent;
  
  const accion = 4;
  const urlAccion = 
  "https://script.google.com/macros/s/AKfycbzxBDBc3tYiOH_i6aRdN0S-aaKocbOeA04jJNyE7jTbCZ78AbBSw4ns0b4KZ5y7G6tc5g/exec?action=" + 
  accion +  "&codinventario=" + inventarioSelec + "&codfadrisac=" + codfadrisac + "&conteo=" + stockConteo + 
  "&usuario=" + usuario;
  var guardado = loadDoc(urlAccion);
  if (guardado)
  alert("Grabado exitoso.");
  else alert("No se pudo grabar.");
 
  document.getElementById("nuevaCantidad").value="";
  cerrarPagina5_1();
  //document.getElementById(codfadrisac).className = 'm-item-largo color8';

}

function buscarProducto(){
  const accion = 5;
  const patron = document.getElementById("textobuscar").value;
  const urlAccion = 
  "https://script.google.com/macros/s/AKfycbzxBDBc3tYiOH_i6aRdN0S-aaKocbOeA04jJNyE7jTbCZ78AbBSw4ns0b4KZ5y7G6tc5g/exec?action=" + 
  accion +  "&codinventario=" + inventarioSelec + "&patron=" + patron
  var resultadoBusq = loadDoc(urlAccion);
  if (resultadoBusq.length===0) {
    alert('No se encontró el producto.');
    return;
  }
  console.log(resultadoBusq); 
  mostrarResultadoBusqueda(resultadoBusq);
}

function mostrarResultadoBusqueda(resultado){
  cerrarPagina6()

  document.getElementById("menu-productos").innerHTML="";

resultado.map(value => {
    var iDiv = document.createElement('div');
    iDiv.id = value.codFadrisac;
    iDiv.textContent = value.codBando;
    iDiv.className = value.estado === 'ABIERTO'? 'm-item-largo color3':'m-item-largo color8'
    iDiv.setAttribute('onclick',"irPagina5_1(id,textContent," + value.stockConteo + ")");
    document.getElementById("menu-productos").appendChild(iDiv);
  });
  irPagina5();
}

function irPagina6() {
  document.getElementById("txtNivel6").innerText = usuario;
  document.getElementById("pagina-5").style.display = "none";
  document.getElementById("pagina-6").style.display = "inline";
}

function cerrarPagina6() {
  document.getElementById("txtNivel5_1").innerText = usuario;
  document.getElementById("pagina-5").style.display = "inline";
  document.getElementById("pagina-6").style.display = "none";
}