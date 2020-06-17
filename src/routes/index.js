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
    if ( queryemail.length > 0) {
      let savedPass = JSON.stringify(queryemail[0].UsuContrasena);
      savedPass = savedPass.replace(/['"]+/g, "");
      var match = await helpers.matchPassword(password, savedPass);

      if (match == true) {
    //    var nameUser = JSON.stringify(savedPassword[0].UsuNombre);
     //   nameUser = nameUser.replace(/['"]+/g, "");
        res.redirect("/Principal");
      } else {
        //Si no son correctas se envia alerta
        textAlerta = "Usuario o contraseña incorrecta";
        alerta = "alerta_visible";
        //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
        res.render("./layouts/index", { textAlerta, alerta });
      }
    }else{
        //Si no son correctas se envia alerta
        textAlerta = "El correo electrónico no se encuentra registrado";
        alerta = "alerta_visible";            
        //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
        res.render('/layouts/index', {textAlerta, alerta});               
}
  } else {
    //Si las variables son vacias se direcciona a la pantalla de login
    var textalerta = "Los datos son obligatorios";
    var alerta = "alerta_visible";
    //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
    res.render("layouts/index", { textalerta, alerta });
  }
});

module.exports = router;
