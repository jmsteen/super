const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Like = require('../../models/Like');
const Article = require('../../models/Article');
//const Comment = require('../../models/Comment');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newLike = new Like({
      user: req.user.id,
      article: req.body.articleId,
      comment: req.body.commentId,
      value: 1
    });

    if (req.body.articleId) {
      Article.findById(req.body.articleId)
        .then(() => {
          newLike.article = mongoose.Types.ObjectId(req.body.articleId)
          newLike.save()
            .then(like => res.json(like), err => err = res.status(422).json(err));
        }).catch(err => {
          return res.status(404).json({ noarticlefound: 'No article found with that ID' });
        });
    } else if (req.body.commentId) {
      Comment.findById(req.body.commentId)
        .then(() => {
          newLike.comment = mongoose.Types.ObjectId(req.body.commentId)
          newLike.save()
            .then(like => res.json(like), err => err = res.status(422).json(err));
        }).catch(err => {
          return res.status(404).json({ nocommentfound: 'No comment found with that ID' });
        });
    } else {
      res.status(404).json({ invalidparams: 'Need article or comment to create a like' });
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
          res.json(deletedLike);
        } else {
          res.json({ nolikefound: "No like matches the provided query."});
        }
      })
      .catch(err => res.status(404).json({ error: 'Could not find and delete like' }));
  }
);

module.exports = router;