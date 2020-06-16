const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool =  mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexión con la base de datos cerrada');   
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Validar la cantidad de conexiones a la BD');  
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Conexión rechazada a la BD');  
        }
    }
    if(connection) connection.release();
        console.log('Conexión a la BD exitosa');
        return;        
});

//Ejecución de consultas en promesas
pool.query = promisify(pool.query);
module.exports = pool;