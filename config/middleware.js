module.exports.setFlash = (req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    // console.log("Hello world2", res.locals.flash);
    next();
}