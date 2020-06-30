const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


//-------Cambio de contrseña---------//

router.post("/validatecontra", async (req, res) => {
    const { email, password } = req.body;

      //Validamos que los datos no vengan vacios
  if (email.length || password.length !== 0) {

        //Realizamos consulta con las credenciales del usuario
        const queryemail = await db.query(
            `SELECT * FROM usuario WHERE UsuCorreo_Electronico = '${email}' `
      

  }else{
          //Si las variables son vacias se direcciona a la pantalla de login
    var textalerta = "Los datos son obligatorios";
    var alerta = "alerta_visible";
    //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
    res.render("layouts/index", { textalerta, alerta });
  }

  }





}
