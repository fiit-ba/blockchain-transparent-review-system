module.exports = app => {
    const { subjectController } = require("../controllers");
    let router = require("express").Router();

    router.get("/", subjectController.findAll);

    app.use("/api/subjects", router);
};
