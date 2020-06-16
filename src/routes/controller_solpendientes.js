const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


// se realiza llamado a la URL Solpendientes
router.get('/Solpendientes', async(req, res)=>{
    
    // Se realiza Query con la consulta de los usuarios de la BD
    const solicitudes = await db.query(`SELECT idSolicitud_de_Producto, productos.InvCodigo_Producto, productos.InvNombre_Producto, SolCantidad_Producto, SolFecha_Solicitud
    FROM solicitud_de_producto INNER JOIN productos ON solicitud_de_producto.idProducto = productos.InvCodigo_Producto;`);

    //Se envia el resultado de la base de datos al frond de la aplicación para mostrar en la tabla
    res.render('layouts/solpendientes', {solicitudes}); 
});



module.exports = router;