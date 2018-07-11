module.exports.overview = function (req, res) {
    res.status(200).jsonp({
        login: 'register from controller overview'
    });
};

module.exports.analytic = function (req, res) {
    res.status(200).jsonp({
        login: 'register from controller analytic'
    });
};