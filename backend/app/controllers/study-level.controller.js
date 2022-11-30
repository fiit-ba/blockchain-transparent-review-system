const db = require("../models");
const StudyLevel = db.study_level;

exports.findAll = (req, res) => {
    StudyLevel.findAll()
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
                    err.message || "Some error occurred while retrieving study levels."
            });
        });
};
