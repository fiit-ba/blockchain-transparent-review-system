const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
    if (Object.keys(req.body).length != 4) {
        res.status(400).send({
            code: 400,
            message:
                "Object has a wrong number of properties."
        });
    }
    if (!(Object.keys(req.body).sort().join(',') === ["first_name", "last_name", "login", "password"].sort().join(','))) {
        res.status(400).send({
            code: 400,
            message:
                "Object has a wrong property names."
        });
    }

    let body = req.body;
    body['full_name'] = body.first_name + ' ' + body.last_name;

    (async () => {
        const user = await User.create(body);
        console.log("User " + user.id + " generated.",);

        res.send({
            code: 200,
            message: "OK",
            data: user
        });
    })();
};

exports.read = (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.status(400).send({
            code: 400,
            message: "Id " + id + "is not a number"
        });
        return;
    }

    User.findByPk(req.params.id)
        .then(data => {
            if (data === null) {
                res.status(400).send({
                    code: 400,
                    message: "No user with id " + req.params.id,
                });
            } else {
                res.send({
                    code: 200,
                    message: "OK",
                    data: data
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        });
};

exports.readAll = (req, res) => {
    User.findAll()
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
                    err.message || "Some error occurred while retrieving users"
            });
        });
};

exports.update = (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({
            code: 400,
            message: "Id " + req.params.id + "is not a number"
        });
        return;
    }

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data[0] === 1) {
            User.findByPk(req.params.id)
                .then(data => {
                    res.send({
                        code: 200,
                        message: "OK",
                        data: data
                    });
                })
        } else {
            res.status(400).send({
                code: 400,
                message: "No user with id " + req.params.id,
            });
        }
    })

};

exports.delete = (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.status(400).send({
            code: 400,
            message: "Id " + id + "is not a number"
        });
        return;
    }

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data) {
            res.send({
                code: 200,
                message: "OK",
            });
        } else {
            res.status(400).send({
                code: 400,
                message: "No user with id " + req.params.id,
            });
        }
    })



};
