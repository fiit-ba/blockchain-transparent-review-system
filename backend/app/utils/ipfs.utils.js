'use strict';

const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

const utils = require('./');

const ipfs = connect();

/**
 * Uploads file to IPFS and returns cid
 * @param file - File for upload
 * @returns {Promise<string>}
 */
exports.upload = (file) => {
    return new Promise(function (resolve, reject) {
        const name = path.basename(file)
        console.log(`Uploading file `, name, ` ...`);

        const content = fs.readFileSync(file);
        ipfs.add({
            path: name,
            content: content,
        }).then((res) => {
            console.info('Uploaded to IPFS: ', res.cid.toString());
            resolve(res.cid.toString())
        });
    });
};

/**
 * Downloads file from IPFS using address on input
 * @param cid - Content identifier
 * @returns {Promise<Object>}
 */
exports.download = (cid) => {
    return new Promise(function (resolve, reject) {
        console.log('Downloading file ', cid, '...');
        (async () => {
            for await (const buff of ipfs.get(cid, {
                compress: true
            })) {
                console.log(`Download complete`);
                utils.zip.unzip(buff).then((data) => {
                    data.cid = cid;
                    resolve(data);
                });
            }
        })()
    });
};

/**
 * Connects to local IPFS node and returns IPFS object
 * @returns IPFS obejct
 */
function connect() {
    console.log(`Connecting to IPFS node...`);
    const ipfs = create();
    ipfs.id().then((id) => {
        console.info(`  Connected to IPFS node ${id.id}`);
    }).catch((err) => {
        utils.handle.handle_err(err, 'ipfs.id');
    });
    return ipfs;
}