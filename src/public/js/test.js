//EDITAR USUARIO
let editUser = function (idUsuario) {
  // SE CAPTURA LOS DATOS DE LA TABLA

  let identificacion = document.getElementById("usuIden" + idUsuario)
      .textContent,
    nombreUser = document.getElementById("usuNombre" + idUsuario).textContent,
    rolUser = document.getElementById("usuRol" + idUsuario).attributes[1]
      .nodeValue,
    cargoUser = document.getElementById("usuCargo" + idUsuario).textContent,
    correoUser = document.getElementById("usuCorreo" + idUsuario).textContent;

  // SE REMPLAZAN LOS DATOS DEL MODAL

  document.getElementById("idUser").value = idUsuario;
  document.getElementById("ccUser").value = identificacion;
  document.getElementById("nombreUser").value = nombreUser;
  document.getElementById("listRol").value = rolUser;
  document.getElementById("cargoUser").value = cargoUser;
  document.getElementById("correoUser").value = correoUser;

  $("#editarusuario").modal("show");
};

// FIN EDITAR USUARIO


// ELIMINAR USUARIO

let deleteUser = function (idUsuario) {
  console.log(idUsuario);

  document.getElementById("idusuario").value = idUsuario;

  $("#alertaeliminar").modal("show");
};

// FIN ELIMINAR USUARIO

// EDITAR PRODUCTO

let editProduct = function (InvCodigo_Producto) {
  let nombrep = document.getElementById("nombre" + InvCodigo_Producto)
    .textContent;
  let cantidadp = document.getElementById("cant" + InvCodigo_Producto)
    .textContent;
  let costop = document.getElementById("pre" + InvCodigo_Producto).textContent;

  document.getElementById("codigop").value = InvCodigo_Producto;
  document.getElementById("nombrep").value = nombrep;
  document.getElementById("cantidadp").value = cantidadp;
  document.getElementById("costop").value = costop;
  
  $("#editarproducto").modal("show");
};

// FIN EDITAR PRODUCTO


// AGREGAR CANTIDADES PRODUCTO

let addcantProduct = function (InvCodigo_Producto) {
  let nombrep = document.getElementById("nombre" + InvCodigo_Producto)
    .textContent;
  let costop = document.getElementById("pre" + InvCodigo_Producto).textContent;

  document.getElementById("codigopp").value = InvCodigo_Producto;
  document.getElementById("nombrepp").value = nombrep;
  document.getElementById("costopp").value = costop;

  $("#agregarcantproducto").modal("show");
};


// FIN AGREGAR CANTIDADES PRODUCTO

//----------INCIO RESPUESTA SOLICITUD-------------//

let resolicitud = function (idSolicitud_de_Producto) {
  let codprod = document.getElementById("codpro" + idSolicitud_de_Producto).textContent;
  let nomprod = document.getElementById("nompro" + idSolicitud_de_Producto).textContent;
  let cantprod = document.getElementById("cantpro" + idSolicitud_de_Producto).textContent;
  let preund = document.getElementById("preun" + idSolicitud_de_Producto).textContent;

  document.getElementById("inputCodigo").value = idSolicitud_de_Producto;
  document.getElementById("inputcod").value = codprod;
  document.getElementById("inputNombre").value = nomprod;
  document.getElementById("inputCantidad").value = cantprod;
  document.getElementById("inputUnitario").value = preund;
  document.getElementById("inputotal").value = parseInt(cantprod * preund)
  document.getElementById('buttonRechazar').setAttribute('onclick',`rechazar(${idSolicitud_de_Producto})`);
  document.getElementById('buttonAprobar').setAttribute('onclick',`aprobar(${idSolicitud_de_Producto})`);
  
  $("#Gestionar").modal("show");
};

//----------FIN RESPUESTA SOLICITUD-------------//


//---------INICIO GESTIONAR SOLICITUD ----------//
function aprobar(id) {
  $("#Gestionar").modal("toggle");
  document.getElementById("titleConfirmar").innerHTML = "Aprobar solicitud";
  document.getElementById("textConfirmar").innerHTML = "¿Esta seguro que desea aprobar la solicitud?";
  document.getElementById("idSolicitud").value = id;
  document.getElementById("buttonConfirmar").className = "btn btn-success";
  document.confirmar.action ="/aprobarSolicitud";
  $("#confirmar").modal("show");
   
}

function rechazar(id) {
  $("#Gestionar").modal("toggle");
  document.getElementById("titleConfirmar").innerHTML = "Rechazar solicitud";
  document.getElementById("textConfirmar").innerHTML = "¿Esta seguro que desea rechazar la solicitud?";
  document.getElementById("idSolicitud").value = id;
  document.getElementById("buttonConfirmar").className = "btn btn-danger";
  document.confirmar.action ="/rechazarSolicitud";
  $("#confirmar").modal("show");
   
}