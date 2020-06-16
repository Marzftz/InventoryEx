module.exports = function (req,res,next) {

    if (req.path != '/login') {
        
    } else next();
}