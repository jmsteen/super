const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Like = require('../../models/Like');
const Article = require('../../models/Article');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newLike = new Like({
      user: req.user.id,
      article: req.params.articleId,
      comment: req.params.commentId,
      value: 1
    });

    if (req.params.articleId) {
      Article.findById(req.params.articleId)
        .then(article => {
          newLike.article = mongoose.Types.ObjectId(req.params.articleId)
          newLike.save()
            .then(like => res.json(like), err => err = res.status(400).json(err));
          article.likes.push(like._id);
          article.save()
            .then(() => {}, err => {});
        }).catch(err => {
          return res.status(404).json({ noarticlefound: 'No article found with that ID' });
        });
    } else {
      Comment.findById(req.params.commentId)
        .then(comment => {
          newLike.comment = mongoose.Types.ObjectId(req.params.commentId)
          newLike.save()
            .then(like => res.json(like), err => err = res.status(400).json(err));
          comment.likes.push(like._id);
          comment.save()
            .then(() => { }, err => { });
        }).catch(err => {
          return res.status(404).json({ nocommentfound: 'No comment found with that ID' });
        });
    }
  }
);

// Increments like (just like Medium)
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Like.findById(req.params.id)
      .then(like => {
        like.value = like.value + 1;
        like.save();
        res.json(like);
      })
      .catch(err => {
        return res.status(404).json({ nolikefound: 'No like found with that ID' });
      });
  }
);

// Removes like
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Like.findByIdAndDelete(req.params.id)
      .then(deletedLike => {
        if (deletedLike) {
          res.json({success: "Successfully deleted like"});
        } else {
          res.json({ nolikefound: "No like matches the provided query."});
        }
        return deletedDocument
      })
      .catch(err => res.status(404).json({ error: 'Could not find and delete like' }));
  }
);

module.exports = router;