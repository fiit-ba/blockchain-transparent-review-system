'use strict';

const db = require("../models");
const Subject = db.subject;
const User = db.user;

const { ipfs, zip, fabric } = require('../utils');
const Review = require('../classes/review.class');

const sha256 = require('crypto-js/sha256');

exports.create = async (req, res) => {
    console.log('\nUploading a review...');
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            code: 400,
            message:
                "Request body cannot be empty."
        });
    }

    const random = (Math.random() + 1).toString(36).substring(2);
    const uid = 'Dp' + sha256(Date.now() + req.body + random).toString();

    console.log('UID: ' + uid);

    const user = await User.findByPk(req.body.reviewAuthorID);
    const subject = await Subject.findByPk(req.body.reviewSubjectID);

    let rev = new Review(
        uid,
        user.id,
        user.full_name,
        req.body.reviewTitle,
        req.body.reviewText,
        subject.id,
        subject.study_level_id,
        req.body.isPublic,
        Math.floor(new Date().getTime() / 1000)
    );

    zip.zip(rev).then((cid) => {
        rev.setCid(cid);

        const asset = {
            uid: rev.uid.toString(),
            cid: rev.cid.toString(),
            created: rev.created.toString(),
            authorId: rev.authorID.toString(),
            authorName: rev.authorName,
            title: rev.title,
            subjectId: rev.subjectID.toString(),
            studyLevelId: rev.studyLevelID.toString(),
            isPublic: rev.isPublic.toString()
        };

        fabric.createAsset(asset).then(r => {
            res.status(200).send({
                code: 200,
                message: "OK",
                data: rev
            });
        })
    });
};

exports.findAll = async (req, res) => {
    fabric.getAllAssets().then((assets) => {

        assets.map(asset => {
            asset.authorId = parseInt(asset.authorId);
            asset.studyLevelId = parseInt(asset.studyLevelId);
            asset.subjectId = parseInt(asset.subjectId);
            asset.created = parseInt(asset.created);
        })

        res.status(200).send({
            code: 200,
            message: "OK",
            data: assets
        });

        // Get full reviews from IPFS
        // let promises = [];
        // assets.forEach(asset => {
        //     promises.push(ipfs.download(asset.cid))
        // });

        // Promise.all(promises).then((values) => {
        //     res.status(200).send({
        //         code: 200,
        //         message: "OK",
        //         data: values
        //     });
        // });

    })
};

exports.findOne = async (req, res) => {
    const uid = req.params.uid;
    console.log(uid);

    fabric.getOneAsset(uid).then((asset) => {
        ipfs.download(asset.cid).then((rev) => {
            res.status(200).send({
                code: 200,
                message: "OK",
                data: rev
            });
        });
    })
}

exports.update = async (req, res) => {
    console.log('Updating a review...');
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            code: 400,
            message:
                "Request body cannot be empty."
        });
    }

    const uid = req.params.uid;
    console.log(uid);

    const user = await User.findByPk(req.body.reviewAuthorID);
    const subject = await Subject.findByPk(req.body.reviewSubjectID);

    let rev = new Review(
        uid,
        user.id,
        user.full_name,
        req.body.reviewTitle,
        req.body.reviewText,
        subject.id,
        subject.study_level_id,
        req.body.isPublic,
        Math.floor(new Date().getTime() / 1000)
    );

    zip.zip(rev).then((cid) => {
        rev.setCid(cid);

        const asset = {
            uid: rev.uid.toString(),
            cid: rev.cid.toString(),
            created: rev.created.toString(),
            authorId: rev.authorID.toString(),
            authorName: rev.authorName,
            title: rev.title,
            subjectId: rev.subjectID.toString(),
            studyLevelId: rev.studyLevelID.toString(),
            isPublic: rev.isPublic.toString()
        };

        fabric.updateAsset(asset).then(r => {
            res.status(200).send({
                code: 200,
                message: "OK",
                data: rev
            });
        })


    });
}

exports.findOneWithHistory = async (req, res) => {
    const uid = req.params.uid;

    fabric.getAssetHistory(uid).then((hist) => {
        let promises = [];
        hist.forEach(state => {
            state.data = JSON.parse(state.data);
            promises.push(ipfs.download(state.data.cid));
        });

        Promise.all(promises).then((values) => {
            hist.map(state => {
                state.data = values.find(v => v.cid == state.data.cid);
            });
            res.status(200).send({
                code: 200,
                message: "OK",
                size: hist.length,
                data: hist
            });
        });
    });
}
