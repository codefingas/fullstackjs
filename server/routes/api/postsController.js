const {MongoClient} = require('mongodb');


let controller = () => {
    let get, post;

     get = async (req, res) => {
        var posts =  await loadPostCollection();

        res.send(await posts.find({}).toArray());
    };

    async function loadPostCollection() {
        const client = await MongoClient.connect('mongodb://codefingers:fullst3ckjs@ds033086.mlab.com:33086/vue_express', {
            useNewUrlParser : true
        });

        return client.db('vue_express').collection('posts');
    }

    return {
        get,
    };
};



module.exports = controller;