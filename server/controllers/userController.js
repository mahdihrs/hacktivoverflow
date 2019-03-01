const User = require('../models/user')
const { generate, decode } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcryptjs')
const kue = require('kue')
const queue = kue.createQueue()
 
class Controller {
    static register(req, res) {
        // req.body.watchedTags = 
        User.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        })
        .then(newUser => {
            let generateToken = generate(newUser)
            res
                .status(201)
                .json({
                    msg: `User has been created`,
                    id: newUser._id,
                    token: generateToken,
                    name: newUser.full_name
                })
            queue.create('welcome-message', {
                data: newUser.full_name
            }).save()
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal sever error`,
                    err: err
                })
        })
    }

    static login(req, res) {
        console.log(req.body)
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            console.log(user)
            if (!user) {
                res
                    .status(404)
                    .json({
                        msg: `User not found`
                    })
            } else {
                let authorized = decrypt(req.body.password, user.password)
                if (!authorized) {
                    res
                        .status(401)
                        .json({
                            msg: `Wrong password`
                        })
                } else {
                    let token = generate(user)
                    res
                        .status(200)
                        .json({
                            token: token,
                            id: user._id,
                            user: user.full_name,
                        })
                }
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })        
    }

    static allUsers(req, res) {
        User.find({})
        .then(allUsers => {
            res
                .status(200)
                .json(allUsers)
        })
        .catch(err => {
            res 
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static getUser(req, res) {

    }

    static editProfile(req, res) {

    }

    static removeUser(req, res) {

    }
}

module.exports = Controller