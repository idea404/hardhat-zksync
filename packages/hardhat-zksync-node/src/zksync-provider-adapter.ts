import { EthereumProvider } from 'hardhat/types';
import { EventEmitter } from 'events';
import { Provider } from 'zksync-web3';

export class ZkSyncProviderAdapter extends EventEmitter implements EthereumProvider {
    constructor(public readonly _zkSyncProvider: Provider) {
        super();
    }

    async send(method: string, params: any): Promise<any> {
        //@ts-ignore
        return await this._zkSyncProvider.send(method, params);
    }

    async request(payload: { method: string; params?: any[] }): Promise<any> {
        //@ts-ignore
        return await this._zkSyncProvider.send(payload.method, payload.params ?? []);
    }

    async sendAsync(payload: any, callback: (error: Error | null, result?: any) => void): Promise<void> {
        try {
            //@ts-ignore
            const result = await this._zkSyncProvider.send(payload.method, payload.params);
            callback(null, result);
        } catch (error) {
            callback(error as Error);
        }
    }
}
