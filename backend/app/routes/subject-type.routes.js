module.exports = app => {
    const { subjectTypeController } = require("../controllers");
    let router = require("express").Router();

    router.get("/", subjectTypeController.findAll);

    app.use("/api/subject_types", router);
};
