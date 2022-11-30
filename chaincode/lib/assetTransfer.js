/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    // CreateAsset creates a new asset to the world state with given details.
    async CreateAsset(ctx, uid, cid, authorId, authorName, title, subjectId, studyLevelId, isPublic, created) {
        const exists = await this.AssetExists(ctx, uid);
        if (exists) {
            throw new Error(`The asset ${uid} already exists`);
        }

        const asset = {
            UID: uid,
            cid: cid,
            authorId: authorId,
            authorName: authorName,
            title: title,
            subjectId: subjectId,
            studyLevelId: studyLevelId,
            isPublic: isPublic,
            created: created,
        };
        await ctx.stub.putState(uid, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given uid.
    async ReadAsset(ctx, uid) {
        const assetJSON = await ctx.stub.getState(uid);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${uid} does not exist`);
        }
        return assetJSON.toString();
    }

    // ReadAssetHistory returns array of history objects for asset stored in the world state with given uid.
    async ReadAssetHistory(ctx, uid) {
        const historyIterator = ctx.stub.getHistoryForKey(uid);
        const history = [];

        for await (const obj of historyIterator) {
            const resp = {
                timestamp: obj.timestamp,
                txid: obj.txId,
                data: obj.value.toString('utf8'),
            }
            history.push(resp);
        }
        return JSON.stringify(history);
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, uid, cid, authorId, authorName, title, subjectId, studyLevelId, isPublic, created) {
        const exists = await this.AssetExists(ctx, uid);
        if (!exists) {
            throw new Error(`The asset ${uid} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            UID: uid,
            cid: cid,
            authorId: authorId,
            authorName: authorName,
            title: title,
            subjectId: subjectId,
            studyLevelId: studyLevelId,
            isPublic: isPublic,
            created: created,
        };
        await ctx.stub.putState(uid, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
        return JSON.stringify(updatedAsset);
    }

    // AssetExists returns true when asset with given uid exists in world state.
    async AssetExists(ctx, uid) {
        const assetJSON = await ctx.stub.getState(uid);
        return assetJSON && assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
