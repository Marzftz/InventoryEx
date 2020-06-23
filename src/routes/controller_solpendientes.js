const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


// se realiza llamado a la URL Solpendientes
router.get('/Solpendientes', async(req, res)=>{
    
    // Se realiza Query con la consulta de los usuarios de la BD
    const solicitudes = await db.query(`SELECT idSolicitud_de_Producto, productos.InvCodigo_Producto, productos.InvNombre_Producto, SolCantidad_Producto, date_format(SolFecha_Solicitud, "%d-%m-%Y/%h:%m") AS SolFecha_Solicitud, usuario.UsuNombre, productos.InvPrecio_Unitario
    FROM solicitud_de_producto 
    INNER JOIN productos ON solicitud_de_producto.idProducto = productos.InvCodigo_Producto
	INNER JOIN usuario ON  solicitud_de_producto.SolidUsuario = usuario.idUsuario
    WHERE SolEstado_Solicitud = "EN PROCESO";`);

    console.log(solicitudes);
    
    //Se envia el resultado de la base de datos al frond de la aplicación para mostrar en la tabla
    res.render('layouts/solpendientes', {solicitudes}); 
});



module.exports = router;