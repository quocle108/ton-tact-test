import { toNano } from '@ton/core';
import { TonTactTest } from '../wrappers/TonTactTest';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonTactTest = provider.open(await TonTactTest.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await tonTactTest.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonTactTest.address);

    console.log('ID', await tonTactTest.getId());
}
