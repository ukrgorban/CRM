const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {// создание токена
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 });
            res.status(200).json({
                token: `Bearer ${ token }`
            });
        } else {// Не верный пароль
            res.status(401).json({
                message: 'Не верный пароль!'
            });
        }

    } else {
        res.status(404).json({
            message: 'Такой пользователь не найден!'
        });
    }
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