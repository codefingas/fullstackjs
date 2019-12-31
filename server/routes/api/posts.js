const {Router} = require("express"),
      mongodb = require('mongodb'),
      router = Router();


let routes = () => {
    let controller = require('./postsController')();

    router.route('/').get(controller.get)


    return router;
};

module.exports = routes;