const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { zip } = require("./app/utils");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initial route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the ReviewChain!"
    });
});

// TMP directory cleanup
zip.clearTempFiles('assets/tmp/json');
zip.clearTempFiles('assets/tmp/gz');

// Routes
require("./app/routes")(app)

// Set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


