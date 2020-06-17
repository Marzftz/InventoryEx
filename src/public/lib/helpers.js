const bcrypt = require('bcrypt');

const helpers = {};

helpers.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) =>{
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);        
    }
};


helpers.localStorage = () => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    return localStorage.getItem('nameUser');
    
};


module.exports = helpers;