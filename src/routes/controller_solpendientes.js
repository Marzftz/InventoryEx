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



router.post('/rechazarSolicitud', async(req, res) => {
    let idSolicitud = req.body.idSolicitud;   
    let consulta = `SELECT * FROM solicitud_de_producto WHERE idSolicitud_de_Producto = ${parseInt(idSolicitud)};`;
    db.query(consulta, async (err, result) => {        
        //Se valida el resultado de la consulta si es igual a 0
        if (result.length != 0) {
          //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
          const query = `UPDATE solicitud_de_producto SET  SolEstado_Solicitud = 'RECHAZADA' where idSolicitud_de_Producto = ${parseInt(idSolicitud)};`;
    
          //Se realiza el llamado a la BD
          await db.query(query, (err, result) => {
            if (err) {
              //Si existe un error se imprime en consola
              console.error(err.message);
            } else {
              //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
              res.redirect('/Solpendientes');
            }
          });
        } else {
          //Si result es mayor a 0 el usuario ya existe en la BD
          res.send("La solicitud indicada no existe");
        }
      });
    
});     


router.post('/aprobarSolicitud', async(req, res) => {
    let idSolicitud = req.body.idSolicitud;   
    let consulta = `SELECT * FROM solicitud_de_producto WHERE idSolicitud_de_Producto = ${parseInt(idSolicitud)};`;
    db.query(consulta, async (err, result) => {        
        //Se valida el resultado de la consulta si es igual a 0
        if (result.length != 0) {
            let canSolicitud = result[0].SolCantidad_Producto;
            let canExistente = await db.query(`SELECT InvCantidad FROM productos WHERE InvCodigo_Producto = ${result[0].idProducto};`)
            
            if (canExistente[0].InvCantidad > canSolicitud) {
                let newCantidad = parseInt(canExistente[0].InvCantidad - canSolicitud);
                //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
                const query = `UPDATE solicitud_de_producto SET  SolEstado_Solicitud = 'APROBADA' where idSolicitud_de_Producto = ${parseInt(idSolicitud)};`;
                const query2 = await db.query(`UPDATE productos SET  InvCantidad = ${newCantidad} where  InvCodigo_Producto = ${result[0].idProducto};`);           
            
                //Se realiza el llamado a la BD
                await db.query(query, (err, result) => {
                    if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);
                    } else {
                    
                    res.redirect('/Solpendientes');
                    }
                });               
            } else {
                res.send("La cantidad de producto existente es menor a la solicitada");
            }
        } else {
          //Si result es mayor a 0 la solicitud no existe en la BD
          res.send("La solicitud indicada no existe");
        }
      });
    
});     

module.exports = router;