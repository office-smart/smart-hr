module.exports = function ({req, res, err, controller}) {
    res
        .status(400)
        .send({
            status: 400,
            message: 'Bad Request',
            route: req.originalUrl,
            controller,
            error: err.message
        })
}