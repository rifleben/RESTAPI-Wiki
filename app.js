const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/articles', function(req, res) {
    Article.find({}).exec().then(function(articles) {
        res.send(articles);
    });
});




app.listen(3000, function() {
    console.log('Server started on port 3000');
});
