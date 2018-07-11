const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports.login = function (req, res) {
    res.status(200).json({
        //login: 'login from controller'
        email: req.body
    });
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json({
                message: 'Пользователь успешно создан'
            });
        } catch (err) {
            console.log(err);
        }
    }
};