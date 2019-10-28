const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const articles = require("./routes/api/articles");
const likes = require('./routes/api/likes');
const images = require('./routes/api/images');
const passport = require("passport");
const comments = require("./routes/api/comments")

app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));
app.use(bodyParser.json({ limit: '16mb', extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/articles", articles);
app.use("/api/likes", likes);
app.use("/api/comments", comments);
app.use("/api/images", images);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server is running on port ${port}`));
