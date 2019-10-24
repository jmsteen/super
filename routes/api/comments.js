const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Comment = require('../../models/Comment');
const Article = require('../../models/Article');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      console.log(req);
    const newComment = new Comment({
      author: req.user.id,
      article: req.body.article,
      body: req.body.body, 

    });

    Article.findById(req.body.article)
      .then(article => {
        
        newComment.article = mongoose.Types.ObjectId(req.body.article)
        // console.log(newComment);
        newComment.save()
          .then(comment => {
            res.json(comment) 
            article.comments.push(comment._id)
            article.save().then(() => { }, err => { });
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
        if (deletedComment) {
          Article.findOneAndUpdate({ _id: deletedComment.article}, {"$pull": {"comments": deletedComment.id}})
          res.json({ success: "Successfully deleted comment" });
        } else {
          res.json({ nocommentfound: "No comment matches the provided query." });
        }
        return deletedDocument
      })
      .catch(err => res.status(404).json({ error: 'Could not find and delete comment' }));
  }
);

module.exports = router;
