const {Router} = require("express"),
      mongodb = require('mongodb'),
      router = Router();


let routes = () => {
    let controller = require('./postsController')();

    router.route('/')
        .get(controller.get)
        .post(controller.post);

    router.route("/:id").delete(controller.deleteRequest);


    return router;
};

module.exports = routes;