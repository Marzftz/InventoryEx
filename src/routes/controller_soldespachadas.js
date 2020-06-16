const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


// se realiza llamado a la URL Soldespachadas
router.get('/Soldespachadas', async(req, res)=>{
    
    // Se realiza Query con la consulta de los usuarios de la BD
    const soldespa = await db.query(`SELECT idSolicitud_de_Producto, productos.InvCodigo_Producto, productos.InvNombre_Producto, SolCantidad_Producto, productos.InvPrecio_Unitario, (SolCantidad_Producto * productos.InvPrecio_Unitario) AS PrecioTotal, usuario.UsuNombre, SolFecha_Solicitud, SolFecha_Cierre_Solicitud, SolEstado_Solicitud 
    FROM solicitud_de_producto 
    INNER JOIN productos ON solicitud_de_producto.idProducto = productos.InvCodigo_Producto 
    INNER JOIN usuario ON  solicitud_de_producto.SolidUsuario = usuario.idUsuario
    WHERE SolEstado_Solicitud != 'EN PROCESO';`);

    //Se envia el resultado de la base de datos al frond de la aplicación para mostrar en la tabla
    res.render('layouts/Soldespachadas', {soldespa}); 
});

function imagenes(){
    var estado= document.getElementById("estadosol").value;
    var imagenacambiar1=document.getElementById("imgbase1");
    var imagenacambiar2=document.getElementById("imgbase2");
    
    // si es mujer
    if (estado == "APROBADO")
    {
          imagenacambiar1.src="../img/aprobada.png"
         
       
    }
    // si es hombre
    else if(estado === "RECHAZADO") {

        
        imagenacambiar2.src="../img/rechazado.png"
            
    }
  }




module.exports = router;