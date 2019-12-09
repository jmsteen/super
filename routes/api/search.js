const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Article = require('../../models/Article');
const User = require('../../models/User');

router.get('/simple/:filter', (req, res) => {
  const regExp = new RegExp(req.params.filter);
  Article.find({ title: { $regex: regExp, $options: 'i' } })
    .populate('author')
    .select('title author _id image')
    .sort({ 'title': -1 })
    .limit(3)
    .then(articles => {
      User.find({ 
        $or: [{ displayName: { $regex: regExp, $options: 'i' } }, 
          { handle: { $regex: regExp, $options: 'i' } } ] 
      }).select('displayName handle _id image')
      .sort({ displayName: -1, handle: -1 })
      .then(users => {
        return res.json({ users, articles });
      })
    })
})