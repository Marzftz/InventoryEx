const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');
const solicitudes = '/Solicitudes';


router.get('/solicitudes', async(req, res)=>{
    
    res.render('layouts/solicitudes', {solicitudes}); 
});


//----------INICIO CREAR PRODUCTO-------------//


router.post('/createsolicitud', async (req, res)=>{

    //Se crea variable con los datos enviados desde el front formulario crear usuario
    const  {codproducto, cant } =  req.body;
    let fechasol= new Date();

    
            //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
            const query = `CALL Createrequest (${codproducto}, ${cant}, ${fechasol})` 

            //Se realiza el llamado a la BD
            await db.query(query, (err, result) =>{
                if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);                    
                } else {
                    //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                    res.redirect(solicitudes);
                }
            });      

    });

//----------FIN CREAR USUARIO-------------//



module.exports = router;