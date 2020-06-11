module.exports = (req, res, next) => {
    if(!req.user) {
        // here we break the middleware chain and immediately return
        return res.status(401).send({ error: 'You must login' });
    }
    next();
}