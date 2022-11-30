'use strict';

// Configuration file for connecting to Hyperledger Fabric
const fabConfig = require('../config/fabric.config.js');

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./fabric/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./fabric/AppUtil.js');

init().then((contract) => {

	/**
	 * Submits CreateAsset trasaction to the local node of Hyperledger Fabric
	 * @param asset - Review object
	 * @returns {Promise<Object>}
	 */
	exports.createAsset = (asset) => {
		return new Promise(function (resolve, reject) {
			console.log('Submiting a CreateAsset trasaction...');
			contract.submitTransaction('CreateAsset',
				asset.uid,
				asset.cid,
				asset.authorId,
				asset.authorName,
				asset.title,
				asset.subjectId,
				asset.studyLevelId,
				asset.isPublic,
				asset.created).then((result) => {
					console.log('Asset submited');
					if (result !== '') {
						resolve(JSON.parse(result.toString()))
					}
				})
		});
	};

	/**
	 * Submits GetAllAssets trasaction to the local node of Hyperledger Fabric
	 * @returns {Promise<Object>}
	 */
	exports.getAllAssets = () => {
		return new Promise(function (resolve, reject) {
			console.log('Submiting a GetAllAssets trasaction...');
			contract.evaluateTransaction('GetAllAssets').then((result) => {
				resolve(JSON.parse(result.toString()))
			})
		});
	};

	/**
	 * Submits ReadAsset trasaction to the local node of Hyperledger Fabric
	 * @param uid - Identifier for the review
	 * @returns {Promise<Object>}
	 */
	exports.getOneAsset = (uid) => {
		return new Promise(function (resolve, reject) {
			console.log('Submiting a ReadAsset trasaction...');
			contract.evaluateTransaction('ReadAsset', uid).then((result) => {
				resolve(JSON.parse(result.toString()))
			})
		});
	};

	/**
	 * Submits UpdateAsset trasaction to the local node of Hyperledger Fabric
	 * @param asset - Review object
	 * @returns {Promise<Object>}
	 */
	exports.updateAsset = (asset) => {
		return new Promise(function (resolve, reject) {
			console.log('Submiting a UpdateAsset trasaction...');
			contract.submitTransaction('UpdateAsset',
				asset.uid,
				asset.cid,
				asset.authorId,
				asset.authorName,
				asset.title,
				asset.subjectId,
				asset.studyLevelId,
				asset.isPublic,
				asset.created).then((result) => {
					console.log('Update submited');
					if (result !== '') {
						resolve(JSON.parse(result.toString()))
					}
				})
		});
	};

	/**
	 * Submits ReadAssetHistory trasaction to the local node of Hyperledger Fabric
	 * @param uid - Identifier for the review
	 * @returns {Promise<Object>}
	 */
	exports.getAssetHistory = (uid) => {
		return new Promise(function (resolve, reject) {
			console.log('Submiting a ReadAssetHistory trasaction...');
			contract.submitTransaction('ReadAssetHistory', uid).then((result) => {
				resolve(JSON.parse(result.toString()));
			})
		});
	};
});



async function init() {
	return new Promise(async function (resolve, reject) {
		try {
			// Build an in memory object with the network configuration (also known as a connection profile)
			const ccp = buildCCPOrg1();

			// Build an instance of the fabric ca services client based on the information in the network configuration
			const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

			// setup the wallet to hold the credentials of the application user
			const wallet = await buildWallet(Wallets, fabConfig.walletPath);

			await enrollAdmin(caClient, wallet, fabConfig.mspOrg1);
			await registerAndEnrollUser(caClient, wallet, fabConfig.mspOrg1, fabConfig.org1UserId, 'org1.department1');

			// Create a new gateway instance for interacting with the fabric network.
			const gateway = new Gateway();

			// Setup the gateway instance

			/* The user will now be able to create connections to the fabric network and be able to
			   submit transactions and query. All transactions submitted by this gateway will be
			   signed by this user using the credentials stored in the wallet. */
			await gateway.connect(ccp, {
				wallet,
				identity: fabConfig.org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(fabConfig.channelName);

			// Get the contract from the network.
			resolve(network.getContract(fabConfig.chaincodeName));

		} catch (error) {
			console.error(`FAILED to run the application: ${error}`);
		}
	});
};