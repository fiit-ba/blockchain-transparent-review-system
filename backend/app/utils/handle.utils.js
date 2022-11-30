'use strict';

const fs = require('fs');

exports.handle_err = (err, func) => {
    if (err) {
        console.error('An error occurred during ' + func + ': ', err);
        process.exitCode = 1;
    }
};

exports.clock = () => {
    let time = process.hrtime();
    return (time[0] * 1000) + (time[1] / 1000000);
};

exports.measurePromise = (fn) => {
    let onPromiseDone = () => clock() - start;
    let start = clock();
    return fn().then(onPromiseDone, onPromiseDone);
};

exports.logToJsonArray = (path, value) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const file = JSON.parse(data);
            file.push(value);
            console.log(file.length);
            const json = JSON.stringify(file);
            fs.writeFile(path, json, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
};