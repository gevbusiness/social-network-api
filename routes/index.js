const router = require('express').Router();
const Thought = require('../models/thought');
const User = require('../models/user');

router.get('/users', (req, res) => {
    User.find({})
        .populate("thoughts")
        .populate("friends")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

router.get('/users/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate("thoughts")
        .populate("friends")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

router.post('/users', (req, res) => {
    User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

router.post('/thoughts', (req, res) => {
    Thought.create(req.body)
        .then(dbThoughtData => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

router.get('/thoughts', (req, res) => {
    Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
});

router.get('/thoughts/:id', (req, res) => {
    Thought.findOne({ _id: req.params.id }) 
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
});


module.exports = router;