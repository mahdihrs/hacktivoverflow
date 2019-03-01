const Question = require('../models/question')
const Tag = require('../models/tag')

class Controller {
    static getAllQuestions(req, res) {
        Question.find({}).populate('user').sort([
            ['created_at', 'descending']
        ]).populate('tags')
        .then(questions => {
            res
                .status(200)
                .json(questions)
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

    static createQuestion(req, res) {
        let promises = []
        let readyToPutTag = [] //tag yang udah ada dan gaperlu di-create lagi
        req.body.tags = req.body.tags.map(e => e.text)
        req.body.tags.forEach(tag => {
            promises.push(
                Tag.findOne({
                    name: tag
                })
            )
        })
        Promise.all(promises)
        .then(tags => {
            readyToPutTag = tags.filter(e => e !== null)
            readyToPutTag.forEach(tg => {
                let index = req.body.tags.findIndex(e => e === tg.name)
                req.body.tags.splice(index, 1)
            })
            readyToPutTag = readyToPutTag.map(e => e._id)
            let tagToCreate = []
            req.body.tags.forEach(tag => {
                tagToCreate.push(
                    Tag.create({
                        name: tag
                    })
                )
            })
            return Promise.all(tagToCreate)
        })
        .then(createdTags => {
            createdTags = createdTags.map(e => e._id).concat(readyToPutTag)
            Question.create({
                title: req.body.title,
                description: req.body.description,
                user: req.decoded.id,
                tags: createdTags
            })
            .then(newQuestion => {
                res
                    .status(200)
                    .json({
                        msg: 'Question has been successfully stored'
                    })                
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `internal server error`,
                    err: err
                })
        })


        // Question.create({
        //     title: req.body.title,
        //     description: req.body.description,
        // })
        // .then(newQ => {
        //     newQ.user = req.decoded.id
        //     newQ.save()
        //     res
        //         .status(200)
        //         .json({msg: 'Question has been successfully stored'})
        // })
        // .catch(err => {
        //     res
        //         .status(500)
        //         .json({
        //             msg: `internal server error`,
        //             err: err
        //         })
        // })
    }

    static searchByTag(req, res) {
        console.log(req.params.tagId)
        Question.find({
            tags: req.params.tagId
        })
        .then(Qs => {
            res
                .status(200)
                .json(Qs)
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

    static getQuestion(req, res) {
        Question.findById(req.params.id).populate('user').populate({
            path: 'answers', 
            options: {
                sort: {
                    'created_at': 'desc'
                }
            },
            populate: {
                path: 'user'
            }
        })
        .then(question => {
            res
                .status(200)
                .json(question)
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

    //put
    //req body isinya up atau down
    static vote(req, res) {
        Question.findById(req.params.id)
        .then(q => {
            let findUserInUpvote = q.upvotes.find(e => e == req.decoded.id)
            let findUserInDownVote = q.downvotes.find(e => e == req.decoded.id)
            console.log(findUserInUpvote, findUserInDownVote)
            //kalo "upvote" dan belum ada di upvote, maka idnya dipush, tapi kalo upvote terus udah ada di upvote, maka idnya diambil jadi 0
            //kalo "upvote" dan ada di downvote, maka cabut id yang di downvote berarti ambil yang ada di downvote terus tambahin di upvote
            //kalo "downvote" dan belum ada di downvote, maka push idnya ke downvote, tapi kalo downvote terus udah ada di downvote, maka cabut idnya dari downvote
            //kalo "downvote" dan ada di upvote, maka cabut id yang ada di upvote dan masukkin idnya ke downvote
            let action;
            let whatDidHappen;
            if (req.body.direction === 'up') {
                if (!findUserInUpvote && !findUserInDownVote) {
                    //push idnya ke upvote
                    action = {
                        $push: { upvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push Upvotes`
                } else if (findUserInUpvote && !findUserInDownVote) {
                    //pull id user dari upvote
                    action = {
                        $pull: { upvotes: req.decoded.id }
                    }
                    whatDidHappen = `Pull Upvotes`
                } else if (!findUserInUpvote && findUserInDownVote) {
                    //pull dari downvote terus push ke upvote
                    action = {
                        $pull: { downvotes: req.decoded.id },
                        $push: { upvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push and Pull Upvotes`
                }
            } else {
                if (!findUserInUpvote && !findUserInDownVote) {
                    //push idnya ke downvote
                    action = {
                        $push: { downvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push Downvotes`
                } else if (!findUserInUpvote && findUserInDownVote) {
                    //pull id user dari downvote
                    action = {
                        $pull: { downvotes: req.decoded.id }
                    }
                    whatDidHappen = `Pull Downvotes`
                } else if (findUserInUpvote && !findUserInDownVote) {
                    //pull dari upvote terus push ke downvote
                    action = {
                        $pull: { upvotes: req.decoded.id },
                        $push: { downvotes: [ req.decoded.id ] }
                    }
                    whatDidHappen = `Push and Pull Downvotes`
                }
            }
            
            return Question.updateOne({
                _id: req.params.id
            }, action, {
                new: true
            })
            .then(voted => {
                res
                    .status(200)
                    .json({
                        msg: `User voted to the question`,
                        action: whatDidHappen
                    })
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: 'Internal server error',
                    err: err
                })
        })
    }

    static getUsersQuestion(req, res) {
        console.log(req.decoded.id)
        Question.find({
            user: req.decoded.id
        })
        .then(questions => {
            res
                .status(200)
                .json(questions)
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

    static editQuestion(req, res) {
        Question.updateOne({
            _id: req.params.id
        }, {
            title: req.body.title,
            description: req.body.description
        }, {
            new: true
        })
        .then(updated => {
            res 
                .status(200)
                .json({
                    msg: `Question has been successfully updated`
                })
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

    static removeQuestion(req, res) {
        console.log(req.params, 'kkk')
        Question.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res
                .status(200)
                .json({
                    msg: `Question has been deleted`
                })
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
}

module.exports = Controller