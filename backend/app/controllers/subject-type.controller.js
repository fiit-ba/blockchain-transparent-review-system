const db = require("../models");
const SubjectType = db.subject_type;

exports.findAll = (req, res) => {
    SubjectType.findAll()
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
                    err.message || "Some error occurred while retrieving subject types."
            });
        });
};
