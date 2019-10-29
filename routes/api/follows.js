const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Follow = require('../../models/Follow');
const User = require('../../models/User');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newFollow = new Follow({
      user: req.user.id,
      author: req.body.authorId
    });

    User.findById(req.body.authorId)
      .then(() => {
        newFollow.author = req.body.authorId
        newFollow.save()
          .then(follow => {
            User.findById(req.body.authorId).then((user)=>{
              follow.author = user;
              res.json(follow);
            })
          }, err => err = res.status(400).json(err));
      }).catch(err => {
        return res.status(404).json({ noauthorfound: 'No author found with that ID' });
      });
  }
);

// Removes follow
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Follow.findByIdAndDelete(req.params.id)
      .then(deletedFollow => {
        res.json(deletedFollow);
      })
      .catch(err => res.status(404).json({ error: 'Could not find and delete follow' }));
  }
);

module.exports = router;