const express = require("express"),
      bodyParser = require("body-parser"),
      cors = require("cors");


const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());


//ROUTES
let posts = require('./routes/api/posts.js')();

app.use('/api/posts', posts);


//Handle production environment
if (process.env.NODE_ENV === 'production') {
    //STATIC FOLDER
    app.use(express.static(__dirname + '/public/'));


    //HANDLE SINGLE PAGE APPLICATION
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}





const port = process.env.PORT || 5000;

app.listen(port, console.log(`server listening on port ${port}`));