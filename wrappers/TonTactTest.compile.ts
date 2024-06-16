import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/ton_tact_test.tact',
    options: {
        debug: true,
    },
};
