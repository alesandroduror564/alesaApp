import { cloneDeep } from 'lodash';

const version = 4;

export default {
  version,

  migrate(versionedData) {
    const safeVersionedData = cloneDeep(versionedData);
    safeVersionedData.meta.version = version;
    
    try {
      const providerType = safeVersionedData.data.config.provider.type;
      if (providerType === 'rpc') {
        const rpcTarget = safeVersionedData.data.config.provider.rpcTarget;
        switch (rpcTarget) {
          case 'https://testrpc.alesaapp.io/':
            safeVersionedData.data.config.provider = { type: 'testnet' };
            break;
          case 'https://rpc.alesaapp.io/':
            safeVersionedData.data.config.provider = { type: 'mainnet' };
            break;
        }
      }
    } catch (_) {}
    
    return Promise.resolve(safeVersionedData);
  },
};
