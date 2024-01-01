const axios = require('axios').default;
const config = require('./config.json')
const functions = require("./script.js")
const addresses = require('./addresses.json')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
async function sendTx(address) {
    try {
        let res = await axios.post(config.url, {"method":"dna_sendTransaction","params":[{"type":22,"from":config.from,"to":address,"amount":config.amount}],"id":1,"key":config.api}
        )
         return JSON.stringify(res.data)
    } catch (error) {
        return false

    }
}
async function main() {
    for (const address of addresses){
        await sleep(config.ms);
        let txHash = await sendTx(address)
        if (txHash) {
            console.log(" has been sent")
        } else {
            console.log("Tx was not sent")
        }
    }
}
main()