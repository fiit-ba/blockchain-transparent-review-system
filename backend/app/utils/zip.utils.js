'use strict';

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const utils = require('./');

const tmpPath = 'assets/tmp/';

/**
 * Function takes object input and creates JSON file that is compressed and send to IPFS upload function
 * @param obj - Object of the review
 * @returns {Promise<string>}
 */
exports.zip = (obj) => {
    return new Promise(function (resolve, reject) {

        const randomStr = (Math.random() + 1).toString(36).substring(4);
        const sourceFileName = tmpPath + 'json/review_' + randomStr + '.json';
        const destinationFileName = tmpPath + 'gz/review_' + randomStr + '.json' + '.gz';

        console.log('Creating JSON file ...');
        fs.writeFile(sourceFileName, JSON.stringify(obj), (err) => {
            utils.handle.handle_err(err, 'fs.writeFile');

            console.log('JSON file created');
            fs.stat(sourceFileName, (err, stats) => {
                utils.handle.handle_err(err, 'fs.stat');

                console.log('   review_' + randomStr + '.json      ' + stats.size + ' bytes');

                const gzip = zlib.createGzip();
                const source = fs.createReadStream(sourceFileName);
                const destination = fs.createWriteStream(destinationFileName);

                console.log('Compressing JSON file ...');
                pipeline(source, gzip, destination, (err) => {
                    utils.handle.handle_err(err, 'zipping pipeline');
                }).on('finish', () => {
                    fs.stat(destinationFileName, (err, stats) => {
                        utils.handle.handle_err(err, 'fs.stat');

                        if (stats.size < 100) {
                            fs.unlink(destinationFileName, err => {
                                utils.handle.handle_err(err, 'fs.unlink');
                            });
                        } else {
                            console.log('JSON file compressed');
                            console.log('   ' + path.basename(destinationFileName) + '   ' + stats.size + ' bytes');

                            fs.unlink(sourceFileName, err => {
                                utils.handle.handle_err(err, 'fs.unlink');
                            });

                            utils.ipfs.upload(destinationFileName).then((cid) => { resolve(cid); });
                        }
                    });
                });
            });
        });
    });
};

/**
 * Function to get JSON data from double (uploaded .gz and zipped on ipfs.get()) zipped buffer from IPFS
 * @param buffer .gz file data as a buffer
 * @returns {Promise<Object>}
 */
exports.unzip = (buffer) => {
    return new Promise(function (resolve, reject) {

        const randomStr = (Math.random() + 1).toString(36).substring(4);
        const sourceFileName = tmpPath + 'gz/ipfs-zipped-review_' + randomStr + '.gz';
        const destinationFileName = tmpPath + 'gz/ipfs-' + randomStr + '.gz';

        console.log('Unzipping data...');

        fs.writeFile(sourceFileName, buffer, (err) => {
            utils.handle.handle_err(err, 'fs.writeFile');

            const first_unzip = zlib.createGunzip();
            const source_zip = fs.createReadStream(sourceFileName);
            const destination_zip = fs.createWriteStream(destinationFileName);

            pipeline(source_zip, first_unzip, destination_zip, (err) => {
                utils.handle.handle_err(err, 'first unzipping pipeline');
            }).on('finish', () => {

                const second_unzip = zlib.createGunzip();
                const source = fs.createReadStream(destinationFileName);
                const destination = fs.createWriteStream(tmpPath + 'json/review_' + randomStr + '.json');

                pipeline(source, second_unzip, destination, (err) => {
                    utils.handle.handle_err(err, 'second unzipping pipeline');
                }).on('finish', () => {

                    // Delete .gz files
                    fs.unlink(sourceFileName, err => {
                        utils.handle.handle_err(err, 'fs.unlink');
                    });
                    fs.unlink(destinationFileName, err => {
                        utils.handle.handle_err(err, 'fs.unlink');
                    });
                    console.log('Data unzipped successfully.');

                    fs.readFile(tmpPath + 'json/review_' + randomStr + '.json', (err, buff) => {
                        utils.handle.handle_err(err, 'fs.readFile');
                        resolve(JSON.parse(buff.toString()));
                    });
                });
            });
        });
    });
};

/**
 * Utility for clearing temp file at the server start
 * @param dir - Direcotry to clear
 */
exports.clearTempFiles = (dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
            });
        }
    });
    // console.log('Cleared directory ' + dir);
}