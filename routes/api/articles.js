const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Article = require('../../models/Article');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const User = require('../../models/User');

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

router.get('/page/:page', async (req, res) => {
  const page = parseInt(req.params.page);
  const perPage = (page === 1) ? 9 : 5;
  const skipFirst = (page === 1) ? 0 : 9;
  const skipRest = Math.max(0, 5 * (page - 2));
  const total = await Article.count();

  Article.find().populate('author')
    .skip(skipFirst + skipRest)
    .limit(perPage)
    .sort({ date: -1 })
    .then(articles => {
      const articleObj = {};
      articles.forEach(article => { articleObj[article._id] = article });
      return res.json({ articles: articleObj, total })
    })
    .catch(err => res.status(404).json({ noarticlesfound: 'No articles found' }));
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .populate('likes')
    .populate({ path: "comments", populate: { path: "likes" } })
    .populate({ path: "comments", populate: { path: "author"} })
    .populate({ path: "author", populate: { path: "follows" }})
    .then(article => {
      Like.find({ '_id': { $in: article.likes }})
        .then(likes => {
          article.likes = likes
          return res.json(article);
        }).catch(err => res.status(404).json({ error: "Encountered issue populating article likes"}))
    })
    .catch(err =>
      res.status(404).json({ noarticlefound: 'No article found with that ID' })
    )
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

router.delete('/:id', (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(article => {
      Like.remove({ article: article._id }).exec();
      Comment.remove( { article: article._id }).exec();
      return res.json(article);
    })
    .catch(err =>
      res.status(404).json({ couldnotdelete: 'Article could not be located and deleted' })
    );
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }

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