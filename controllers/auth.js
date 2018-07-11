module.exports.login = function (req, res) {
    res.status(200).json({
        //login: 'login from controller'
        email: req.body
    });
};

module.exports.register = function (req, res) {
    res.status(200).json({
        login: 'register from controller'
    });
};