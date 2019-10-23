const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Comment = require('../../models/Comment');
const Article = require('../../models/Article');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newComment = new Comment({
      user: req.user.id,
      article: req.params.articleId,
    });

    Article.findById(req.params.articleId)
      .then(article => {
        newComment.article = mongoos.Types.ObjectId(req.params.articleId)
        newComment.save()
          .then(comment => res.json(comment), err => err = res.status(400).json(err));
          article.comments.push(comment._id);
          article.save()
            .then(() => {}, err => {});
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
