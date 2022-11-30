const db = require("../models");
const Subject = db.subject;

exports.findAll = (req, res) => {
    Subject.findAll()
        .then(data => {
            res.send({
                code: 200,
                message: "OK",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while retrieving subjects."
            });
        });
};
