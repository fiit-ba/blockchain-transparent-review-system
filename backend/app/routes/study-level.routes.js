module.exports = app => {
    const { studyLevelController } = require("../controllers");
    let router = require("express").Router();

    router.get("/", studyLevelController.findAll);

    app.use("/api/study_levels", router);
};
