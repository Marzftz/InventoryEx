const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');
const productos = '/Productos';

//----------INICIO CONSULTAR PRODUCTOS-------------//

// se realiza llamado a la URL Productos

router.get('/getProductos', async(req, res)=>{    
    //Se realiza Query con la consulta de los usuarios de la BD
    const productos = await db.query(`SELECT InvCodigo_Producto, InvNombre_Producto, InvCantidad, InvPrecio_Unitario from productos;`);
    res.send(productos);
});

router.get('/productos', async(req, res)=>{
    
    //Se realiza Query con la consulta de los usuarios de la BD
    const productos = await db.query(`SELECT InvCodigo_Producto, InvNombre_Producto, InvCantidad, InvPrecio_Unitario from productos;`);

    //Se envia el resultado de la base de datos al front de la aplicación para mostrar en la tabla
    
    res.render('layouts/productos', {productos}); 
});
//----------FIN CONSULTAR PRODUCTOS-------------//


//----------INICIO CREAR PRODUCTO-------------//


router.post('/createproduct', async (req, res)=>{

    //Se crea variable con los datos enviados desde el front formulario crear usuario
    const  {codproducto,nomproducto, cantidad, costoun } =  req.body;

    //Se crea una variable con la consulta a la BD para validar si hay usuario registrados con el Numero de CC
    const consulta = `SELECT * FROM Productos where InvCodigo_Producto = ${codproducto}`
    
    //Se realiza consulta a la BD
    db.query(consulta, async (err, result) =>{

        //Se valida el resultado de la consulta si es igual a 0
        if (result.length === 0) {
            //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
            const query = `CALL CreateProduct (${codproducto}, '${nomproducto}', ${cantidad}, '${costoun}')` 

            //Se realiza el llamado a la BD
            await db.query(query, (err, result) =>{
                if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);                    
                } else {
                    //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                    res.redirect(productos);
                }
            });           
        }else{
            //Si result es mayor a 0 el usuario ya existe en la BD
            

            var textalerta = "El producto ya existe";
            var alerta = "alerta_visible";
            //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
            res.render('layouts/producto',{textalerta, alerta});
        }
    });
});

//----------FIN CREAR USUARIO-------------//



//---------- INICIO EDITAR PRODUCTO-------------//

router.post('/editproduct', async(req, res)=>{

    //Se crea variable con los datos enviados desde el frond formulario crear usuario
    const  { codigop, nombrep, cantidadp, costop} =  req.body;
    
    const consulta = `SELECT * FROM productos WHERE InvCodigo_Producto = ${parseInt(codigop)};`
    

    db.query(consulta, async (err, result) =>{
        //Se valida el resultado de la consulta si es igual a 0
        if (result.length != 0) {
            //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
            const query = `UPDATE productos SET InvNombre_Producto = '${nombrep}', InvCantidad = ${parseInt(cantidadp)}, InvPrecio_Unitario = ${parseInt(costop)} WHERE InvCodigo_Producto = ${parseInt(codigop)};` 
            
            //Se realiza el llamado a la BD
            await db.query(query, (err, result) =>{
                if (err) {
                    //Si existe un error se imprime en consola
                    console.error(err.message);                    
                } else {
                    //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                    res.redirect(productos);
                }
            });           
        }else{
            //Si result es mayor a 0 el usuario ya existe en la BD
            res.send('El producto no existe'); 
        }
        
    })

    
});

//----------FIN EDITAR PRODUCTO-------------//





router.post('edituser', async(req, res)=>{
    console.log("Conectado")
});




module.exports = router;