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

// ELIMINAR USUARIO

let deleteUser = function (idUsuario) {
  console.log(idUsuario);

  document.getElementById("idusuario").value = idUsuario;

  $("#alertaeliminar").modal("show");
};

// FIN ELIMINAR USUARIO
