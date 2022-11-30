module.exports = app => {
    // Subject related routes
    require("./study-level.routes")(app);
    require("./subject-type.routes")(app);
    require("./subject.routes")(app);

    // User related routes
    require("./user.routes")(app);

    // Review related routes
    require("./review.routes")(app);
};
