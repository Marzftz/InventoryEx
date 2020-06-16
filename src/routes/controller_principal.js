const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');


// se realiza llamado a la URL Principal
router.get('/Principal', async(req, res)=>{
    
    res.render('layouts/Principal'); 
}); 




module.exports = router;