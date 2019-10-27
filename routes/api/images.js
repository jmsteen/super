const express = require('express');
const router = express.Router();
const upload = require('../../services/file-upload');

const singleUpload = upload.single('image');

router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    if (err) { 
      return res.status(404).send({ errors: [{ title: 'File upload error', detail: err.message }] });
    };
    return res.json({'imageUrl': req.file.location});
  });
});

module.exports = router;