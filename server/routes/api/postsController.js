const {MongoClient, ObjectID} = require('mongodb');


let controller = () => {
    let get, post, deleteRequest;

     get = async (req, res) => {
        var posts =  await loadPostCollection();

        res.send(await posts.find({}).toArray());
    };

    async function loadPostCollection() { // loadpost collection function, which hooks up the database
        const client = await MongoClient.connect('mongodb://codefingers:fullst3ckjs@ds033086.mlab.com:33086/vue_express', {
            useNewUrlParser : true
        });

        return client.db('vue_express').collection('posts');
    };

    post = async (req, res) => {
        var posts =  await loadPostCollection();

        await posts.insertOne({
            text: req.body.text,
            createdAt : new Date()
        });

        res.sendStatus(201); // to mean everything went okay but something was also created
    };


    deleteRequest = async (req, res) => {
        var posts =  await loadPostCollection();

        await posts.deleteOne({
            _id : new ObjectID(req.params.id) // needs to be wrapped because the mongoClient has a special type it reads before it can delete a file
        });

        res.sendStatus(200);
    }

    return {
        get,
        post,
        deleteRequest,
    };
};



module.exports = controller;