const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const validateProfileEditInput = require("../../validation/user");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId).populate('follows')
    .then(response => {
      res.json(response)
    })
    .catch(() =>
      res
        .status(404)
        .json({ nouserfound: "User was not found" })
    );
});

// Added so that the user can be fetched by the handle
router.get("/handle/:handle", (req, res) => {
  User.findOne({handle: req.params.handle})
    .select('-password -date -email')
    .populate('follows')
    .populate({
      path: 'isFollowing',
      populate: {
        path:'author',
        select: 'handle displayName _id image'
      }
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'article',
        populate: {
          path: 'author',
          select: 'handle displayName'
        }
      }
    })
    .populate('articles')
    .populate({
      path: 'likes',
      populate: {
        path: 'article',
        populate: {
          path: 'author',
          select: 'image handle displayName'
        }
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'comment',
        populate: {
          path: 'author'
        }
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'comment',
        populate: {
          path: 'article',
          populate: {
            path: 'author',
            select: 'handle, displayName'
          }
        }
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'comment',
        populate: {
          path: 'article',
          populate: {
            path: 'likes',
            select: '_id'
          }
        }
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'comment',
        populate: {
          path: 'article',
          populate: {
            path: 'comments',
            select: '_id'
          }
        }
      }
    })
    .then(response => {
      res.json(response);
    })
    .catch(() =>
      res
        .status(404)
        .json({ nouserfound: "User was not found" })
    );
});

router.get("/:userId/articles", (req, res) => {
  Article.find({ user: req.params.userId })
    .then(articles => res.json(articles))
    .catch(() =>
      res
        .status(404)
        .json({ noarticlesfound: "No articles found from that user" })
    );
});

router.patch("/:userId", (req, res) => {
  const { errors, isValid } = validateProfileEditInput(req.body);

  if (!isValid) {
    return res.status(422).json(errors);
  }

  User.findById(req.params.userId)
    .select('-password -date -email')
    .then(user => {
      user.description = req.body.description;
      user.handle = req.body.handle;
      user.displayName = req.body.displayName;
      user.image = req.body.image;
      user.save((err, u) => {
        if (err) {
          return res.status(422).json(err)
        } else{ 
          const payload = { id: user.id, 
            handle: user.handle, 
            email: user.email, 
            description: user.description };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user
              });
            }
          );
        }
      })
    })
    .catch(errors =>
      res
        .status(422)
        .json(errors)
    );
});

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "A user has already registered with this email address";
      return res.status(422).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.handle // displayName defaults to handle at first!
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, handle: user.handle, email: user.email };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 36000 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(422).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'Invalid email or password' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, handle: user.handle, email: user.email, image: user.image };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

module.exports = router;