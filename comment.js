// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Use static files
app.use(express.static('public'));

// Get data from file
let data = fs.readFileSync('data.json');
let comments = JSON.parse(data);

// Render the main page
app.get('/', (req, res) => {
    res.render('index', {comments: comments});
});

// Add new comment
app.post('/add', (req, res) => {
    let newComment = {
        name: req.body.name,
        comment: req.body.comment,
        date: new Date().toLocaleString()
    };
    comments.push(newComment);
    fs.writeFileSync('data.json', JSON.stringify(comments));
    res.render('index', {comments: comments});
});

// Listen to a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});