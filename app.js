const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');




const app = express();
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);


app.set('view engine', 'ejs');



app.route("/articles")
    .get(function(req, res) {
        Article.find({}).exec().then(function(articles) {
            res.send(articles);
        });
    })
    .post( function(req, res) {
        const title = (req.body.title);
        const content = (req.body.content);
    
        const newArticle = new Article({
        title: title,
        content: content
        });
    
        (newArticle.save());
    
        res.send("accepted");
    
    })
    .delete( async function(req, res) {
        try {
            await Article.deleteMany();
            res.send("success delete");
        } catch (err) {
        console.log(err);
        res.status(500).send("Error in deletion");
        }

    });
 // callback now depricated in Mongoose, use async/await instead
    app.route("/articles/:articleTitle")
    .get(async function(req, res) {
        try {
            const article = await Article.findOne({title: req.params.articleTitle});
            res.send(article);
        } catch (err) {
            console.log(err);
            res.status(500).send("Error in getting article");
        }
    })
    



app.listen(3000, function() {
    console.log('Server started on port 3000');
});
