const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(403).json({
        error: 'email is taken !'
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ user });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User wtih that email does not exists. please signin! '
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'email and password do not much'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { ezpire: new Date() + 9999 });
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name, } });
    })
}
