const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');

const Principal = '/Principal';
const usuarios = '/Usuarios';
const productos = '/Productos';
const Solicitudes = '/Solicitudes';


//----------INICIO CONSULTAR USUARIOS-------------//
router.get('/Usuarios', async(req, res)=>{
    
    //Se realiza Query con la consulta de los usuarios de la BD
    const usuarios = await db.query(`SELECT idUsuario, UsuId_Rol, roles.RolNombre_Rol, UsuNombre, UsuIdentificacion, UsuCargo, UsuCorreo_Electronico 
    FROM usuario INNER JOIN roles ON usuario.UsuId_Rol = roles.idRoles;`);

    //Se envia el resultado de la base de datos al frond de la aplicación para mostrar en la tabla
    res.render('layouts/Usuarios', {usuarios}); 
});
//----------FIN CONSULTAR USUARIOS-------------//





//----------INICIO CREAR USUARIO-------------//
router.post('/createuser', async (req, res)=>{

    //Se crea variable con los datos enviados desde el frond formulario crear usuario
    const  {rol, nombre, numcc, cargo, correo, password } =  req.body;

    //Se crea una variable con la consulta a la BD para validar si hay usuario registrados con el Numero de CC
    const consulta = `SELECT * FROM usuario where UsuIdentificacion = ${numcc}`
    console.log(req.body);
    
    
    //Se realiza consulta a la BD
    db.query(consulta, async (err, result) =>{

        //Se valida el resultado de la consulta si es igual a 0
        if (result.length === 0) {
            //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
            const query = `CALL CreateUser (${rol}, '${nombre}', ${numcc}, '${cargo}', '${correo}', '${password}')` 

            //Se realiza el llamado a la BD
            await db.query(query, (err, result) =>{
                if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);                    
                } else {
                    //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                    res.redirect(usuarios);
                }
            });           
        }else{
            //Si result es mayor a 0 el usuario ya existe en la BD
            res.send('El usuario ya existe'); 
        }
    });
});

//----------FIN CREAR USUARIO-------------//


//----------INICIO EDITAR USUARIO-------------//

router.post('/edituser', async(req, res)=>{

    //Se crea variable con los datos enviados desde el frond formulario crear usuario
    const  { idUser, ccUser, nombreUser, listRol, cargoUser, correoUser} =  req.body;

    //Se crea una variable con la consulta a la BD para validar si hay usuario registrados con el Numero de CC
    console.log(parseInt(idUser));
    
    const consulta = `SELECT * FROM usuario WHERE idUsuario = ${parseInt(idUser)};`
    

    db.query(consulta, async (err, result) =>{
        //Se valida el resultado de la consulta si es igual a 0
        if (result.length != 0) {
            //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
            const query = `UPDATE usuario SET UsuId_Rol = ${parseInt(listRol)}, UsuNombre = '${nombreUser}', UsuIdentificacion = ${parseInt(ccUser)}, UsuCargo = '${cargoUser}', UsuCorreo_Electronico =  '${correoUser}' WHERE idUsuario = ${parseInt(idUser)};` 
            console.log(query);
            
            //Se realiza el llamado a la BD
            await db.query(query, (err, result) =>{
                if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);                    
                } else {
                    //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                    res.redirect(usuarios);
                }
            });           
        }else{
            //Si result es mayor a 0 el usuario ya existe en la BD
            res.send('El usuario no existe'); 
        }
        
    })

    
});

//----------FIN EDITAR USUARIO-------------//


module.exports = router;