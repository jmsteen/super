const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
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
    .populate({
      path: 'articles',
      populate: {
        path: 'author'
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'article',
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
          path: 'author'
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
  User.findById(req.params.userId)
    .then(user => {
      if (req.body.description) { user.description = req.body.description };
      if (req.body.handle) { user.handle = req.body.handle };
      if (req.body.displayName) { user.displayName = req.body.displayName };
      if (req.body.image) { user.image = req.body.image };
      user.save();
      res.json(user);
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
      return res.status(400).json(errors);
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
                { expiresIn: 3600 },
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
    return res.status(400).json(errors);
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
            const payload = { id: user.id, handle: user.handle, email: user.email };

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