const path = require('path');

module.exports = {
    channelName: "mychannel",
    chaincodeName: "basic",
    mspOrg1: "Org1MSP",
    org1UserId: "appUser",
    walletPath: path.join(__dirname + '/../', 'wallet'),
    networkPath: '/home/filip-37/go/src/github.com/32241384/fabric-samples/test-network'
};
