const fs = require("fs");

exports.bulkCreateFromJSON = (Model, path) => {
    try {
        const study_levels = JSON.parse(fs.readFileSync(path, 'utf-8'));
        Model.bulkCreate(study_levels).then(() => Model.count()).then((count) => {
            // console.log('Inserted ' + count + ' rows in to ' + Model.name + ' table.');
        }).catch((err) => {
            console.log(err);
        });
    } catch (err) {
        console.log("Error parsing study_level JSON string:", err);
    }
};
