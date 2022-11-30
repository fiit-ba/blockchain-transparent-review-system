module.exports = app => {
    const { userController } = require("../controllers");
    let router = require("express").Router();

    router.post("/", userController.create);
    router.get("/:id", userController.read);
    router.get("/", userController.readAll);
    router.put("/:id", userController.update);
    router.delete("/:id", userController.delete);

    app.use("/api/user", router);
};
