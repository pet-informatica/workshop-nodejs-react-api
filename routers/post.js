const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')

// posts

router.get('/', (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({message: err.message}))
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate('comments')
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/', (req, res) => {
    let post = new Post({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        comments: []
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

// comments

router.post('/:postId/comments/', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            let comment = new Comment({
                name: req.body.name,
                comment: req.body.comment
            })
            comment.save()
                .then(() => {
                    post.comments.push(comment._id)
                    post.save()
                        .then(() => res.status(200).json(post))
                        .catch(err => res.status(500).json({message: err.message}))
                })
                .catch(err => res.status(500).json({message: err.message}))
        })
        .catch(err => res.status(500).json({message: err.message}))
})

router.delete('/:postId/comments/:commentId', (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {$pull: {comments: req.params.commentId}})
        .then(() => Comment.findByIdAndRemove(req.params.commentId))
        .then(() => res.end())
        .catch(err => res.status(500).json({message: err.message}))
})

module.exports = router