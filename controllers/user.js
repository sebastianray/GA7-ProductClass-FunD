const { User, Wallet } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const { smtpTransport } = require('../helpers/sendEmail')
const { Op } = require('sequelize')

class UserController {
    static async list(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        const emailRegexp = /^[a-z_\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-z\-0-9]+(.com)$/i;
        const isEmailFormat = emailRegexp.test(email);

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        } else if (email == '') {
            res.status(400).json({
                status: 'false',
                msg: 'Email is required'
            })
        }
        else if (!isEmailFormat) {
            res.status(400).json({
                status: 'false',
                msg: 'Invalid email format'
            })
        }
        else if (password === '') {
            res.status(400).json({
                status: 'false',
                msg: 'Password is required'
            })
        }
        else {
            try {
                const user = await User.findOne({
                    where: {
                        email: {
                            [Op.iLike]: '%' + email + '%'
                        }
                    }
                })
                if (!user) {
                    res.status(404).json({
                        status: 'false',
                        msg: 'User not found'
                    })
                } else if (decryptPwd(password, user.password) && user) {
                    const userData = await User.findOne({
                        where: {
                            id: user.id,
                        },
                        attributes: { exclude: ['password'] }
                    })
                    const access_token = tokenGenerator(user)
                    res.status(200).json({
                        status: 'Success',
                        userData,
                        access_token
                    })
                } else {
                    res.status(401).json({
                        status: 'false',
                        msg: 'Wrong password'
                    })
                }
            } catch (err) {
                next(err)
            }
        }
    }

    static async register(req, res, next) {
        const { name, email, password, password2, dateOfBirth } = req.body
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        } else {
            try {
                const check = await User.findOne({
                    where: {
                        email: {
                            [Op.iLike]: '%' + email + '%'
                        }
                    }
                });
                if (check && email !== '') {
                    res.status(409).json({
                        status: 'false',
                        msg: 'Email is already registered'
                    });
                } else if (password2 !== password) {
                    res.status(401).json({
                        status: 'false',
                        msg: 'Password is not the same'
                    });
                }
                else {
                    const user = await User.create({
                        name,
                        email: email.toLowerCase(),
                        password,
                        dateOfBirth,
                    })
                    const access_token = tokenGenerator(user)
                    res.status(201).json({
                        status: 'Success',
                        user,
                        access_token
                    })
                    if (user) {
                        const createWallet = await Wallet.create({
                            balance: 10000000,
                            UserId: user.id
                        })
                    }
                }
            } catch (err) {
                next(err)
            }
        }
    }

    static async profile(req, res) {
        const id = req.userData.id
        try {
            const profile = await User.findOne({
                where: {
                    id
                }
            })
            if (profile) {
                res.status(200).json(profile)
            } else {
                res.status(404).json(
                    { msg: "User not Found" }
                )
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async editUserPhoto(req, res, next) {
        const id = req.userData.id;
        const photo = req.file.path;
        try {
            const check = await User.update({
                photo
            }, {
                where: { id }
            });
            res.status(200).json({
                msg: 'Profile Updated!',
                check
            });
        } catch (err) {
            next(err)
        }

    }

    static async editUserData(req, res, next) {
        const id = req.userData.id;
        const { name, dateOfBirth } = req.body;

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        } else {
            try {
                const check = await User.update({
                    name,
                    dateOfBirth
                }, {
                    where: { id }
                });
                res.status(200).json({
                    msg: 'Profile Updated!',
                    check
                });
            } catch (err) {
                next(err)
            }
        }
    }

    static async editUserPassword(req, res, next) {
        const id = req.userData.id;
        const { password, password2 } = req.body;

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        }
        else if (password2 !== password) {
            res.status(409).json("Password is not same!");
        } else {
            try {
                const check = await User.update({
                    password
                }, {
                    where: { id },
                    individualHooks: true
                });
                res.status(200).json({
                    msg: 'Password Changed!',
                    check
                });
            } catch (err) {
                next(err)
            }
        }
    }

    static async deleteUser(req, res) {
        const id = req.userData.id

        try {
            const result = await User.destroy({
                where: { id }
            });
            res.status(200).json({
                msg: 'Account Deleted!',
                result
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async forgotPasswordForm(req, res) {
        const { email } = req.body;
        let mailOptions, host, link;
        try {
            const found = await User.findOne({
                where: {
                    email
                }
            })
            if (found) {
                console.log(found.id)
                host = req.get('host');
                link = "https://peaceful-gorge-77974.herokuapp.com" + "/users/resetpassword/" + found.id;
                console.log(link)
                mailOptions = {
                    to: email,
                    subject: "Please confirm your Email account",
                    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                }
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.end("error");
                    } else {
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                    }
                });
                res.status(200).json({
                    msg: 'Already Sent to Email!'
                });
            } else {
                res.status(404).json({
                    msg: "Email not Found"
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async resetPassword(req, res, next) {
        const id = req.params.id;
        const { password, password2 } = req.body;
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        }
        else if (password2 !== password) {
            res.status(409).json("Password is not same!");
        } else {
            try {
                const check = await User.update({
                    password
                }, {
                    where: { id },
                    individualHooks: true
                });
                res.status(200).json({
                    msg: 'Password Changed!'
                });
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = UserController;

