const express = require("express");
const router = express.Router();
const morgan = require("morgan");

const passport = require("passport");

const db = require("../database");
const helpers = require("../public/lib/helpers");

router.post("/links/auth", (req, res) => {
  res.render("layouts/Usuarios");
});

//**************RUTAS*****************//

const Principal = "/Principal";
const usuarios = "/links/Usuarios";
const productos = "/links/Productos";
const Solicitudes = "/links/Solicitudes";

//**************AUTENTICACION*****************//

//Al realizar el llamado a la url validateuser se valida credenciales de inicio de sesión
router.post("/validateuser", async (req, res) => {
  //Variable con los datos enviados desde el login
  const { email, password } = req.body;

  //Validamos que los datos no vengan vacios
  if (email.length || password.length !== 0) {
    //Realizamos consulta con las credenciales del usuario
    const queryemail = await db.query(
      `SELECT * FROM usuario WHERE UsuCorreo_Electronico = '${email}' `
    );
    //Validamos si las credenciales son correctas
    if (queryemail.length > 0) {
      let savedPass = JSON.stringify(queryemail[0].UsuContrasena);
      savedPass = savedPass.replace(/['"]+/g, "");
      var match = await helpers.matchPassword(password, savedPass);

      if (match == true) {
        var nameUser = JSON.stringify(queryemail[0].UsuNombre);
        var idUsuario = JSON.stringify(queryemail[0].idUsuario);
        nameUser = quitarComillas(nameUser);
        idUsuario = quitarComillas(idUsuario);
        res.render("./layouts/Principal", { nameUser, idUsuario });
      } else {
        //Si no son correctas se envia alerta
        textAlerta = "Usuario o contraseña incorrecta";
        alerta = "alerta_visible";
        //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
        res.render("./layouts/index", { textAlerta, alerta });
      }
    } else {
      //Si no son correctas se envia alerta
      textAlerta = "El correo no se encuentra registrado";
      alerta = "alerta_visible";
      //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
      res.render("./layouts/index", { textAlerta, alerta });
    }
  } else {
    //Si las variables son vacias se direcciona a la pantalla de login
    var textalerta = "Los datos son obligatorios";
    var alerta = "alerta_visible";
    //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
    res.render("./layouts/index", { textalerta, alerta });
  }
});

function quitarComillas(params) {
  return params.replace(/['"]+/g, "");
}




//Enviar datos del usuario
router.get("/getDataUser/:id", async (req, res) => {
  const queryData = await db.query(
    `SELECT idUsuario, UsuId_Rol, UsuNombre, UsuIdentificacion, UsuCargo, UsuCorreo_Electronico FROM usuario WHERE idUsuario = ${req.params.id} `
  );
  if (queryData.length != 0) {
    res.send(queryData);
  } else {
    res.send({"mensaje": "El usuario no existe"});
  }
});

module.exports = router;
