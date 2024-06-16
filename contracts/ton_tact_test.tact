import "@stdlib/deploy";
import "./jetton.tact";

message SetJettonAddress {
    queryId: Int as uint64;
    jettonAddress: Address;
    decimals: Int as uint8;
    approved: Bool;
}

struct TokenConfig {
    jettonAddress: Address;
    decimals: Int as uint8;
    contractWallet: Address;
    approved: Bool;
}

contract TonTactTest with Deployable {
    owner: Address;
    tokenConfigByVault: map<Address, TokenConfig>;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: SetJettonAddress) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not Owner");
        let init: StateInit = initOf JettonDefaultWallet(msg.jettonAddress, myAddress());
        let contractWallet: Address = contractAddress(init);
        dump("Master: ");
        dump(msg.jettonAddress);
        dump("Onwer: ");
        dump(myAddress());
        dump("contractWallet: ");
        dump(contractWallet);
        self.tokenConfigByVault.set(contractWallet,
            TokenConfig{
                jettonAddress: msg.jettonAddress, 
                decimals: msg.decimals, 
                contractWallet: contractWallet,
                approved: msg.approved
            }
        );
    }
}
