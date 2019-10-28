const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Article = require('../../models/Article');
const Like = require('../../models/Like');
const validateArticleInput = require('../../validation/articles');

router.get('/', (req, res) => {
  Article.find().populate('author')
    .limit(15)
    .sort({ date: -1 })
    .then(articles => {
      const responseObj = {};
      articles.forEach(article => { responseObj[article._id] = article });
      return res.json(responseObj)
    })
    .catch(err => res.status(404).json({ noarticlesfound: 'No articles found' }));
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id).populate({ path: "comments", populate: { path: "likes" } }).populate("author")
    .then(article => {
      Like.find({ '_id': { $in: article.likes }})
        .then(likes => {
          article.likes = likes
          return res.json(article);
        }).catch(err => res.status(404).json({ error: "Encountered issue populating article likes"}));
    })
    .catch(err =>
      res.status(404).json({ noarticlefound: 'No article found with that ID' })
    );
});


router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }

    const newArticle = new Article({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      author: req.user.id
    });

    newArticle.save().then(article => res.json(article));
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }

    console.dir(req.body);

    Article.findById(req.body.id)
      .then(article => {
        article.title = req.body.title;
        article.body = req.body.body;
        if (req.body.image) { article.image = req.body.image };
        article.save().then(article => res.json(article));
      }).catch(err => res.status(404).json(err));
  }
);

module.exports = router;