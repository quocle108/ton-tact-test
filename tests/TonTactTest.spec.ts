import {
    Blockchain, SandboxContract, TreasuryContract,
    printTransactionFees,
    prettyLogTransactions,
    RemoteBlockchainStorage,
    wrapTonClient4ForRemote,
} from '@ton/sandbox';
import { toNano, beginCell, BitString } from '@ton/core';
import { TonTactTest } from '../wrappers/TonTactTest';
import { SampleJetton, jettonContentToCell, Mint, TokenTransfer } from '../wrappers/SampleJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import '@ton/test-utils';

describe('TonTactTest', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonTactTest: SandboxContract<TonTactTest>;
    let jettonContract: SandboxContract<SampleJetton>;
    let deployerWallet: SandboxContract<JettonDefaultWallet>;
    let defaultContent = jettonContentToCell({ type: 1, uri: "https://testjetton.org/content.json" });

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');
        tonTactTest = blockchain.openContract(await TonTactTest.fromInit(deployer.address));

        let deployResult = await tonTactTest.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonTactTest.address,
            deploy: true,
            success: true,
        });

        // Setting the Jetton Token Root
        jettonContract = await blockchain.openContract(
            await SampleJetton.fromInit(deployer.address, defaultContent, toNano(123456789))
        );
        deployResult = await jettonContract.send(deployer.getSender(), { value: toNano("10") }, "Mint: 100");
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonContract.address,
            deploy: true,
            success: true,
        });
        const deployerJettonWallet = await jettonContract.getGetWalletAddress(deployer.address);
        deployerWallet = blockchain.openContract(await JettonDefaultWallet.fromAddress(deployerJettonWallet));
    });

    it('should config token', async () => {
        const contractWalletAddr = await jettonContract.getGetWalletAddress(tonTactTest.address);
        const contractWallet = blockchain.openContract(await JettonDefaultWallet.fromAddress(contractWalletAddr));

        let configTokenResult = await tonTactTest.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'SetJettonAddress',
                queryId: 0n,
                jettonAddress: jettonContract.address,
                decimals: 8n,
                approved: true
            }
        );
        expect(configTokenResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonTactTest.address,
            success: true,
        });
        const getWalletAddress = await jettonContract.getGetWalletAddress(tonTactTest.address);
        console.log("getWalletAddress: ", getWalletAddress)
    });
});
