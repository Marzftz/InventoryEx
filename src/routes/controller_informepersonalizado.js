const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


// se realiza llamado a la URL Informe personalizado
router.get('/informepersonalizado', async(req, res)=>{
    
    //Se realiza Query con la consulta de los usuarios de la BD
    // const usuarios = await db.query(`SELECT idUsuario, roles.RolNombre_Rol, UsuNombre, UsuIdentificacion, UsuCargo, UsuCorreo_Electronico 
    // FROM usuario INNER JOIN roles ON usuario.UsuId_Rol = roles.idRoles;`);

    //Se envia el resultado de la base de datos al frond de la aplicación para mostrar en la tabla
    res.render('layouts/informepersonalizado'); 
});



module.exports = router;