exports.createPostValidators = (req, res, next) => {
    req.check('title', 'Write to title').notEmpty();
    req.check('title', 'Title must be between 4 to 150').isLength({
        min: 4, max: 150
    });
    req.check('body', 'Write to title').notEmpty();
    req.check('body', 'Body must be between 4 to 2000').isLength({
        min: 4, max: 2000
    });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('name', 'Name must be between 4 to 10').isLength({
        min: 4, max: 10
    });
    req.check('email', 'Email must be between 3 to 32')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4, max: 2000
        });
    req.check('password', 'password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('password must contain at least 6')
        .matches(/\d/)
        .withMessage('must contain a number');

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}