module.exports = app => {
    const { reviewControlled } = require("../controllers");
    let router = require("express").Router();

    router.get("/", reviewControlled.findAll);
    router.get("/:uid", reviewControlled.findOne);
    router.post("/", reviewControlled.create);
    router.put("/:uid", reviewControlled.update);
    router.get("/history/:uid", reviewControlled.findOneWithHistory);

    app.use("/api/reviews", router);
};
