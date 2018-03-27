const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/', (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({message: err.message}))
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/', (req, res) => {
    let post = new Post({
        author: req.body.author,
        title: req.body.title,
        text: req.body.text
    })
    post.save()
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json({message: err.message}))
})

router.put('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            if (req.body.title)
                post.title = req.body.title
            if (req.body.text)
                post.text = req.body.text
            if (req.body.author)
                post.author = req.body.author
            post.save()
                .then(() => res.status(200).json(post))
                .catch(err => res.status(500).json({message: err.message}))
        })
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/:postId', (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

module.exports = router