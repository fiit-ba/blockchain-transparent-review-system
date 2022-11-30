## RewChain Master Thesis

## How to run

To run the whole application u need to run IPFS node localy, run Hyperledger Fabric test-network localy with provided chaincode, this node.js server with a runnig postgreSQL database and a provided frontend application.

### IPFS

- `ipfs id | jq && ipfs daemon`

Commands to clear local private IPFS

- `ipfs pin ls --type recursive | cut -d' ' -f1 | xargs -n1 ipfs pin rm`
- `ipfs repo gc`

### Fabric

- `cd $FABRIC_SAMPLES_DIR/test-network`
- `./network.sh down`
- `./network.sh up createChannel -c mychannel -ca`
- `./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript`
- `docker-compose -f compose/compose-test-net.yaml logs -f -t`

### REST API

- `npm install`
- `npm start`

If u encounter errors while starting node server please chcek if u have `/app/wallet` directory, if so, please delete it

### Angular web app

- `npm install`
- `npm start`
