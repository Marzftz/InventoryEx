const express = require("express");
const expres = require("express");
const router = expres.Router();
const path = require("path");

const db = require("../database");
const helpers = require("../public/lib/helpers");

//-------Cambio de contrseña---------//

router.post("/validatecontra", async (req, res) => {
  const { staticEmail, antPassword, newPassword } = req.body;

  //Validamos que los datos no vengan vacios
  if (staticEmail.length || antPassword.length !== 0) {
    //Realizamos consulta con las credenciales del usuario
    const queryemail = await db.query(
      `SELECT * FROM usuario WHERE UsuCorreo_Electronico = '${staticEmail}' `
    );

    if (queryemail.length > 0) {
      let validpass = queryemail[0].UsuContrasena;
      var comp = await helpers.matchPassword(antPassword, validpass);

      if (comp == true) {
        var passwordencrypted = await helpers.encryptPassword(newPassword);
        let cambio = `UPDATE usuario SET UsuContrasena = '${passwordencrypted}' WHERE UsuCorreo_Electronico = '${staticEmail}';`;
        await db.query(cambio, (err, result) => {
          if (err) {
            //Si existe un error se imprime en consola
            console.error(err.message);
          } else {
            var textalerta = "Cambio exitoso";
            var alerta = "alerta_visible";
            //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
            res.render("layouts/Cambiarcontrasena", { textalerta, alerta });
            //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
          }
        });
      } else {
        var textalerta = "Contraseña antigua incorrecta";
        var alerta = "alerta_visible";
        //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
        res.render("layouts/Cambiarcontrasena", { textalerta, alerta });
        //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
      }
    } else {
      var textalerta = "No existe el correo electronico";
      var alerta = "alerta_visible";
      //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
      res.render("layouts/Cambiarcontrasena", { textalerta, alerta });
      //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
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
