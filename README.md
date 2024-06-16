# ton-tact-test

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

```
 console.log
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:31:9
    #DEBUG#: Master: 
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:32:9
    #DEBUG#: EQA9sBJca1njccs9ax9-d1jXe--kH8xYM7AC-X7UTT3DWp0x
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:33:9
    #DEBUG#: Onwer: 
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:34:9
    #DEBUG#: EQAc9BddkOwhmwhEmt5YlxXsVnUQreiXpB8GI0dgFqsqRbTZ
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:35:9
    #DEBUG#: contractWallet: 
    #DEBUG#: [DEBUG] File contracts/ton_tact_test.tact:36:9
    #DEBUG#: EQCd6YhGbUWl14PtxYRwVW7brztYBGTPU6j3iX-r-3B3LBxu

      at SmartContract.runCommon (node_modules/@ton/sandbox/dist/blockchain/SmartContract.js:221:21)

  console.log
    #DEBUG#: [DEBUG] File contracts/jetton.tact:110:9
    #DEBUG#: Master: 
    #DEBUG#: [DEBUG] File contracts/jetton.tact:111:9
    #DEBUG#: EQA9sBJca1njccs9ax9-d1jXe--kH8xYM7AC-X7UTT3DWp0x
    #DEBUG#: [DEBUG] File contracts/jetton.tact:112:9
    #DEBUG#: Onwer: 
    #DEBUG#: [DEBUG] File contracts/jetton.tact:113:9
    #DEBUG#: EQAc9BddkOwhmwhEmt5YlxXsVnUQreiXpB8GI0dgFqsqRbTZ
    #DEBUG#: [DEBUG] File contracts/jetton.tact:114:9
    #DEBUG#: contractWallet: 
    #DEBUG#: [DEBUG] File contracts/jetton.tact:115:9
    #DEBUG#: EQCvc-h9jpX2MZYTQuoJeDG_r7hM3NEDVhJnEAedftvYPL6N
```