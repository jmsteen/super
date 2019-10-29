const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Comment = require('../../models/Comment');
const Article = require('../../models/Article');
const Like = require('../../models/Like');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newComment = new Comment({
      author: req.user.id,
      article: req.body.article,
      body: req.body.body, 
    });

    Article.findById(req.body.article)
      .then(() => {
        newComment.article = mongoose.Types.ObjectId(req.body.article)
        newComment.save()
          .then(comment => {
            User.findById(comment.author).then(author => {
              comment.author = author
              res.json(comment) 
            })
              
          }, err => err = res.status(400).json(err))         
      }).catch(err => {
        return res.status(404).json({ noarticlefound: "No article found with that ID"});
      });
    }
  );


router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
      .then(deletedComment => {
        Like.remove({ comment: deletedComment._id }).exec();
        res.json(deletedComment);
      })
      .catch(err => res.status(404).json({ error: 'Could not find and delete comment' }));
    }
);

module.exports = router;
